from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os
import PyPDF2
import pandas as pd

def load_and_split(docs):
  splitter = RecursiveCharacterTextSplitter(
    chunk_size=2100,
    chunk_overlap=300,
  )
  vector_store.add_documents(documents=splitter.split_documents(docs))

def load_pdf(path):
  docs = []
  with open(path, "rb") as f:
    pdf = PyPDF2.PdfReader(f)
    for i, p in enumerate(pdf.pages):
      content = p.extract_text()
      docs.append(Document(
        page_content=content,
        metadata={
          "source": path,
          "page": i + 1,
          "file_type": "pdf",
        }))
  load_and_split(docs)

def load_csv(path):
  docs = []
  df = pd.read_csv(path)
  for i, row in df.iterrows():
    docs.append(Document(
      page_content=row.content,
      metadata={
        "source": path,
        "page": i + 1,
        "file_type": "csv",
      }))
  load_and_split(docs)

def load_txt(path):
  docs = []
  with open(path, "r", encoding="utf-8") as f:
    content = f.read()
  docs.append(Document(
    page_content=content,
    metadata={
      "source": path,
      "page": 1,
      "file_type": "txt",
    }))
  load_and_split(docs)



embeddings = OllamaEmbeddings(model="qwen3-embedding:0.6b")
directory = "./db"
is_add = not os.path.exists(directory)

vector_store = Chroma(
  embedding_function=embeddings,
  persist_directory=directory,
)

if is_add:
  docs_path = "../docs"
  loaders = {
    ".pdf": load_pdf,
    ".csv": load_csv,
    ".txt": load_txt,
  }
  for fn in os.listdir(docs_path):
    path = os.path.join(docs_path, fn)
    loader = loaders.get(os.path.splitext(path)[1])
    loader(path)

retriever = vector_store.as_retriever(
  search_kwargs={"k": 5}
)
