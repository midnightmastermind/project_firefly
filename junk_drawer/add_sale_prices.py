import random
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('localhost', 27017)
db = client['default_db']
collection = db['products']

# Get the total number of documents in the collection
total_documents = collection.count_documents({'type': 'variable'})

# Get a random sample of half of the "variable" documents
random_documents = random.sample(list(collection.find({'type': 'variable'})), total_documents // 2)

# Loop through the random "variable" documents and add a random sale_price
for document in random_documents:
    try:
        # Check if regular_price field exists and is a number
        if 'regular_price' in document and isinstance(document['regular_price'], (int, float)):
            # Generate a random sale_price less than the regular_price
            random_sale_price = random.uniform(0, document['regular_price'])
            # Update the document with the new sale_price
            collection.update_one(
                {'_id': document['_id']},
                {'$set': {'sale_price': random_sale_price}}
            )
        print(f"Successfully added sale_price to document with _id: {document['_id']}")
    except Exception as e:
        print(f"Error updating document with _id: {document['_id']}. Error: {e}")
