from ollama import chat, ChatResponse
from datetime import datetime

print("ini:", datetime.now().strftime("%H:%M:%S"))

def add(a: int, b: int) -> int:
  """Add two numbers"""
  """
  Args:
    a: The first number
    b: The second number

  Returns:
    The sum of the two numbers
  """
  return a + b

def multiply(a: int, b: int) -> int:
  """Multiply two numbers"""
  """
  Args:
    a: The first number
    b: The second number

  Returns:
    The product of the two numbers
  """
  return a * b

available_functions = {
  "add": add,
  "multiply": multiply,
}

messages = [{"role": "user", "content": "What is (11434+12341)*412?"}]
while True:
  response: ChatResponse = chat(
    model="qwen3.5:4b",
    messages=messages,
    tools=[add, multiply],
    think=True,
  )
  messages.append(response.message)
  print("Thinking: ", response.message.thinking)
  print("Content: ", response.message.content)
  if response.message.tool_calls:
    for tc in response.message.tool_calls:
      if tc.function.name in available_functions:
        print(f"Calling {tc.function.name} with arguments {tc.function.arguments}")
        result = available_functions[tc.function.name](**tc.function.arguments)
        print(f"Result: {result}")
        messages.append({"role": "tool", "tool_name": tc.function.name, "content": str(result)})
  else:
    break

print("fim:", datetime.now().strftime("%H:%M:%S"))

# ini: 15:12:48
# Thinking:  The user is asking me to calculate (11434+12341)*412. I need to:
# 1. First add 11434 and 12341
# 2. Then multiply the result by 412

# Let me start with the addition first.
# Content:
# Calling add with arguments {'a': 11434, 'b': 12341}
# Result: 23775
# Thinking:  Now I need to multiply 23775 by 412.
# Content:
# Calling multiply with arguments {'a': 23775, 'b': 412}
# Result: 9795300
# Thinking:  The calculation is complete. (11434+12341)*412 = 23775*412 = 9795300
# Content:  The result of (11434+12341)*412 is 9,795,300.
# fim: 15:14:14