# EC2 Deployment Guide - Quick Reference

This guide provides step-by-step instructions to deploy your portfolio website on AWS EC2.

## Prerequisites

- AWS Account
- Basic knowledge of SSH and terminal commands

## Step 1: Launch EC2 Instance

### 1.1 Create Instance

1. Log in to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **EC2 Dashboard**
3. Click **"Launch Instance"**

### 1.2 Configure Instance

| Setting | Recommended Value |
|---------|------------------|
| **Name** | gautham-portfolio |
| **AMI** | Amazon Linux 2023 or Ubuntu 22.04 LTS |
| **Instance Type** | t2.micro (free tier) or t2.small |
| **Key Pair** | Create new or use existing (.pem file) |

### 1.3 Configure Security Group

Create a new security group or modify existing one with these rules:

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| SSH | TCP | 22 | My IP | SSH access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Web traffic |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Secure web traffic (optional) |

### 1.4 Launch

1. Review settings
2. Click **"Launch Instance"**
3. Wait for instance to start (Status: Running)
4. Note the **Public IPv4 address**

## Step 2: Connect to EC2

### 2.1 Set Key Permissions (First time only)

**Windows (PowerShell):**
```powershell
icacls "your-key.pem" /inheritance:r
icacls "your-key.pem" /grant:r "%username%:R"
```

**Mac/Linux:**
```bash
chmod 400 your-key.pem
```

### 2.2 SSH Connect

**For Amazon Linux:**
```bash
ssh -i your-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

**For Ubuntu:**
```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

Replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 public IP address.

## Step 3: Upload Application Files

### Option A: Using SCP (from your local machine)

```bash
# From your local project directory
scp -i your-key.pem -r . ec2-user@YOUR_EC2_PUBLIC_IP:~/portfolio
```

### Option B: Using Git

```bash
# On EC2 instance
sudo yum install git -y  # Amazon Linux
# OR
sudo apt install git -y  # Ubuntu

git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

## Step 4: Run Automated Deployment

Once connected to EC2 and in the project directory:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script will:
- Install Docker and Docker Compose
- Build the application
- Start the container
- Display the application URL

## Step 5: Verify Deployment

1. Open browser and navigate to: `http://YOUR_EC2_PUBLIC_IP`
2. You should see your portfolio website
3. Test the download resume button

## Manual Installation Steps

If you prefer manual setup or the script fails:

### Install Docker (Amazon Linux)

```bash
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
```

### Install Docker (Ubuntu)

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

### Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Logout and Login

```bash
exit
# Then reconnect via SSH for group changes to take effect
```

### Deploy Application

```bash
cd ~/portfolio  # or your project directory
docker-compose up -d --build
```

## Post-Deployment

### View Application Logs

```bash
docker-compose logs -f
```

### Check Container Status

```bash
docker ps
```

### Restart Application

```bash
docker-compose restart
```

### Stop Application

```bash
docker-compose down
```

### Update Application

```bash
git pull  # If using Git
docker-compose up -d --build
```

## Domain Setup (Optional)

### Step 1: Point Domain to EC2

1. Purchase domain from provider (GoDaddy, Namecheap, Route53, etc.)
2. Create an **A Record** pointing to your EC2 public IP
3. Wait for DNS propagation (5-60 minutes)

### Step 2: Access via Domain

Once DNS propagates, access your site at: `http://yourdomain.com`

## SSL/HTTPS Setup (Optional)

For production, you should enable HTTPS:

### Using Certbot with Nginx

1. Install nginx and certbot:
```bash
sudo yum install nginx certbot python3-certbot-nginx -y
# OR
sudo apt install nginx certbot python3-certbot-nginx -y
```

2. Configure nginx as reverse proxy
3. Run certbot:
```bash
sudo certbot --nginx -d yourdomain.com
```

## Troubleshooting

### Application not accessible

**Check Security Group:**
- Ensure port 80 is open to 0.0.0.0/0
- Verify instance is running

**Check Docker:**
```bash
docker ps  # Should show running container
docker-compose logs  # Check for errors
```

### Port 80 already in use

```bash
# Check what's using port 80
sudo netstat -tulpn | grep :80

# Stop the service if needed
sudo systemctl stop httpd  # Amazon Linux
sudo systemctl stop apache2  # Ubuntu
```

### Docker permission denied

```bash
# Logout and login again after adding user to docker group
exit
# Reconnect via SSH
```

### Out of memory

- Upgrade to larger instance type (t2.small or t2.medium)
- Or add swap space:
```bash
sudo dd if=/dev/zero of=/swapfile bs=128M count=16
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## Monitoring

### Check Application Health

```bash
curl http://localhost/api/health
```

Expected response: `{"status":"ok","message":"Server is running"}`

### Monitor Resource Usage

```bash
# CPU and Memory
htop

# Docker stats
docker stats
```

## Cost Management

### Free Tier (First 12 months)

- t2.micro: 750 hours/month free
- 30 GB storage free
- 100 GB data transfer out free

### After Free Tier

- t2.micro: ~$8-10/month
- t2.small: ~$17/month
- Storage: ~$0.10/GB/month

### Cost Saving Tips

1. **Stop instance when not needed:**
```bash
# From AWS Console: Instance > Instance State > Stop
```

2. **Use Elastic IP** (to keep same IP when stopping/starting)

3. **Monitor usage** with AWS Cost Explorer

## Backup

### Backup Files

```bash
# From local machine
scp -i your-key.pem -r ec2-user@YOUR_EC2_IP:~/portfolio ./backup
```

### Create EC2 Snapshot

1. EC2 Console > Elastic Block Store > Snapshots
2. Create Snapshot
3. Select your instance volume

## Security Best Practices

1. **Keep system updated:**
```bash
sudo yum update -y  # Amazon Linux
sudo apt update && sudo apt upgrade -y  # Ubuntu
```

2. **Enable automatic security updates**

3. **Use strong SSH keys** (minimum 2048-bit RSA)

4. **Limit SSH access** to specific IPs in security group

5. **Enable HTTPS** for production

6. **Regular backups** of your application

## Quick Commands Reference

```bash
# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Stop
docker-compose down

# Start
docker-compose up -d

# Rebuild and restart
docker-compose up -d --build

# Check health
curl http://localhost/api/health

# Monitor resources
docker stats
```

## Support

If you encounter issues:

1. Check application logs: `docker-compose logs`
2. Verify security group settings
3. Ensure Docker is running: `sudo systemctl status docker`
4. Check EC2 instance status in AWS Console

## Next Steps

- Set up a domain name
- Enable HTTPS with Let's Encrypt
- Configure automated backups
- Set up CloudWatch monitoring
- Configure auto-scaling (for high traffic)

---

**Your portfolio is now live!**

Access it at: `http://YOUR_EC2_PUBLIC_IP`
