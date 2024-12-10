# Use the official Node.js 20 image
FROM node:20.10.0

# Set the working directory (this will create the directory if it doesn't exist)
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY code/package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY code .

# Expose the port your app runs on
EXPOSE 3010

# Start the application
CMD ["npm", "run", "dev"]
