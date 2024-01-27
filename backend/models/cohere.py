from dotenv import load_dotenv
import os
import cohere

load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

def test_gen():
    response = co.generate(
        prompt='Please explain to me how LLMs work',
    )
    print(response)