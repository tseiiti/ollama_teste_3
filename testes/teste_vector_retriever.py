from vector import retriever

query = "olá"
query = "o que é a declaração de nova delhi?"
for doc in retriever.invoke(query):
  print(doc)

from vector import vector_store

retriever = vector_store.similarity_search_with_relevance_scores(
  kwargs={"k": 5}
)


results = vector_store.similarity_search_with_score(
  query, k=5
)

results = vector_store.similarity_search_with_relevance_scores(
  query, k=5
)

for res, score in results:
  print(f"score:    {score:.2f}")
  print(f"content:  {res.page_content[:100].replace("\n", " ")}...")
  print(f"metadata: {res.metadata}", "\n")



results = vector_store.similarity_search(
  query, k=2,
)
for res in results:
  print(f"content:  {res.page_content[:100].replace("\n", " ")}...")
  print(f"metadata: {res.metadata}", "\n")


retriever = vector_store.as_retriever(
  score_threshold=1.0, search_type="mmr", search_kwargs={"k": 5, "fetch_k": 5}
)
results = retriever.invoke(query)
for res in results:
  print(f"content:  {res.page_content[:100].replace("\n", " ")}...")
  print(f"metadata: {res.metadata}", "\n")



collection = vector_store._collection
results = collection.query(
  query_texts=[query],
  n_results=5
)