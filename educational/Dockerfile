# Use the official Node.js 20 image
FROM node:20.10.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY code/package*.json ./ 

# Install dependencies
RUN npm install

# Copy the application code (this will be mounted as a volume via Docker Compose, so no need to copy here)
# Remove the following line since it's handled by volume mounting in docker-compose.yml
# COPY code .

# Expose the port the app runs on
EXPOSE 3011

# Start the application
CMD ["npm", "run", "dev"]
