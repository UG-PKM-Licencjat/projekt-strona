# # Use Bun as the base image
# FROM oven/bun:latest

# # Set the working directory
# WORKDIR /app

# # Copy package definition files and lockfile
# COPY package.json bun.lockb ./

# # Install dependencies
# RUN bun install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# # RUN bun run build

# # Expose the port
# EXPOSE 3000

# # Start the application
# CMD ["bun", "dev"]
