import re
import os
import unicodedata

DATA_FILE_PATH = os.path.join("src", "data", "careersData.js")
IMAGES_DIR = os.path.join("src", "assets", "images", "bibliografias")

def slugify(value):
    """
    Normalizes string, converts to lowercase, removes non-alpha characters,
    and converts spaces to hyphens.
    """
    value = str(value)
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    value = re.sub(r'[-\s]+', '-', value)
    return value

def rename_images():
    if not os.path.exists(DATA_FILE_PATH):
        print(f"File not found: {DATA_FILE_PATH}")
        return

    with open(DATA_FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    new_lines = []
    lines = content.split('\n')
    
    renamed_count = 0
    
    for line in lines:
        # Match: { id: 1, name: '...', ... imageUrl: require('...') }
        # We need to extract ID and Name to find the old file and determine the new name.
        
        # Regex to capture ID and Name from the line
        id_match = re.search(r"id:\s*(\d+)", line)
        name_match = re.search(r"name:\s*'([^']+)'", line)
        
        if id_match and name_match:
            id_val = id_match.group(1)
            name_val = name_match.group(1)
            
            old_filename = f"career-{id_val}.jpg"
            old_path = os.path.join(IMAGES_DIR, old_filename)
            
            new_filename = f"{slugify(name_val)}.jpg"
            new_path = os.path.join(IMAGES_DIR, new_filename)
            
            # 1. Rename the file if it exists
            if os.path.exists(old_path):
                # Check if new file already exists (duplicate names?)
                if not os.path.exists(new_path):
                    try:
                        os.rename(old_path, new_path)
                        print(f"Renamed: {old_filename} -> {new_filename}")
                    except OSError as e:
                        print(f"Error renaming {old_filename}: {e}")
                else:
                     # If the destination already exists (e.g. two careers with same name?), 
                     # we might just want to use it, or append ID to differentiate.
                     # For now, let's assume names are unique enough or just overwrite/use existing.
                     # But to be safe, let's just log it.
                     print(f"Target file already exists: {new_filename}. Skipping rename for {old_filename}")
                     
            elif os.path.exists(new_path):
                 # File might have already been renamed in a previous run
                 print(f"File already renamed: {new_filename}")
            else:
                # print(f"Source file not found: {old_filename}")
                pass

            # 2. Update the line in JS file
            # Replace the require(...) part
            # Look for require('@/assets/images/bibliografias/career-ID.jpg')
            # changing strictly just the filename part to be safer
            
            search_pattern = f"require('@/assets/images/bibliografias/career-{id_val}.jpg')"
            replacement = f"require('@/assets/images/bibliografias/{new_filename}')"
            
            if search_pattern in line:
                new_line = line.replace(search_pattern, replacement)
                new_lines.append(new_line)
                renamed_count += 1
            else:
                 # It might already be updated or using the URL format?
                 # If we are re-running, it might differ.
                 # Let's try to replace based on generic pattern if specific fail?
                 # No, better stick to the known state "career-{id}.jpg"
                 new_lines.append(line)
                 
        else:
            new_lines.append(line)

    with open(DATA_FILE_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))

    print(f"Process completed. Updated {renamed_count} lines in code.")

if __name__ == "__main__":
    rename_images()
