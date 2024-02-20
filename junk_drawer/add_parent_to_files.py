from pymongo import MongoClient

# Connect to MongoDB locally
client = MongoClient("localhost", 27017)
db = client.default_db

# Specify the update criteria (updating all documents)
update_criteria = {}

# Specify the update values
update_values = [
    {"$set": {"id": ""}}
]

# Update documents in the collection
result = db.files.update_many(update_criteria, update_values)

# Print the result
print(f"Matched {result.matched_count} document(s) and modified {result.modified_count} document(s).")

# Close the connection
client.close()
