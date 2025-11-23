# Use Node.js LTS base image
FROM node:18.17.1-alpine3.18

# Set working directory
WORKDIR /usr/src/app

# Copy only package files to install dependencies
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the backend port
EXPOSE 15200

# Start the backend server
CMD ["node", "server.js"]
