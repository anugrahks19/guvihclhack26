import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
print(f"API Key found: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")

if not api_key:
    print("ERROR: GROQ_API_KEY environment variable is missing. Please set it in your .env file.")
    api_key = "YOUR_GROQ_API_KEY"

try:
    client = Groq(api_key=api_key)
    print("Connecting to Groq...")
    
    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": "ping"}],
        model="llama-3.3-70b-versatile", 
    )
    
    print("Success!")
    print(completion.choices[0].message.content)

except Exception as e:
    print(f"FAILED: {e}")
