#!/bin/bash

# Deployment script for Unified Health Record Hub - React Frontend

# Variables
PROJECT_NAME="uhrh-frontend"
BUILD_DIR="dist"
REMOTE_USER="your-username"
REMOTE_HOST="your.server.ip"
REMOTE_PATH="/var/www/$PROJECT_NAME"

echo "🔧 Building project..."
npm run build

echo "📦 Compressing build directory..."
tar -czf $BUILD_DIR.tar.gz $BUILD_DIR

echo "🚀 Deploying to $REMOTE_USER@$REMOTE_HOST..."
scp $BUILD_DIR.tar.gz $REMOTE_USER@$REMOTE_HOST:/tmp/

echo "📁 Unpacking on remote server..."
ssh $REMOTE_USER@$REMOTE_HOST << EOF
  rm -rf $REMOTE_PATH
  mkdir -p $REMOTE_PATH
  tar -xzf /tmp/$BUILD_DIR.tar.gz -C $REMOTE_PATH --strip-components=1
  rm /tmp/$BUILD_DIR.tar.gz
  echo "✅ Deployment complete at $REMOTE_PATH"
EOF

echo "🎉 Deployment successful!"
