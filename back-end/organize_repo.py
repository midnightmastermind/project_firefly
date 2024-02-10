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

    unresolved_imports = {}
    unused_dependencies = []
    unimported_files = []

    section_names = ['unresolved imports', 'unused dependencies', 'unimported files']
    section_indices = {}

    for section_name in section_names:
        for i, line in enumerate(lines):
            if f'{section_name}' in line:
                section_indices[section_name] = i + 2
                break

    # Read data from the analysis file
    for section_name, category_index in section_indices.items():
        category_lines = lines[category_index:]
        for line in category_lines:
            if line.strip() == '':
                break
            parts = line.split(' │ ')
            if len(parts) > 1:
                file_path = parts[-1].strip()
                if section_name == 'unresolved imports':
                    line_number = int(parts[0].strip())
                    if line_number != 0:
                        unresolved_imports.setdefault(file_path, []).append(line_number)
                elif section_name == 'unused dependencies':
                    unused_dependencies.append(file_path)
                elif section_name == 'unimported files':
                    unimported_files.append(file_path)

    return unresolved_imports, unused_dependencies, unimported_files

# Assign the return values of read_analysis_file to the variables
unresolved_imports, unused_dependencies, unimported_files = read_analysis_file('back_end_unimported.txt')

print("unimported_files")
print(unimported_files)
print("unresolved_imports")
print(unresolved_imports)
print("unused_dependencies")
print(unused_dependencies)

# Uncomment the following lines to execute the actions
uninstall_dependencies(unused_dependencies)
move_unimported_files(unimported_files)
comment_unresolved_imports(unresolved_imports)
