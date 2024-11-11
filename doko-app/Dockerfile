FROM node:18

# Set the timezone (change to your desired timezone, e.g., Europe/Berlin)
ENV TZ=Europe/Berlin

# Install tzdata to handle timezones (if not already installed)
RUN apt-get update && apt-get install -y tzdata

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
