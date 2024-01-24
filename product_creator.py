import csv
import random

def generate_random_data():
    ids = list(range(1, 999))  # Ensure unique product IDs for Men's variations
    names = ['Graphic Tee', 'Winter Hat', 'Jacket', 'Jeans', 'Dress', 'Sweater', 'Shorts', 'Shirt', 'Cargo Pants', 'Khaki Pants', 'Denim Jeans', 'Chino Pants', 'Striped Shirt', 'Polo Shirt', 'Flannel Shirt', 'Sweatshirt']
    accessory_names = ['Hat', 'Cap', 'Scarf', 'Gloves', 'Belt', 'Beanie', 'Sunglasses']
    colors = ['Red', 'Blue', 'Green', 'Black', 'White']
    sizes = ['Small', 'Medium', 'Large', 'XL']
    inventory = [random.randint(0, 50) for _ in range(999)]
    prices = [round(random.uniform(10.0, 50.0), 2) for _ in range(999)]

    data = []
    unique_products = set()  # To track unique combinations of name, color, and size

    # Create every variation for accessories
    for accessory_name in accessory_names:
        accessory_id = ids.pop(0)  # Use the same ID for each accessory name
        for color in colors:
            for size in sizes:
                product_type = 'Accessory'
                category = 'Unisex,Accessories'
                stock = random.choice(inventory)
                price = random.choice(prices)

                # Add accessory option
                row_accessory = [accessory_id, f"{accessory_name}", color, product_type, category, size, stock, price]
                data.append(row_accessory)

    # Create both Men's and Women's variations for every size and color combo for each clothing item
    for name in names:
        id_mens = ids.pop(0)  # Use a unique ID for each Men's variation
        id_womens = ids.pop(0)  # Use a unique ID for each Women's variation

        for color in colors:
            for size in sizes:
                product_type = 'Clothing'

                # Check for duplicates
                while True:
                    color = random.choice(colors)
                    size = random.choice(sizes)
                    name_id_key = (name, color, size)

                    if name_id_key not in unique_products:
                        break

                unique_products.add(name_id_key)

                # Create both Men's and Women's variations for every size and color combo
                category_mens = f'Men,Clothing,{name.split(" ")[-1]}'
                row_mens = [id_mens, f"Men's {name}", color, product_type, category_mens, size, random.choice(inventory), random.choice(prices)]
                data.append(row_mens)

                category_womens = f'Women,Clothing,{name.split(" ")[-1]}'
                row_womens = [id_womens, f"Women's {name}", color, product_type, category_womens, size, random.choice(inventory), random.choice(prices)]
                data.append(row_womens)

    return data

def write_to_csv(data, filename):
    with open(filename, 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        headers = ["ID", "Name", "Color", "Type", "Categories", "Size", "Inventory", "Price"]
        csv_writer.writerow(headers)
        csv_writer.writerows(data)

if __name__ == "__main__":
    random_data = generate_random_data()
    write_to_csv(random_data, "clothing_products.csv")

    print("Generated data has been written to 'clothing_products.csv'.")

