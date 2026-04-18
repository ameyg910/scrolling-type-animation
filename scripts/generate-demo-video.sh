#!/bin/bash

# Janani Vikalakshi - Demo Video Generator
# This script generates a test video for the scrollytelling experience

output_file="public/videos/janani-vikalakshi.mp4"
duration="8"

# Colors (modify these to match your design)
bg_color="#0a0a0a"    # Dark background
accent_color="#ffffff" # White text

# Create videos directory if it doesn't exist
mkdir -p "public/videos"

echo "🎬 Generating demo video for Janani Vikalakshi..."
echo "Duration: ${duration}s"
echo "Output: ${output_file}"
echo ""

# Generate video using ffmpeg (simplified version)
ffmpeg -f lavfi \
  -i "color=${bg_color}:s=1920x1080:d=${duration}" \
  -f lavfi \
  -i "sine=frequency=440:duration=${duration}" \
  -c:v libx264 \
  -preset slow \
  -crf 18 \
  -c:a aac \
  -b:a 128k \
  -y \
  "${output_file}"

echo ""
echo "✅ Demo video generated successfully!"
echo "📍 Location: ${output_file}"
echo ""
echo "Next steps:"
echo "1. npm run dev"
echo "2. Open http://localhost:3000"
echo "3. Scroll to see the video sync with scroll position"
echo ""
echo "To use your own video:"
echo "1. Replace the video file at ${output_file}"
echo "2. Update the background color in app/page.tsx if needed"
echo "3. Customize text overlays in app/page.tsx"
