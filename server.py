from chain_prompt import chain
from fastapi import FastAPI
from langserve import add_routes

app = FastAPI(title="Meu app de ia", description="xxxx")

if __name__ == "__name__":
  import uvicorn
  uvicorn.run(app, host="localhost", port=8000)