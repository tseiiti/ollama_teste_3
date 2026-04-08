from langserve import RemoteRunnable
from vector import retriever
remote = RemoteRunnable("http://localhost:8000/chain/")

question = "como são os ambientes?"
context = retriever.invoke(question)
remote.invoque({"context": context, "question": question})