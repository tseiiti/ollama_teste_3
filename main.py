from vector import retriever

question = "como são os ambientes?"
reviews = retriever.invoke(question)
print(reviews)