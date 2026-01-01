# Multi-stage build for optimized image size

# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Setup Node.js backend
FROM node:18-alpine AS backend-build
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

# Stage 3: Production image
FROM node:18-alpine
WORKDIR /app

# Copy backend dependencies and files
COPY --from=backend-build /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

# Copy built frontend
COPY --from=frontend-build /app/client/build ./client/build

# Copy resume PDF
COPY public ./public

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run the application
CMD ["node", "server.js"]
