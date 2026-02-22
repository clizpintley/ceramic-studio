#!/bin/bash
set -e

# Fix permissions on all binaries
find node_modules/.bin -type f -exec chmod +x {} \;

# Run the build
npm run build
