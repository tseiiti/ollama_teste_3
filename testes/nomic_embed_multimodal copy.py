
# apt update
# apt upgrade -y
# apt install -y poppler-utils
# pip install transformers
# pip install pdf2image

# pip install --upgrade pip
# pip install git+https://github.com/nomic-ai/colpali
# pip install git+https://github.com/illuin-tech/colpali
# pip install git+https://github.com/huggingface/transformers qwen-vl-utils[decord] accelerate flash-attn matplotlib scikit-learn pdf2image requests


# pip install torch --index-url https://download.pytorch.org/whl/cpu



# python -c "from transformers import pipeline; print(pipeline('sentiment-analysis')('hugging face is the best'))"
# [{'label': 'POSITIVE', 'score': 0.9998704791069031}]


from pdf2image import convert_from_path

import os

dir = "./docs"
pdfs = []

for fn in os.listdir(dir):
  print(fn)
  path = os.path.join(dir, fn)
  pdfs.append({
    "title": fn.removesuffix(".pdf"),
    "path": path,
    "file_name": fn,
    "images": convert_from_path(path),
  })

# from colpali_engine.models.qwen2_5.biqwen2_5.modeling_biqwen2_5 import BiQwen2_5
# from colpali_engine.models.qwen2_5.biqwen2_5.processing_biqwen2_5 import BiQwen2_5_Processor
import torch
from PIL import Image
from transformers.utils.import_utils import is_flash_attn_2_available

from colpali_engine.models import BiQwen2_5, BiQwen2_5_Processor

model_name = "nomic-ai/nomic-embed-multimodal-3b"

model = BiQwen2_5.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map="cpu"
).eval()

processor = BiQwen2_5_Processor.from_pretrained(model_name)

# Your inputs
images = [
    Image.new("RGB", (128, 128), color="white"),
    Image.new("RGB", (64, 32), color="black"),
]
queries = [
    "What is the organizational structure for our R&D department?",
    "Can you provide a breakdown of last year’s financial performance?",
]

# Process the inputs
batch_images = processor.process_images(images).to(model.device)
batch_queries = processor.process_queries(queries).to(model.device)

# Forward pass
with torch.no_grad():
    image_embeddings = model(**batch_images)
    query_embeddings = model(**batch_queries)

scores = processor.score(list(torch.unbind(query_embeddings)), list(torch.unbind(image_embeddings)))






# from colpali_engine.models.qwen2_5.biqwen2_5.modeling_biqwen2_5 import BiQwen2_5
# from colpali_engine.models.qwen2_5.biqwen2_5.processing_biqwen2_5 import BiQwen2_5_Processor
# import torch
# nomic_model = BiQwen2_5.from_pretrained(
#     "nomic-ai/nomic-embed-multimodal-3b",
#     torch_dtype=torch.bfloat16,
#     device_map="auto", # cuda
#     # attn_implementation="flash_attention_2" if torch.cuda.is_available() else None,
# ).eval()

# nomic_processor = BiQwen2_5_Processor.from_pretrained("nomic-ai/nomic-embed-multimodal-3b")



from transformers import ColPaliForRetrieval, ColPaliProcessor
model_name = "vidore/colpali-v1.3-hf"

model = ColPaliForRetrieval.from_pretrained(
    model_name,
    dtype=torch.bfloat16,
    device_map="auto",  # "cpu", "cuda", "xpu", or "mps" for Apple Silicon
)
processor = ColPaliProcessor.from_pretrained(model_name)






# pip install colpali-engine # from PyPi
# pip install git+https://github.com/illuin-tech/colpali # from source

import torch
from PIL import Image
from transformers.utils.import_utils import is_flash_attn_2_available

from colpali_engine.models import ColQwen2, ColQwen2Processor

model_name = "vidore/colqwen2-v1.0"

model = ColQwen2.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map="cuda:0",  # or "mps" if on Apple Silicon
    attn_implementation="flash_attention_2" if is_flash_attn_2_available() else None,
).eval()

processor = ColQwen2Processor.from_pretrained(model_name)

# Your inputs
images = [
    Image.new("RGB", (128, 128), color="white"),
    Image.new("RGB", (64, 32), color="black"),
]
queries = [
    "What is the organizational structure for our R&D department?",
    "Can you provide a breakdown of last year’s financial performance?",
]

# Process the inputs
batch_images = processor.process_images(images).to(model.device)
batch_queries = processor.process_queries(queries).to(model.device)

# Forward pass
with torch.no_grad():
    image_embeddings = model(**batch_images)
    query_embeddings = model(**batch_queries)

scores = processor.score_multi_vector(query_embeddings, image_embeddings)





from sentence_transformers import SentenceTransformer
from datetime import datetime

print(1, datetime.now().strftime("%H:%M:%S"))
model = SentenceTransformer("google/embeddinggemma-300m")
model = SentenceTransformer("embeddinggemma:300m")

print(2, datetime.now().strftime("%H:%M:%S"))
query_embeddings = model.encode_query("como funciona o cadastro?")
doc_embeddings = model.encode_document([
  "docs/Aplicacao_de_Caclulos_OEE.pdf", 
  "docs/OEE_Definicao_e_Aplicacoes_no_Sistema_PCPMaster.pdf",
  "docs/PCPMaster_Cadastros.pdf",
  "docs/PCPMaster_Online_Historico.pdf",
  "docs/PCPMaster_Planejamento_Scheduler.pdf",
  "docs/PCPMaster_Relatorios.pdf",
])

print(3, datetime.now().strftime("%H:%M:%S"))
similarities = model.similarity(query_embeddings, doc_embeddings)

print(4, datetime.now().strftime("%H:%M:%S"))