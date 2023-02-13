import os

import requests
from app.config import Settings, get_settings, log
from fastapi import Depends, FastAPI

app = FastAPI()


@app.get("/prompts/")
async def prompts(settings: Settings = Depends(get_settings)):

    log.info("In the prompts endpoint")

    return {
        "ping": "pong!",
        "environment": settings.environment,
        "testing": settings.testing,
    }
