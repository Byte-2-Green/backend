# Base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY educational/code/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY educational/code ./

# Expose the application's port
EXPOSE 3011

# Start the application
CMD ["npm", "run", "dev"]
