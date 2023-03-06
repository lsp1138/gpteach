import json

import openai
from app.config import Settings, get_settings, log
from app.prompt import generate_prompt
from fastapi import Depends, FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class Prompt(BaseModel):
    question: str
    botResponse: str = ""


app = FastAPI()


origins = [
    "https://gpteach.onrender.com",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthcheck")
async def healthcheck(settings: Settings = Depends(get_settings)):
    log.info(f"ENV key set: {settings.openai_api_key[:4]}")
    return "hello from fast api"


@app.get("/prompts")
async def get_prompts(Settings: Settings = Depends(get_settings)):
    log.info("Getting prompts")
    return {"question": "a question", "botResponse": "a bot response"}


@app.post("/prompts")
async def create_prompt(prompt: Prompt, settings: Settings = Depends(get_settings)):

    prompt_str = generate_prompt(prompt.question)

    log.info(f"Prompt question {prompt_str}")
    log.info(
        f"prompt settings: temperature {settings.prompt_temperature}, max_tokens {settings.prompt_max_tokens}"
    )

    openai.api_key = settings.openai_api_key

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt_str,
        temperature=settings.prompt_temperature,
        max_tokens=settings.prompt_max_tokens,
    )

    response_text = "{" + response.choices[0].text

    log.info(f"What is the response text {response.choices[0].text}")

    try:
        json_response_text = jsonable_encoder(response_text)
        json_response = json.loads(json_response_text)

        log.info(f"what is the respnse {type(json_response)}")
    except Exception as e:
        log.error(f"Something went wrong {e}")

    return json_response
