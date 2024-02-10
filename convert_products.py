from pymongo import MongoClient
from bson import json_util
from collections import defaultdict

def transform_data(documents):
    converted_products = []

    for doc in documents:
        if doc["type"] == "variable":
            # Initialize lists to store fields and data
            fields = []
            data = []

            # Extract common fields dynamically
            common_fields = [key for key in doc.keys() if key not in ["_id", "type"] and not key.startswith("attribute_")]

            for key in common_fields:
                value = doc.get(key, "")
                field = {
                    "name": key.lower().replace(" ", "_"),
                    "label": key.capitalize(),
                    "type": "Text" if key == "description" or key == "categories" else "Number",
                    "editable": True,
                    "variation": False,
                    "value": value
                }
                fields.append(field)

            # Extract variation fields dynamically
            for attribute_key, attribute_values in doc.items():
                if attribute_key.startswith("attribute_") and attribute_key.endswith("_values"):
                    attribute_number = attribute_key.split("_")[1]
                    attribute_name_key = f"attribute_{attribute_number}_name"
                    attribute_name = doc.get(attribute_name_key, "")

                    if attribute_name and attribute_values:
                        field = {
                            "name": attribute_name.lower().replace(" ", "_"),
                            "label": attribute_name,
                            "type": "Text",
                            "editable": True,
                            "variation": True,
                            "selection": attribute_values
                        }
                        fields.append(field)

            converted_product = {'fields': fields, 'data': data}
            converted_products.append(converted_product)

        elif doc["type"] == "variation":
            variation_data = {}
            for key, value in doc.items():
                if not key.startswith("attribute_"):
                    variation_data[key] = value

            # Extract attributes dynamically for variations
            for attribute_key, attribute_values in doc.items():
                if attribute_key.startswith("attribute_") and attribute_key.endswith("_values"):
                    attribute_number = attribute_key.split("_")[1]
                    attribute_name_key = f"attribute_{attribute_number}_name"
                    attribute_name = doc.get(attribute_name_key, "")

                    if attribute_name and attribute_values and isinstance(attribute_values, list):
                        variation_data[attribute_name.lower().replace(" ", "_")] = attribute_values[0]

            converted_products[-1]["data"].append(variation_data)

    return converted_products


def insert_into_converted_products(converted_products):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['default_db']
    converted_collection = db['converted_products']

    for converted_product in converted_products:
        converted_collection.insert_one(converted_product)

def main():
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client['default_db']
    collection = db['products']

    # Retrieve documents from the collection
    documents = list(collection.find())

    # Get the converted products
    converted_products = transform_data(documents)

    # Insert into the converted_products collection
    insert_into_converted_products(converted_products)

    # Example: Print out the first converted product
    print("Example: Print out the first converted product")
    print(converted_products[0])

if __name__ == "__main__":
    main()