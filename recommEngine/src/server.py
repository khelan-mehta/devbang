from flask import Flask, Response # type: ignore
from RecommendationEngine import Recommender
from gtts import gTTS # type: ignore
from io import BytesIO
from PromptProcessor import suggestFood

recommender: Recommender = Recommender("C:/Users/hpath/Desktop/devbang/devbang/recommEngine/src/FinalDataset.csv", 15)

app = Flask(__name__)

@app.route("/recommend/<food>")
def recommend_food(food):
    # recommender.seed_db()  # Use it only when need to seed dataset into database
    results = recommender.recommend_similar_foods(food)
    # output.mp3 - link = http://127.0.0.1
    return {"data": results}


@app.get('/tts/<text>') 
def text_to_speech_gTTS(text: str):
    def generate_ad(textstr):
        print(textstr)
        tts = gTTS(text=textstr, lang='en')
        tts.save("output.wav")
        with open("output.wav", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate_ad(text), mimetype="audio/x-wav")

@app.get('/usrsearch/<query>')
def search(query: str):
    res = suggestFood(query)
    sr = recommender.db.cur.execute(f"SELECT * FROM foods WHERE fname LIKE %{res.food_item}% OR fnutrition LIKE %{res.nutrition}% OR ftype={res.type} ORDER BY fprice ASC LIMIT 10")
    fooditms = sr.fetchmany();
    similar = recommender.recommend_similar_foods(fooditms[0][1])
    return {"similarFoods": similar, "searchRes": fooditms, "chatRes": res}
