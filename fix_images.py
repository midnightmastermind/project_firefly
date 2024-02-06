# import csv

# def fix_images_column(input_file, output_file):
#     with open(input_file, 'r', newline='', encoding='utf-8') as csv_file:
#         reader = csv.DictReader(csv_file)
#         headers = reader.fieldnames

#     # Replace spaces with underscores, convert to lowercase, remove question marks and parentheses
#     fixed_headers = [header.replace(' ', '_').lower().replace('?', '').replace('(', '').replace(')', '') for header in headers]

#     with open(output_file, 'w', newline='', encoding='utf-8') as csv_file:
#         writer = csv.writer(csv_file)
#         # Write the modified headers to the output file
#         writer.writerow(fixed_headers)

#         # Write the rest of the rows
#         with open(input_file, 'r', newline='', encoding='utf-8') as csv_file:
#             reader = csv.DictReader(csv_file)
#             for row in reader:
#                 # Convert the Images column into an array of URLs
#                 row['images'] = row['images'].split(',') if row['images'] else []
#                 writer.writerow([row[header] for header in headers])

# if __name__ == "__main__":
#     input_csv = "new_sample_products.csv"
#     output_csv = "fixed_output_file.csv"
#     fix_images_column(input_csv, output_csv)
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('localhost', 27017)
db = client['default_db']
collection = db['products']

# Iterate over documents in the collection and update 'images' to an array
for document in collection.find():
    try:
        # Convert the 'images' field to a list
        images = document['images'].split(',')
        # Update the 'images' field in MongoDB
        collection.update_one(
            {'_id': document['_id']},
            {'$set': {'images': images}}
        )
        print(f"Successfully updated document with _id: {document['_id']}")
    except Exception as e:
        print(f"Error updating document with _id: {document['_id']}. Error: {e}")
