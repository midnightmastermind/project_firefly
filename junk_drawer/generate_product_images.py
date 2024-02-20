from diffusers import StableDiffusionPipeline
from PIL import Image
import csv
import os
from torch import autocast

# Machine Learning libraries
import torch

# Limit GPU memory allocation to a percentage (e.g., 50%)
torch.cuda.set_per_process_memory_fraction(0.5)

# Download stable diffusion model from Hugging Face
model_id = "CompVis/stable-diffusion-v1-4"
device = "cuda"
pipe = StableDiffusionPipeline.from_pretrained(model_id, use_auth_token=True)

# Function to generate image from text
def generate_image(name, color):
    """This function generates an image from text with stable diffusion"""
    with autocast(device):
        image = pipe(f"{name} {color}", guidance_scale=8.5).images[0]

    # Create a folder named 'product_images' if it doesn't exist
    os.makedirs('product_images', exist_ok=True)

    # Save the generated image in the 'product_images' folder with the format {name}-{color}.png
    file_name = os.path.join('product_images', f"{name}-{color}.png")
    image.save(file_name)
    return file_name

# Assume you have a CSV file named 'clothing_products.csv' with 'Name' and 'Color' columns
csv_filename = 'clothing_products.csv'

# Read CSV and generate images for each row
try:
    with open(csv_filename, 'r') as csv_file:
        # Assuming the CSV has a header row
        header = csv_file.readline().strip().split(',')
        name_index = header.index('Name')
        color_index = header.index('Color')

        for line in csv_file:
            data = line.strip().split(',')
            name = data[name_index]
            color = data[color_index]

            # Generate image and get the file name
            generated_image_file = generate_image(name, color)
            print(f"Generated image: {generated_image_file}")

except Exception as e:
    print(f"An error occurred: {str(e)}")

