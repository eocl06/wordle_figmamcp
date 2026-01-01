#!/bin/bash

# Build the project
npm run build

# Create gh-pages branch if it doesn't exist
git checkout --orphan gh-pages
git rm -rf .

# Copy dist contents to root
cp -r dist/* .

# Add all files
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages --force

# Go back to main branch
git checkout main

echo "Deployment complete! Make sure to set GitHub Pages source to 'gh-pages' branch in repository settings."

