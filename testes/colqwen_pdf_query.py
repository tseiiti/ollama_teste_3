
# apt update
# apt upgrade -y
# apt install -y poppler-utils
# pip install pdf2image
# pip install colpali-engine


# from colpali_engine.models import ColQwen3_5, ColQwen3_5Processor
from transformers import ColPaliForRetrieval, ColPaliProcessor
# from PIL import Image
from pdf2image import convert_from_path
import torch 
import os
from datetime import datetime

print(datetime.now().strftime("%H:%M:%S"))

# model_name = "athrael-soju/colqwen3.5-4.5B-v3"
model_name = "vidore/colpali-v1.3-hf"
# model = ColQwen3_5.from_pretrained(
model = ColPaliForRetrieval.from_pretrained(
  model_name,
  torch_dtype=torch.bfloat16,
  device_map="cpu",
)
# processor = ColQwen3_5Processor.from_pretrained(model_name)
processor = ColPaliProcessor.from_pretrained(model_name)

dir = "../docs"
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

images = pdfs[0]['images']
batch = processor.process_images(images).to(model.device)

print(datetime.now().strftime("%H:%M:%S"))
with torch.no_grad():
  doc_embeddings = model(**batch)
  print(datetime.now().strftime("%H:%M:%S"))

# Embed queries
queries = ["O que é PCP Master?", "O que é cálculo OEE?"]
batch = processor.process_queries(queries).to(model.device)
with torch.no_grad():
  model.rope_deltas = None
  query_embeddings = model(**batch)

# Score with MaxSim
scores = processor.score(query_embeddings, doc_embeddings)
