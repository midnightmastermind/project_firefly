import tkinter as tk
from tkinter import messagebox
from diffusers import StableDiffusionPipeline
from PIL import Image, ImageTk
import csv
import os

# Machine Learning libraries
import torch
from torch import autocast

# private modules
from authtoken import auth_token

# Create app user interface
app = tk.Tk()
app.geometry("532x632")
app.title("Text to Image app")
app.configure(bg='black')

# Create a placeholder to show the generated image
img_placeholder = tk.Label(app, height=512, width=512, text="")
img_placeholder.place(x=10, y=110)

# Download stable diffusion model from hugging face
modelid = "CompVis/stable-diffusion-v1-4"
device = "cuda"
stable_diffusion_model = StableDiffusionPipeline.from_pretrained(modelid, variant="fp16", torch_dtype=torch.float16, use_auth_token=auth_token)
stable_diffusion_model.to(device)

# Function to generate image from text
def generate_image(name, color):
    """This function generates an image from text using stable diffusion"""
    with autocast(device):
        image = stable_diffusion_model(f"{name} {color}", guidance_scale=8.5)["sample"][0]

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

            # Display the generated image file name
            img_placeholder.configure(text=generated_image_file)
            img_placeholder.update_idletasks()

    messagebox.showinfo("Success", "Generated images have been saved to the 'product_images' folder.")
except Exception as e:
    messagebox.showerror("Error", f"An error occurred: {str(e)}")

# Optional: Close the Tkinter window after processing all rows
app.destroy()
