from chain_prompt import chain
from fastapi import FastAPI
from langserve import add_routes

app = FastAPI(title="Meu LLM Server", description="API LLM Chat Server's Runnable Interfaces")

add_routes(app, chain, path="/chain")

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="localhost", port=8000)