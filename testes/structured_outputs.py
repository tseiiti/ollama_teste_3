from ollama import chat
from pydantic import BaseModel
from typing import Literal, Optional
from datetime import datetime

print("ini:", datetime.now().strftime("%H:%M:%S"))

# response = chat(
#   model="llama3.2:3b",
#   messages=[{"role": "user", "content": "Tell me about Canada."}],
#   format="json"
# )
# print(response.message.content)



# class Country(BaseModel):
#   name: str
#   capital: str
#   languages: list[str]

# response = chat(
#   model="llama3.2:3b",
#   messages=[{"role": "user", "content": "Tell me about Canada."}],
#   format=Country.model_json_schema(),
# )

# country = Country.model_validate_json(response.message.content)
# print(country)



# class Pet(BaseModel):
#   name: str
#   animal: str
#   age: int
#   color: str | None
#   favorite_toy: str | None

# class PetList(BaseModel):
#   pets: list[Pet]

# response = chat(
#   model="llama3.2:3b",
#   messages=[{"role": "user", "content": "I have two cats named Luna and Loki..."}],
#   format=PetList.model_json_schema(),
# )

# pets = PetList.model_validate_json(response.message.content)
# print(pets)



class Object(BaseModel):
  name: str
  confidence: float
  attributes: str

class ImageDescription(BaseModel):
  summary: str
  objects: list[Object]
  scene: str
  colors: list[str]
  time_of_day: Literal["Morning", "Afternoon", "Evening", "Night"]
  setting: Literal["Indoor", "Outdoor", "Unknown"]
  text_content: Optional[str] = None

response = chat(
  model="qwen3.5:4b",
  messages=[{
    "role": "user",
    "content": "Describe this photo and list the objects you detect.",
    "images": ["teste_1.jpg"],
  }],
  format=ImageDescription.model_json_schema(),
  options={"temperature": 0},
)

image_description = ImageDescription.model_validate_json(response.message.content)
print(image_description)

print("fim:", datetime.now().strftime("%H:%M:%S"))

# ini: 12:49:25
# summary="A close-up, eye-level shot of an orange tabby cat sitting on a light-colored surface. The cat is looking directly at the camera with a calm, alert expression. The background is out of focus, featuring two red diagonal lines that resemble a hose or trim." objects=[Object(name="cat", confidence=0.99, attributes="orange tabby, ginger, alert"), Object(name="eyes", confidence=0.98, attributes="yellow-green, vertical pupils"), Object(name="nose", confidence=0.95, attributes="pinkish-brown"), Object(name="whiskers", confidence=0.96, attributes="long, white"), Object(name="ears", confidence=0.97, attributes="pointed, upright"), Object(name="fur", confidence=0.99, attributes="orange, soft"), Object(name="background", confidence=0.85, attributes="blurred, light-colored floor"), Object(name="red lines", confidence=0.8, attributes="diagonal, possibly a hose")] scene="A close-up portrait of an orange tabby cat looking at the camera." colors=["orange", "yellow", "green", "pink", "white", "red"] time_of_day="Afternoon" setting="Indoor" text_content=None
# fim: 13:06:32
