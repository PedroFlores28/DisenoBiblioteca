import re
import os

FILE_PATH = os.path.join("src", "data", "careersData.js")

def update_file():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match: { id: 1, ... imageUrl: '...' }
    # We want to replace the imageUrl value.
    # We need to capture the ID to construct the new filename.
    
    # This regex looks for:
    # id: (\d+) -> captures the ID
    # .*? -> matches anything in between (non-greedy)
    # imageUrl: '([^']+)' -> matches the imageUrl part
    
    # We need to be careful not to match across multiple lines if the objects were multi-line, 
    # but based on the file view, they seem to be single lines.
    # However, let's process line by line to be safer.
    
    new_lines = []
    lines = content.split('\n')
    
    count = 0
    for line in lines:
        match = re.search(r"id:\s*(\d+).*?imageUrl:\s*'([^']+)'", line)
        if match:
            id_val = match.group(1)
            # Check if it's already a require (unlikely given previous step, but good safety)
            old_url = match.group(2)
            if "require" not in old_url:
                new_line = line.replace(f"'{old_url}'", f"require('@/assets/images/bibliografias/career-{id_val}.jpg')")
                new_lines.append(new_line)
                count += 1
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)
            
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
        
    print(f"Updated {count} lines in {FILE_PATH}")

if __name__ == "__main__":
    update_file()
