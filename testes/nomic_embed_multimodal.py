# pip install --upgrade pip
# apt-get install poppler-utils
# pip install git+https://github.com/nomic-ai/colpali.git@e4785653a193e4da012e058996429c98478c2c58)
# pip install transformers==4.51.3
# pip install pdf2image
# pip install scikit-learn 
# pip install qwen_vl_utils


from colpali_engine.models import BiQwen2_5, BiQwen2_5_Processor
from pdf2image import convert_from_path
from torch.utils.data import Dataset, DataLoader
import torch
import os
from datetime import datetime

print(datetime.now().strftime("%H:%M:%S"))

class PDFImageDataset(Dataset):
  def __init__(self, pdfs_list):
    self.images = []
    self.filenames = []
    for pdf in pdfs_list:
      for i, img in enumerate(pdf["images"]):
        self.images.append(img)
        self.filenames.append(f"{pdf['title']}_page_{i+1}")
  def __len__(self):
    return len(self.images)
  def __getitem__(self, idx):
    return {
      "image": self.images[idx],
      "image_filename": self.filenames[idx]
    }

dir = "./docs"
pdfs = []

for fn in os.listdir(dir):
  print(fn)
  path = os.path.join(dir, fn)
  pdfs.append({
    "title": fn.removesuffix(".pdf"),
    "path": path,
    "file_name": fn,
    "images": convert_from_path(path)
  })
  break

model_name = "nomic-ai/nomic-embed-multimodal-3b"
nomic_model = BiQwen2_5.from_pretrained(
  model_name,
  torch_dtype=torch.bfloat16,
  device_map="cpu",
).eval()
nomic_processor = BiQwen2_5_Processor.from_pretrained(model_name)

pdf_dataset = PDFImageDataset(pdfs)
dataloader = DataLoader(
  pdf_dataset,
  batch_size=4,
  shuffle=False,
  collate_fn=lambda x: nomic_processor.process_images([a["image"] for a in x]),
)

batch_size = 1
image_counter = 0
print("inicio:", datetime.now().strftime("%H:%M:%S"))
for pdf_idx, pdf in enumerate(pdfs):
  print(f"Generating embeddings for {len(pdf['images'])} pages in {pdf['title']}")
  pdf['page_embeddings'] = []
  for i in range(0, len(pdf["images"]), batch_size):
    print(f"- image/page: {i * batch_size + 1}")
    print("  inicio_batch:", datetime.now().strftime("%H:%M:%S"))
    batch_images = pdf["images"][i:i+batch_size]
    inputs = nomic_processor.process_images(batch_images)
    print("  process_images:", datetime.now().strftime("%H:%M:%S"))
    inputs = {k: v.to(nomic_model.device) for k, v in inputs.items()}
    print("  inputs:", datetime.now().strftime("%H:%M:%S"))
    with torch.no_grad(): embeddings = nomic_model(**inputs)
    print("  embeddings:", datetime.now().strftime("%H:%M:%S"))
    embeddings = embeddings.cpu()
    embeddings = embeddings / torch.norm(embeddings, dim=1, keepdim=True)
    print("  torch.norm:", datetime.now().strftime("%H:%M:%S"))
    for j, emb in enumerate(embeddings):
      print('  ', j)
      if i+j < len(pdf["images"]):
        if 'page_embeddings' not in pdf: pdf['page_embeddings'] = []
        pdf['page_embeddings'].append(emb)
        image_counter += 1
    print("  page_embeddings:", datetime.now().strftime("%H:%M:%S"))

print(f"Generated embeddings for {image_counter} PDF pages")

data = []
page_count = 0
for pdf in pdfs:
  for page_idx in range(len(pdf["images"])):
    data.append({
      "title": pdf["title"],
      "file": pdf["file"],
      "page_number": page_idx + 1,
      "image": pdf["images"][page_idx],
      "id": page_count
    })
    page_count += 1

from sklearn.metrics.pairwise import cosine_similarity

def retrieve(query: str, k: int = 3) -> list:
  """Retrieve semantically similar items from data based on embeddings"""
  query = nomic_processor.process_queries([query])
  with torch.no_grad():
    query = {k: v.to(nomic_model.device) for k, v in query.items()}
    query_embedding = nomic_model(**query).float().cpu().numpy()
  query_embedding = query_embedding / np.linalg.norm(query_embedding)
  cos_sim = cosine_similarity(query_embedding, embeddings)[0]
  idx_sorted_by_cosine_sim = np.argsort(cos_sim)[::-1]
  sorted_data = [data[i] for i in idx_sorted_by_cosine_sim]
  return sorted_data[:k]

from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor
from qwen_vl_utils import process_vision_info
from PIL.Image import Image

model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    "Qwen/Qwen2.5-VL-7B-Instruct",
    torch_dtype="auto",
    device_map="auto"
)
processor = AutoProcessor.from_pretrained("Qwen/Qwen2.5-VL-7B-Instruct")

def query_vlm(query: str, images: list[Image]) -> str:
  """Queries Qwen VLM with text and images"""
  system_prompt = "You are an expert professional PDF analyst who gives rigorous in-depth answers."
  message_content = [
    {"type": "image", "image": image}
    for image in images
  ] + [{"type": "text", "text": query}]
  messages = [ {
      "role": "system",
      "content": [{"type": "text", "text": system_prompt}]
    }, {
      "role": "user",
      "content": message_content
    }
  ]
  text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
  image_inputs, video_inputs = process_vision_info(messages)
  inputs = processor(
    text=[text],
    images=image_inputs,
    videos=video_inputs,
    padding=True,
    return_tensors="pt"
  ).to(model.device)
  generated_ids = model.generate(**inputs, max_new_tokens=1000)
  generated_ids_trimmed = generated_ids[0][len(inputs.input_ids[0]):]
  return processor.decode(generated_ids_trimmed, skip_special_tokens=True)


single_doc_query = "O que é Cálculo OEE?"
single_doc_rag_results = retrieve(single_doc_query, k=1)
single_doc_image = single_doc_rag_results[0]["image"]
single_doc_answer = query_vlm(single_doc_query, [single_doc_image])
