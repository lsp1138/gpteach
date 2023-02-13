import os

import openai
import requests
from app.config import Settings, get_settings, log
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Prompt(BaseModel):
    question: str
    botResponse: str = ""


app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/prompts")
async def get_prompts(Settings: Settings = Depends(get_settings)):
    log.info("Getting prompts")
    return {"question": "a question", "botResponse": "a bot response"}


@app.post("/prompts")
async def create_prompt(prompt: Prompt, settings: Settings = Depends(get_settings)):

    log.info(f"Prompt question {prompt.question}")

    openai.api_key = settings.openai_api_key

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_prompt(prompt.question),
        temperature=0.6,
        max_tokens=500,
    )

    log.info(f"Bot response {response}")

    return response.choices[0].text


def generate_prompt(question):
    return """YYou are a friendly Portuguese teacher.  The student will ask you questions in english about learning portuguese from Portugal. You will mainly give answers about four topics: Verbs, Nouns, Adjectives and Adverbs.  

Question: What is the meaning of the word "casa"?
Answer: Casa is a noun. It means "house".

Question: How do you confugate the verb "comer"?
Answer: Comer is a verb. It means "to eat". The conjugation is: comer, comes, comemos, comem.

Question: What is the word for to do in Portuguese? 
Answer: Fazer

Question: {}
Answer:""".format(
        question
    )
