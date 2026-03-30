from ollama import chat
import requests
from datetime import datetime

print("ini:", datetime.now().strftime("%H:%M:%S"))

def open_meteo(latitude: float, longitude: float):
  url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=America%2FSao_Paulo"
  return requests.request("GET", url).json()['hourly']

def get_temperature():
  """Get Accurate Weather Forecasts

  Returns:
    temperature, relative_humidity, wind_speed
  """
  return open_meteo(-23.6146, -46.6056)

messages = [{"role": "user", "content": "What will the temperature be at 3:00 PM on March 30th?"}]
response = chat(model="qwen3.5:4b", messages=messages, tools=[get_temperature], think=True)
messages.append(response.message)

if response.message.tool_calls:
  call = response.message.tool_calls[0]
  result = get_temperature(**call.function.arguments)

  messages.append({"role": "tool", "tool_name": call.function.name, "content": str(result)})

  final_response = chat(model="qwen3.5:4b", messages=messages, tools=[get_temperature], think=True)
  print(final_response.message.content)

print("fim:", datetime.now().strftime("%H:%M:%S"))
