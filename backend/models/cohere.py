import os
from dotenv import load_dotenv
import re

import cohere
from cohere.responses.classify import Example
from models.prompts import FIND_THEME_PROMPT
from models.examples import MARKETING_ITEMS

load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

def use_prompt(template, **kwargs):
    prompt = template.format(**kwargs)
    return prompt

def find_theme(company, product, era):
    prompt=use_prompt(FIND_THEME_PROMPT, company=company, product=product, era=era)
    response = co.generate(
        prompt=prompt
    )

    return response.generations[0].text

# examples = [
#     (Example(example, type))
#     for type, examples in MARKETING_ITEMS.items()
#     for example in examples
# ]

# def get_items(theme):
#     inputs = re.split(r'(\d+)', theme)

#     print(inputs)

#     response = co.classify(
#         inputs=inputs,
#         examples=examples,
#     )

#     return response

# def rank_items(theme):
#     query = "What are specific marketing action items to put in a planner?"
#     documents = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', theme)

#     response = co.rerank(
#         query=query, 
#         documents=documents, 
#         top_n=5, 
#         model="rerank-multilingual-v2.0"
#     )

#     return response