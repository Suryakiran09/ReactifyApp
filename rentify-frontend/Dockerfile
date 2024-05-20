# Use Node.js image as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /rentify-frontend

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Command to start the application
CMD ["npm", "start"]
