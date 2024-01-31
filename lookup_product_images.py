import csv
from google_images_search import GoogleImagesSearch
import os

# Set up Google Images Search API credentials
GCS_DEVELOPER_KEY = 'YOUR_DEVELOPER_KEY'
GCS_CX = 'YOUR_CUSTOM_SEARCH_ENGINE_ID'

# Function to search and download images
def search_and_download_images(name, color):
    # Create a folder named 'product_images' if it doesn't exist
    os.makedirs('product_images', exist_ok=True)

    # Combine name and color to form a search query
    search_query = f"{name} {color}"

    # Initialize Google Images Search API
    gis = GoogleImagesSearch(GCS_DEVELOPER_KEY, GCS_CX)

    # Search for images
    gis.search(search_query)

    # Download the first 5 images and save them in the 'product_images' folder
    for i in range(5):
        image_url = gis.results()[i].url
        image_name = f"{name}_{color}_{i + 1}.png"
        image_path = os.path.join('product_images', image_name)

        # Download and save the image
        gis.results()[i].download(image_path)

# CSV file with 'Name' and 'Color' columns
csv_filename = 'clothing_products.csv'

# Read CSV and generate images for each row
with open(csv_filename, 'r') as csv_file:
    # Assuming the CSV has a header row
    header = csv_file.readline().strip().split(',')
    name_index = header.index('Name')
    color_index = header.index('Color')

    for line in csv_file:
        data = line.strip().split(',')
        name = data[name_index]
        color = data[color_index]

        # Generate images based on product name and color
        search_and_download_images(name, color)
