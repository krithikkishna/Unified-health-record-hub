# Build stage
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve build with a simple static server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

# Default command
CMD ["nginx", "-g", "daemon off;"]
