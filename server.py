from fastapi import FastAPI
from pydantic import BaseModel
from vector import retriever

from config import (API_HOST, API_PORT)

app = FastAPI()

class QueryRequest(BaseModel):
  query: str

@app.post("/context")
def get_context(request: QueryRequest):
  context = [ doc.page_content for doc in retriever.invoke(request.query) ]
  return context

if __name__ == "__main__":
  import uvicorn
  print(f"Starting API server on {API_HOST}:{API_PORT}")
  uvicorn.run(app, host=API_HOST, port=API_PORT)