import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('localhost', 27017)
db = client['default_db']
collection = db['products']

# Iterate over documents in the collection and update attribute values
for document in collection.find():
    try:
        for i in range(1, 6):  # Assuming attributes go from attribute_1 to attribute_5
            attribute_field_name = f'attribute_{i}_values'
            if attribute_field_name in document and isinstance(document[attribute_field_name], str):
                # Convert the attribute values to a list using the | delimiter
                attribute_values = document[attribute_field_name].split('|')
                # Update the document with the new array of attribute values
                collection.update_one(
                    {'_id': document['_id']},
                    {'$set': {attribute_field_name: attribute_values}}
                )
        print(f"Successfully updated document with _id: {document['_id']}")
    except Exception as e:
        print(f"Error updating document with _id: {document['_id']}. Error: {e}")
