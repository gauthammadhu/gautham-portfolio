#!/bin/bash

# Deployment script for EC2
set -e

echo "======================================"
echo "Gautham Portfolio - Deployment Script"
echo "======================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker is not installed. Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo -e "${GREEN}Docker installed successfully!${NC}"
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose is not installed. Installing...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}Docker Compose installed successfully!${NC}"
fi

# Stop existing containers
echo -e "${YELLOW}Stopping existing containers...${NC}"
docker-compose down 2>/dev/null || true

# Build and start the application
echo -e "${YELLOW}Building and starting the application...${NC}"
docker-compose up -d --build

# Wait for the application to be healthy
echo -e "${YELLOW}Waiting for the application to be ready...${NC}"
sleep 5

# Check if the application is running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}======================================"
    echo -e "Deployment successful!"
    echo -e "======================================"
    echo -e "Application is running at:"
    echo -e "http://localhost (if running locally)"
    echo -e "http://$(curl -s ifconfig.me) (public IP)"
    echo -e "======================================${NC}"
else
    echo -e "${YELLOW}Application may not be running correctly. Check logs:${NC}"
    echo "docker-compose logs"
fi
