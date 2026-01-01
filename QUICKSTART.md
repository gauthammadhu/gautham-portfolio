# Quick Start Guide

Get your portfolio running in minutes!

## Local Development (Quick)

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Start development (terminal 1)
npm run dev

# Start frontend (terminal 2)
cd client && npm start
```

Visit: `http://localhost:3000`

## Docker Deployment (Quickest)

```bash
docker-compose up -d --build
```

Visit: `http://localhost`

## EC2 Deployment (3 Steps)

### 1. Launch EC2 Instance
- AMI: Amazon Linux 2023 or Ubuntu 22.04
- Type: t2.micro (free tier)
- Security Group: Allow HTTP (80) and SSH (22)

### 2. Connect & Upload

```bash
# Connect to EC2
ssh -i your-key.pem ec2-user@YOUR_EC2_IP

# Upload files (from local machine)
scp -i your-key.pem -r . ec2-user@YOUR_EC2_IP:~/portfolio
```

### 3. Deploy

```bash
chmod +x deploy.sh
./deploy.sh
```

Done! Visit: `http://YOUR_EC2_PUBLIC_IP`

## Useful Commands

```bash
# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Stop
docker-compose down

# Update and rebuild
docker-compose up -d --build
```

## Need Help?

See detailed guides:
- `README.md` - Complete documentation
- `EC2_DEPLOYMENT_GUIDE.md` - Detailed EC2 instructions
