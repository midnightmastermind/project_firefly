import pymongo
from pymongo import MongoClient

# Connection to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Selecting the default_db
db = client['default_db']

# Data to be inserted
inner_object = {
    "id": "root-folder",
    "name": "root-folder",
    "isDir": True,
    "childrenIds": [],
    "childrenCount": 0
}

# Inserting data into the files collection
files_collection = db['files']
files_collection.insert_one(inner_object)

print("Data inserted successfully.")
