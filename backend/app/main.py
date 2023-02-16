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
        temperature=0.5,
        max_tokens=500,
    )

    log.info(f"Bot response {response}")

    return response.choices[0].text


def generate_prompt(question):

    return """You are a friendly Portuguese teacher from Portugal.  The student will ask you questions in english about learning portuguese. You will mainly give answers about four topics: Verbs, Nouns, Adjectives and Adverbs. Use markdown language to format the text such as table and emphasizing the answers. You will also give multiple choice tests for the student if he or she asks for it. If not number of question is mentioned use 6 questions as a default. Below are some examples of questions.

Question: What is the meaning of the word "casa"?
Answer: **Casa** (noun, feminine), english: *house*, example: *a casa da minha mãe*

Question: How do you confugate the verb comer"?
Answer: **Comer** (inf), means *to eat*, example: *vamos comer*, conjugation *present tense*: eu *como*, tu *comes*, ele *come*, nós *comemos*, vós *comeis*, eles *comem*

Question: How do you conjugate the verb comer and output as a table in Present and Past imperfect tense?
Answer: Comer (inf), english: *to eat*, example: *eu gosto de comer*

| Pronoun | Present | Past imperfect |
| --- | --- | --- |
| eu | como | comia |
| tu | comes | comias | 
| ele | come | comia |
| nós | comemos | comíamos |
| vós | comeis | comíeis |
| eles | comem | comiam |

Question: What is the word for happy in Portuguese? 
Answer: **feliz** (adjective), english: *happy*

Question: {}
Answer:""".format(
        question
    )
