# Use Node.js Alpine-based image
FROM node:22-alpine3.19

# Set working directory
WORKDIR /app
# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 8888

# Start the application with hot reload
CMD ["npm", "run", "start:dev"] 