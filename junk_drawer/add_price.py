import pymongo
import random

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["default_db"]
collection = db["products"]

# Loop through documents in the collection
for product in collection.find():
    # Add a "price" property with a random amount
    random_price = round(random.uniform(1, 100), 2)
    collection.update_one({"_id": product["_id"]}, {"$set": {"price": random_price}})

# Close the MongoDB connection
client.close()