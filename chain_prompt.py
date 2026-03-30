# from ollama import chat
from langchain_ollama.llms import OllamaLLM
from vector import retriever
from langchain_core.prompts import ChatPromptTemplate

# model = chat(
#   model="llama3.2:3b"
# )

model = OllamaLLM(model="llama3.2:3b")

template = """
Responta a pergunta com base no contexto:

Contexto: {context}

Pergunta: {question}
"""

prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

# question = "como são os ambientes?"
# context = retriever.invoke(question)
# response = chain.invoke({"context": context, "question": question})
# print(response)
