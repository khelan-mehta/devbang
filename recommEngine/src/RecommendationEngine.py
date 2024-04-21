from sklearn.cluster import KMeans # type: ignore
import numpy as np # type: ignore
import pandas as pd # type: ignore
from Database import DBModel
from sqlite3 import OperationalError



class Food:
   def __init__(self, name, protein=0.0, carbohydrate=0.0, fat=0.0, price=0):
    self.name = name
    self.protein = protein
    self.carbohydrate = carbohydrate
    self.fat = fat
    self.price = price



# Recommendation Engine Parent class to encapsulate all code.
class Recommender():

    
    # config options
    dbn = "nourish.db"
    table = "foods"
    schemaQuery = f"CREATE TABLE {table}(fid PRIMARY KEY, fname, fpv, fcv, ffv, fprice, fnutrition, ftype)"
    food_items = []

    def __init__(self, dataset_pth = 'FinalDataset.csv', results = 3) -> None:

        # database initialize
        self.db = DBModel(self.dbn, self.table, self.schemaQuery)
        self.db.createTable() # creates the table if does not exists

        # For number search results
        self.nneighbours = results

        self.data = pd.read_csv(dataset_pth)
        for index, row in self.data.iterrows():
            self.food_item = Food(row['Item Name'], row['Proteins'], row['Carbohydrates'], row['Fats'], row['Price'])
            self.food_items.append(self.food_item)
        X = np.array([[food.protein, food.carbohydrate, food.fat, food.price] for food in self.food_items])
        self.kmeans = KMeans(n_clusters=3, random_state=42)
        self.kmeans.fit(X)
        pass

    def recommend_similar_foods(self, query_food_name):
        queried_food = None

        try:
            foods = self.db.con.execute(f"SELECT * FROM {self.table} WHERE fname LIKE '%{query_food_name}%' ORDER BY fprice DESC")
            print(foods.fetchone())
            queried_food = foods.fetchone()
            pass

        except OperationalError as e:
            print(e.with_traceback(None))
            for food in self.food_items:
                if query_food_name.lower() == food.name.lower():
                    queried_food = tuple(food)
                    break
        
        if queried_food is None:
            return "Food item not found in the database."

        # Predict cluster for the queried food item
        query_cluster = self.kmeans.predict([[queried_food[2], queried_food[3], queried_food[4], queried_food[5]]])[0]

        # Get food items from the same cluster as the queried food item
        cluster_indices = np.where(self.kmeans.labels_ == query_cluster)[0]
        similar_items = [(self.food_items[i].name, 
                        self.food_items[i].protein, self.food_items[i].carbohydrate, self.food_items[i].fat, self.food_items[i].price) 
                        for i in cluster_indices if self.food_items[i].name.lower() != queried_food[1].lower()]

        # If there are more similar items than required, randomly select top_n items
        if len(similar_items) > self.nneighbours:
            selected_indices = np.random.choice(len(similar_items), self.nneighbours, replace=False)
            similar_items = [similar_items[i] for i in selected_indices]
        return similar_items


    def seed_db(self):
        for idx, rows in self.data.iterrows():
            print(tuple(rows)) # working nice
            dt = (idx,)

            self.db.insertOne(dt + tuple(rows))
        pass



# query_food = input("Enter the name of the food item: ")
# recommended_items = recommend_similar_foods(query_food)
# print(f"Recommended Food Items similar to '{query_food}':")
# for item in recommended_items:
#     name, protein, carbohydrate, fat = item
#     print(f"- {name}: Protein: {protein}%, Carbohydrate: {carbohydrate}%, Fat: {fat}%")
# print(recommended_items)