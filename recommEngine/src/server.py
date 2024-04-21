from flask import Flask # type: ignore
from RecommendationEngine import Recommender

recommender: Recommender = Recommender("C:/Users/hpath/Desktop/devbang/devbang/recommEngine/src/FinalDataset.csv", 15)

app = Flask(__name__)

@app.route("/recommend/<food>")
def recommend_food(food):
    # recommender.seed_db()  Use it only when need to seed dataset into database
    results = recommender.recommend_similar_foods(food)
    # output.mp3 - link = http://127.0.0.1
    return [results]