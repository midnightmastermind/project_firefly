import pymongo

# Connect to your local MongoDB database
client = pymongo.MongoClient("mongodb://localhost:27017/")
database = client["default_db"]
collection = database["converted_products"]

# Retrieve all documents from the collection
products = collection.find()

# Update each document in the collection
for product in products:
    # Find the 'name' field in the 'fields' array
    name_field = next((field for field in product['fields'] if field['name'] == 'name'), None)

    # If 'name' field is found, set the 'name' parameter in the document
    if name_field:
        product['name'] = name_field['value']
        # Update the document in the collection
        collection.update_one({'_id': product['_id']}, {'$set': {'name': name_field['value']}})

# Close the MongoDB connection
client.close()
