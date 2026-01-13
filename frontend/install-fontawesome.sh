#!/bin/bash

echo " Installing Font Awesome packages..."
cd "$(dirname "$0")"
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome --legacy-peer-deps

if [ $? -eq 0 ]; then
    echo " Font Awesome installed successfully!"
    echo " You can now run 'npm run dev'"
else
    echo " Installation failed. Please run manually:"
    echo "   npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome --legacy-peer-deps"
fi
