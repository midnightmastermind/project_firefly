import os
import shutil

def uninstall_dependencies(dependencies):
    for dep in dependencies:
        os.system(f"npm uninstall {dep}")

def move_unimported_files(unimported_files):
    destination_folder = "unimported"
    os.makedirs(destination_folder, exist_ok=True)

    for file_path in unimported_files:
        destination_path = os.path.join(destination_folder, file_path)
        os.makedirs(os.path.dirname(destination_path), exist_ok=True)
        shutil.move(file_path, destination_path)

def comment_unresolved_imports(unresolved_imports):
    for file_path, unresolved_lines in unresolved_imports.items():
        with open(file_path, 'r') as file:
            lines = file.readlines()

        for line_number in unresolved_lines:
            lines[line_number - 1] = f"// {lines[line_number - 1]} // at {file_path}\n"

        with open(file_path, 'w') as file:
            file.writelines(lines)

def read_analysis_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Find the indices dynamically
    summary_index = lines.index('       summary               unimported v1.31.1 (node)\n')
    unresolved_index = lines.index('       unresolved imports  :') + 1
    unused_deps_index = lines.index('       unused dependencies :') + 1
    unimported_files_index = lines.index('       unimported files    :') + 1

    unresolved_imports = {}
    unused_dependencies = []
    unimported_files = []

    # Read data from the analysis file
    categories = [(unresolved_index, unresolved_imports), (unused_deps_index, unused_dependencies), (unimported_files_index, unimported_files)]

    for category_index, category_dict in categories:
        category_lines = lines[category_index:]
        for line in category_lines:
            if line.strip() == '':
                break
            parts = line.split(' at ')
            file_path = parts[-1].strip()
            if category_index == unresolved_index:
                line_number = int(parts[0].strip())
                category_dict.setdefault(file_path, []).append(line_number)
            elif category_index == unused_deps_index:
                category_dict.append(file_path)
            elif category_index == unimported_files_index:
                category_dict.append(file_path)

    return unresolved_imports, unused_dependencies, unimported_files

# Replace 'path/to/analysis.txt' with the actual path to your analysis file
analysis_file_path = 'path/to/analysis.txt'
unresolved_imports, unused_dependencies, unimported_files = read_analysis_file(analysis_file_path)

# Uncomment the following lines to execute the actions
# uninstall_dependencies(unused_dependencies)
# move_unimported_files(unimported_files)
# comment_unresolved_imports(unresolved_imports)
