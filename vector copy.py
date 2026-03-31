from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_unstructured import UnstructuredLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
import os
import pandas as pd

def load_csv(path):
  df = pd.read_csv(path, header=None)
  docs = []
  for row in df.itertuples():
    docs.append(Document(page_content=row[1]))
  return docs

def loads(dir):
  text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    add_start_index=True
  )

  for fn in os.listdir(dir):
    path = os.path.join("../docs", fn)
    _, ext = os.path.splitext(path)
    if ext == ".csv":
      vector_store.add_documents(
        documents=load_csv(path))
    else:
      loader = UnstructuredLoader(path)
      vector_store.add_documents(
        documents=loader.load_and_split(text_splitter=text_splitter))



embedding = OllamaEmbeddings(model="qwen3-embedding:0.6b")
directory = "./db"
is_add = not os.path.exists(directory)

vector_store = Chroma(
  embedding_function=embedding,
  persist_directory=directory,
)

if is_add:
  loads("../docs")


retriever = vector_store.as_retriever(
  search_kwargs={"k": 5}
)