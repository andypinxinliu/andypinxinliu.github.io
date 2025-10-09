#!/bin/bash

# Script to resize gallery images while maintaining aspect ratios
# This script uses the sips command which is built into macOS

# Create a backup directory with timestamp
BACKUP_DIR="gallery_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Function to resize an image while maintaining aspect ratio
resize_image() {
    local input_file="$1"
    local output_file="$2"
    local max_dimension="$3"
    
    # Get original dimensions
    local width=$(sips -g pixelWidth "$input_file" | tail -n 1 | awk '{print $2}')
    local height=$(sips -g pixelHeight "$input_file" | tail -n 1 | awk '{print $2}')
    
    # Determine if width or height is larger
    if [ "$width" -gt "$height" ]; then
        # Width is larger, resize based on width
        local new_width="$max_dimension"
        local new_height=$(echo "scale=0; $height * $max_dimension / $width" | bc)
    else
        # Height is larger, resize based on height
        local new_height="$max_dimension"
        local new_width=$(echo "scale=0; $width * $max_dimension / $height" | bc)
    fi
    
    # Create output directory if it doesn't exist
    mkdir -p "$(dirname "$output_file")"
    
    # Copy the original file to the backup directory
    cp "$input_file" "$BACKUP_DIR/$(basename "$input_file")"
    
    # Resize the image
    sips -z "$new_height" "$new_width" "$input_file" --out "$output_file"
    
    echo "Resized $input_file from ${width}x${height} to ${new_width}x${new_height}"
}

# Process each gallery folder
for folder in gallery/*/; do
    if [ -d "$folder" ]; then
        echo "Processing folder: $folder"
        
        # Create optimized directory
        optimized_dir="${folder}optimized"
        mkdir -p "$optimized_dir"
        
        # Process each image in the folder
        for img in "$folder"*.{png,jpg,jpeg}; do
            if [ -f "$img" ]; then
                filename=$(basename "$img")
                output_file="$optimized_dir/$filename"
                
                # Resize the image with a maximum dimension of 800 pixels
                resize_image "$img" "$output_file" 800
            fi
        done
    fi
done

echo "All images have been resized and backed up to $BACKUP_DIR"
echo "Original images are preserved, and resized versions are in the 'optimized' subfolder of each gallery folder." 