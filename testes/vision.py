from ollama import chat
from datetime import datetime

print("ini:", datetime.now().strftime("%H:%M:%S"))

response = chat(
  model="qwen3.5:4b",
  messages=[
    {
      'role': 'user',
      'content': 'What is in this image? Be concise.',
      'images': ['teste_1.jpg'],
    }
  ],
)

print(response.message.content)

print("fim:", datetime.now().strftime("%H:%M:%S"))

# ini: 12:15:10
# This image features a close-up of an orange tabby cat with green eyes looking slightly to the side, sitting on a concrete surface with a blurred background containing a red hose.
# fim: 12:26:39