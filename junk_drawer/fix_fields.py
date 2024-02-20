from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('localhost', 27017)
db = client['default_db']
collection = db['products']

# Define the field name mappings with spaces
field_mappings = {
    "ID": "id",
    "Type": "product_type",
    "SKU": "sku",
    "Name": "product_name",
    "Published": "is_published",
    "Is featured?": "is_featured",
    "Visibility in catalog": "catalog_visibility",
    "Short description": "short_description",
    "description": "product_description",
    "In stock?": "is_in_stock",
    "Stock": "stock_quantity",
    "Backorders allowed?": "allow_backorders",
    "Sold individually?": "is_sold_individually",
    "Allow customer reviews?": "allow_customer_reviews",
    "Regular price": "product_price",
    "Categories": "product_categories",
    "Images": "product_images",
    "Attribute 1 name": "attribute_1_name",
    "Attribute 1 value(s)": "attribute_1_values",
    "Attribute 2 name": "attribute_2_name",
    "Attribute 2 value(s)": "attribute_2_values",
    "Weight": "product_weight",  # Added the 'Weight' field
}

# Update field names in each document
for document in collection.find():
    updated_document = {}
    for old_field, new_field in field_mappings.items():
        if old_field in document:
            updated_document[new_field] = document.pop(old_field)
    if updated_document:
        collection.update_one({'_id': document['_id']}, {'$set': updated_document})
        print(f"Updated document with _id {document['_id']}")

# Close the MongoDB connection
client.close()
