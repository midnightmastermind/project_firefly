import csv

def fix_headers(input_file, output_file):
    with open(input_file, 'r', newline='', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file)
        headers = reader.fieldnames

    # Replace spaces with underscores, convert to lowercase, remove question marks and parentheses
    fixed_headers = [header.replace(' ', '_').lower().replace('?', '').replace('(', '').replace(')', '') for header in headers]

    with open(output_file, 'w', newline='', encoding='utf-8') as csv_file:
        writer = csv.writer(csv_file)
        # Write the modified headers to the output file
        writer.writerow(fixed_headers)

        # Write the rest of the rows
        with open(input_file, 'r', newline='', encoding='utf-8') as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                writer.writerow([row[header] for header in headers])
   
if __name__ == "__main__":
    input_csv = "new_sample_products2.csv"
    output_csv = "fixed_output_file.csv"
    fix_headers(input_csv, output_csv)