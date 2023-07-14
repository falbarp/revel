# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Expose the port that your Node.js application is listening on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]