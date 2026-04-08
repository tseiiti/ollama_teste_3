from fastapi import FastAPI
from pydantic import BaseModel
from vector import retriever

app = FastAPI()

class QueryRequest(BaseModel):
  query: str

@app.post("/context")
def get_context(request: QueryRequest):
  context = [ doc.page_content for doc in retriever.invoke(request.query) ]
  return context

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="localhost", port=8000)
