#!/bin/bash

# Create backup directory
backup_dir="gallery_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$backup_dir"

# Function to rename files in a directory
rename_files() {
    local dir="$1"
    local count=1
    
    # First, backup the directory
    cp -r "$dir" "$backup_dir/"
    
    # Rename files to sequential numbers
    for file in "$dir"/*.{png,PNG,jpg,JPEG,jpeg,JPEG}; do
        if [ -f "$file" ]; then
            extension="${file##*.}"
            extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
            new_name="$dir/$count.$extension"
            mv "$file" "$new_name"
            ((count++))
        fi
    done
}

# Process each directory
for dir in gallery/*/; do
    if [ -d "$dir" ]; then
        echo "Processing $dir"
        rename_files "$dir"
    fi
done

echo "Backup created in $backup_dir"
echo "Files have been renamed sequentially in each directory" 