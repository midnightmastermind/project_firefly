from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
client = MongoClient('localhost', 27017)
db = client['default_db']
collection = db['converted_products']

# Loop through each document in the collection
for product in collection.find():
    # Check if the document has the 'data' field
    if 'data' in product:
        # Check if 'data._id' has '$oid' key
        if '_id' in product['data'] and '$oid' in product['data']['_id']:
            # Update 'data._id' to use plain string
            product['data']['_id'] = str(ObjectId(product['data']['_id']['$oid']))

            # Save the updated document back to the collection
            collection.update_one({'_id': product['_id']}, {'$set': {'data': product['data']}})
