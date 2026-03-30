import ollama
from datetime import datetime

print("ini:", datetime.now().strftime("%H:%M:%S"))


single = ollama.embed(
  model="qwen3-embedding:0.6b",
  input="The quick brown fox jumps over the lazy dog."
)
print(len(single["embeddings"][0])) # vector length 768



batch = ollama.embed(
  model="qwen3-embedding:0.6b",
  input=[
    "The quick brown fox jumps over the lazy dog.",
    "The five boxing wizards jump quickly.",
    "Jackdaws love my big sphinx of quartz.",
  ]
)
print(len(batch["embeddings"])) # vector length 3


print("fim:", datetime.now().strftime("%H:%M:%S"))
