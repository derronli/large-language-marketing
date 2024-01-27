import os
from models.prompts import FIND_THEME_PROMPT
import cohere

from dotenv import load_dotenv

load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

def use_prompt(template, **kwargs):
    prompt = template.format(**kwargs)
    return prompt

def find_theme(company, product, era):
    prompt=use_prompt(FIND_THEME_PROMPT, company=company, product=product, era=era)
    print(prompt)

    response = co.generate(
        prompt=prompt
    )

    return response
    