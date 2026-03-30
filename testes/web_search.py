import ollama
from datetime import datetime

print("ini:", datetime.now().strftime("%H:%M:%S"))

# precisa de token
response = ollama.web_search("What is Ollama?")
print(response)

print("fim:", datetime.now().strftime("%H:%M:%S"))
