# Stage 1: Build Stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    bash

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production Stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install runtime dependencies
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built application from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.env ./.env

# Change ownership to node user
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]