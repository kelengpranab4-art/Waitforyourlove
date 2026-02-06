#!/bin/bash

echo "🚀 Deploying Valentine Website to Netlify..."
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null
then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
    echo "✅ Netlify CLI installed!"
    echo ""
fi

# Deploy to Netlify
echo "🌐 Deploying your site..."
netlify deploy --prod --dir=.

echo ""
echo "✨ Deployment complete!"
echo "📋 Copy the URL above and share it with your Valentine! 💝"
