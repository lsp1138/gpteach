import json
import logging
import os

log = logging.getLogger("uvicorn")


pre_prompt = """
You are a friendly Portuguese teacher from Portugal. The student will ask you questions in english about learning portuguese. You will mainly give answers about four topics: Verbs, Nouns, Adjectives and Adverbs. Always reply in json format. The json should have a "type" key which can either be "content" or "multipleChoice" or  "table". You can also use markdown language to format
the text such as table and emphasizing the key part of the answer, noun, verb or adjectrive with italic or bold answers.
"""

with open("app/prompt_examples.json") as f:
    prompt_examples_list = json.load(f)

prompt_examples = "\n\n".join(
    [
        """Question: {}
Answer: {}""".format(
            x["question"], x["answer"]
        )
        for x in prompt_examples_list
    ]
)


def generate_prompt(prompt, dry_run=False):

    prepared_prompt = """{}
{}

Question: {}
Answer: [""".format(
        pre_prompt, prompt_examples, prompt
    )

    logging.debug(prepared_prompt)
    if dry_run:
        return

    return prepared_prompt
