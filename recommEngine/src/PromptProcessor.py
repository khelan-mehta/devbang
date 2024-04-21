import os
from openai import OpenAI # type: ignore


def suggestFood(qr: str):


    client = OpenAI(
        # This is the default and can be omitted
        api_key="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",
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"You are an heathy food advisor and you are supposed to answer any queries related to the food or infer the food the user is talking about and correctly name it. Tag the food item as veg or non veg then identify whether the food is protein rich, carbohydrates rich or fat rich and tag it as protein, carbs and fat. Also include some famous dishes which can be made from the mentioned food item. Your reponse should be in json format and shouldnt be more than 150 words. The query is: {qr}",
            }
        ],
        model="gpt-3.5-turbo",
    )

    response = chat_completion['choices'][0]['message']['content']
    return response



print(suggestFood("high protien diet for lean body"))
