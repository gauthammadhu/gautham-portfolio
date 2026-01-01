# Gautham Madhu - Portfolio Website

A professional portfolio website showcasing the resume and experience of Gautham Madhu, Senior Software Engineer.

## Features

- Modern, responsive design
- Professional resume showcase
- Downloadable PDF resume
- Mobile-friendly interface
- Docker containerization for easy deployment
- Health check endpoints
- Production-ready Node.js backend

## Tech Stack

- **Frontend**: React 18, React Icons
- **Backend**: Node.js, Express
- **Deployment**: Docker, Docker Compose
- **Security**: Helmet.js, CORS
- **Performance**: Compression middleware

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Setup

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

3. Start the development server:
```bash
# Terminal 1 - Start backend
npm run dev

# Terminal 2 - Start frontend
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Production Build

### Build the application:

```bash
# Build frontend
cd client
npm run build
cd ..

# Start production server
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up -d --build
```

The application will be available at `http://localhost`

### Using Docker directly

```bash
# Build the image
docker build -t gautham-portfolio .

# Run the container
docker run -d -p 80:3000 --name gautham-portfolio gautham-portfolio
```

## EC2 Deployment

### Quick Deploy

1. Connect to your EC2 instance via SSH
2. Clone or upload this repository
3. Run the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual EC2 Setup

#### Step 1: Launch EC2 Instance

1. Go to AWS Console > EC2
2. Click "Launch Instance"
3. Choose **Amazon Linux 2023** or **Ubuntu 22.04 LTS**
4. Instance type: **t2.micro** (free tier) or **t2.small**
5. Configure Security Group:
   - SSH (port 22) - Your IP
   - HTTP (port 80) - Anywhere (0.0.0.0/0)
   - HTTPS (port 443) - Anywhere (0.0.0.0/0) [optional]
6. Launch and download the key pair (.pem file)

#### Step 2: Connect to EC2

```bash
# Set proper permissions for key file
chmod 400 your-key.pem

# Connect to EC2
ssh -i your-key.pem ec2-user@your-ec2-public-ip
# For Ubuntu: ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

#### Step 3: Install Dependencies

**For Amazon Linux 2023:**
```bash
# Update system
sudo yum update -y

# Install Git
sudo yum install git -y

# Install Docker
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for docker group to take effect
exit
# Then reconnect via SSH
```

**For Ubuntu:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install git -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again
exit
# Then reconnect via SSH
```

#### Step 4: Deploy Application

```bash
# Clone repository (or upload files)
git clone <your-repo-url>
cd <repo-folder>

# Or if uploading files:
# scp -i your-key.pem -r . ec2-user@your-ec2-ip:~/portfolio

# Run deployment script
chmod +x deploy.sh
./deploy.sh
```

#### Step 5: Access Your Application

Your portfolio will be accessible at:
- `http://your-ec2-public-ip`
- Or configure a domain name pointing to your EC2 IP

### Using GitHub for Deployment

1. Push your code to GitHub
2. On EC2, clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
./deploy.sh
```

### Setting up Auto-deployment (Optional)

Create a webhook or use GitHub Actions to automatically deploy when you push changes.

## Application Management

### View logs:
```bash
docker-compose logs -f
```

### Stop application:
```bash
docker-compose down
```

### Restart application:
```bash
docker-compose restart
```

### Update application:
```bash
git pull
docker-compose up -d --build
```

## Health Check

The application includes a health check endpoint:
- `GET /api/health` - Returns `{"status": "ok", "message": "Server is running"}`

## Security Considerations

1. **Firewall**: Configure EC2 Security Groups properly
2. **HTTPS**: Consider setting up SSL/TLS with Let's Encrypt
3. **Updates**: Regularly update dependencies and base images
4. **Monitoring**: Set up CloudWatch or similar monitoring

## SSL/HTTPS Setup (Optional)

To enable HTTPS with Let's Encrypt:

1. Point a domain to your EC2 IP
2. Install Certbot
3. Update docker-compose.yml to include nginx with SSL

## Troubleshooting

### Container won't start:
```bash
docker-compose logs
```

### Port 80 already in use:
```bash
# Change port in docker-compose.yml
ports:
  - "8080:3000"  # Use port 8080 instead
```

### Application not accessible:
- Check EC2 Security Group allows HTTP (port 80)
- Verify docker container is running: `docker ps`
- Check logs: `docker-compose logs`

## Cost Estimation

Running on AWS EC2:
- **t2.micro** (free tier eligible): Free for 12 months, then ~$8-10/month
- **t2.small**: ~$17/month
- **Data transfer**: First 100 GB/month free

## Support

For issues or questions, contact:
- Email: gauthamchiral@gmail.com
- LinkedIn: @gautham_madhu

## License

MIT License - feel free to use this template for your own portfolio.
