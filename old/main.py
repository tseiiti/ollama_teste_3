from ollama import chat
from langchain_ollama.llms import OllamaLLM
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate
from vector import retriever

app = FastAPI()

messages = [{
  "role": "system",
  "content": "Você é um especialista no assunto informado no contexto. Responda a pergunta com base somente nesse contexto. A resposta deve ser sempre em português do brasil de forma clara e objetiva. A resposta deve ser em um único parágrafo bem elaborado e completo, a menos que esteja explícito outro formato na pergunta."
}]

template = """
  Pergunta:
  {question}

  Contexto:
  {context}
"""

# prompt = ChatPromptTemplate.from_template(template)
# model = OllamaLLM(model="llama3.2:3b")
# chain = prompt | model

class QueryRequest(BaseModel):
  query: str

@app.post("/query")
def query_rag(request: QueryRequest):
  context = [ doc.page_content for doc in retriever.invoke(request.query) ]
  messages.append({
    "role": "user",
    "content": template.format(question=request.query, context=context)})

  response = chat(
    model="llama3.2:3b",
    messages=messages
  )
  messages.append(response.message)
  print(messages)

  # response = chain.invoke({"context": context, "question": request.query})

  # return {"response": response.message.content}
  return response

@app.post("/context")
def get_context(request: QueryRequest):
  context = [ doc.page_content for doc in retriever.invoke(request.query) ]
  return context


if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="localhost", port=8000)
