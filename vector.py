from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
import PyPDF2
import pandas as pd

def load_csv(path):
  # global vector_store
  documents = []
  df = pd.read_csv(path)
  for row in df.itertuples():
    documents.append(Document(page_content=row.content))
  vector_store.add_documents(documents=documents)

def load_pdf(path):
  # global vector_store
  documents = []
  with open(path, "rb") as f:
    pdf = PyPDF2.PdfReader(f)
    for p in pdf.pages:
      text = p.extract_text()
      if text.strip():
        documents.append(Document(page_content=text))
  vector_store.add_documents(documents=documents)


embeddings = OllamaEmbeddings(model="qwen3-embedding:0.6b")
db_location = "./db"
add_documents = not os.path.exists(db_location)

vector_store = Chroma(
  embedding_function=embeddings,
  persist_directory=db_location,
)

if add_documents:
  documents = []
  load_csv("../docs/c.csv")
  load_pdf("../docs/a.pdf")
  load_pdf("../docs/b.pdf")

retriever = vector_store.as_retriever(
  search_kwargs={"k": 5}
)