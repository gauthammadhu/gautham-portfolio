# Deploy to EC2 - Step by Step Guide

Follow these steps to get your portfolio live on AWS EC2.

## Part 1: Launch EC2 Instance (AWS Console)

### Step 1: Go to AWS Console

1. Open https://console.aws.amazon.com/
2. Sign in to your AWS account
3. Search for "EC2" in the services search bar
4. Click on **EC2** to open the EC2 Dashboard

### Step 2: Launch Instance

1. Click the orange **"Launch Instance"** button
2. Fill in the following:

**Name and tags:**
- Name: `gautham-portfolio`

**Application and OS Images (AMI):**
- Select: **Amazon Linux 2023 AMI** (Free tier eligible)
- Or: **Ubuntu Server 22.04 LTS** (Free tier eligible)

**Instance type:**
- Select: **t2.micro** (Free tier eligible - 750 hours/month free)

**Key pair (login):**
- Click **"Create new key pair"**
  - Key pair name: `gautham-portfolio-key`
  - Key pair type: **RSA**
  - Private key file format: **.pem**
  - Click **"Create key pair"**
  - **IMPORTANT:** Save the `.pem` file somewhere safe! You'll need it to connect.

**Network settings:**
- Click **"Edit"**
- Keep default VPC and subnet
- **Auto-assign public IP:** Enable
- **Firewall (security groups):** Create security group
  - Security group name: `gautham-portfolio-sg`
  - Description: `Security group for portfolio website`
  - Click **"Add security group rule"** to add these rules:

| Type | Protocol | Port Range | Source Type | Source | Description |
|------|----------|------------|-------------|--------|-------------|
| SSH | TCP | 22 | My IP | (auto-filled) | SSH access |
| HTTP | TCP | 80 | Anywhere | 0.0.0.0/0 | Web access |
| HTTPS | TCP | 443 | Anywhere | 0.0.0.0/0 | Secure web (optional) |

**Configure storage:**
- Keep default: 8 GiB gp3 (Free tier eligible)

### Step 3: Launch

1. Click **"Launch instance"** (orange button on the right)
2. Wait for the instance to start (Status: Running)
3. Click on the instance ID to view details
4. **Copy the Public IPv4 address** - you'll need this!

---

## Part 2: Prepare Your Files

### Step 1: Build the Application (Windows)

Open a new terminal (keep the dev server running in the other one):

```powershell
# Navigate to your project
cd "D:\Sample Project"

# Build the React frontend
cd client
npm run build
cd ..
```

This creates an optimized production build in `client/build`.

---

## Part 3: Upload Files to EC2

### Step 1: Prepare Your Key File (Windows)

Open PowerShell and set permissions:

```powershell
# Navigate to where you saved your .pem file
cd Downloads  # or wherever you saved it

# Set permissions (Windows)
icacls "gautham-portfolio-key.pem" /inheritance:r
icacls "gautham-portfolio-key.pem" /grant:r "$env:USERNAME`:R"
```

### Step 2: Upload Files via SCP

```powershell
# Replace YOUR_EC2_IP with your actual EC2 public IP

# For Amazon Linux 2023:
scp -i gautham-portfolio-key.pem -r "D:\Sample Project" ec2-user@YOUR_EC2_IP:~/portfolio

# For Ubuntu:
scp -i gautham-portfolio-key.pem -r "D:\Sample Project" ubuntu@YOUR_EC2_IP:~/portfolio
```

This will take a few minutes to upload all files.

**Alternative: Use WinSCP (Windows GUI)**
1. Download WinSCP: https://winscp.net/
2. Open WinSCP
3. Fill in:
   - Host name: Your EC2 IP
   - User name: `ec2-user` (Amazon Linux) or `ubuntu` (Ubuntu)
   - Click "Advanced" > SSH > Authentication > Private key file: Select your .pem file
4. Click "Login"
5. Drag and drop your project folder

---

## Part 4: Connect and Deploy

### Step 1: SSH into EC2

```powershell
# For Amazon Linux:
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP

# For Ubuntu:
ssh -i gautham-portfolio-key.pem ubuntu@YOUR_EC2_IP
```

You should now be connected to your EC2 instance!

### Step 2: Run the Deployment Script

```bash
# Navigate to your project
cd portfolio

# Make the deploy script executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

The script will:
- Install Docker and Docker Compose
- Build your application
- Start the container
- Show you the URL

**IMPORTANT:** After installing Docker, you'll need to logout and login again:

```bash
exit
# Then reconnect via SSH
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
cd portfolio
docker-compose up -d --build
```

---

## Part 5: Access Your Website

Your portfolio is now live! Open your browser and visit:

```
http://YOUR_EC2_IP
```

Replace `YOUR_EC2_IP` with your actual EC2 public IP address.

---

## Troubleshooting

### Can't connect via SSH?

**Check security group:**
1. EC2 Console > Instances > Select your instance
2. Click "Security" tab
3. Click the security group link
4. Verify port 22 is open to "My IP"

**Key file permissions:**
```powershell
# Windows - run in PowerShell as Administrator
icacls "gautham-portfolio-key.pem" /reset
icacls "gautham-portfolio-key.pem" /inheritance:r
icacls "gautham-portfolio-key.pem" /grant:r "$env:USERNAME`:R"
```

### Can't see the website?

**Check Docker:**
```bash
docker ps  # Should show a running container
docker-compose logs  # Check for errors
```

**Check security group:**
- Ensure port 80 is open to 0.0.0.0/0

### Application not starting?

**View logs:**
```bash
cd ~/portfolio
docker-compose logs -f
```

**Restart:**
```bash
docker-compose down
docker-compose up -d --build
```

---

## Useful Commands

```bash
# Check if container is running
docker ps

# View logs
docker-compose logs -f

# Restart application
docker-compose restart

# Stop application
docker-compose down

# Start application
docker-compose up -d

# Check Docker status
sudo systemctl status docker
```

---

## Next Steps

1. **Get a domain name** (optional)
   - Buy from GoDaddy, Namecheap, or use Route53
   - Point A record to your EC2 IP

2. **Enable HTTPS** (recommended)
   - Install Let's Encrypt SSL certificate
   - Configure nginx as reverse proxy

3. **Set up monitoring**
   - Enable CloudWatch monitoring
   - Set up alerts for downtime

---

## Cost Information

**Free Tier (First 12 months):**
- t2.micro: 750 hours/month FREE
- 30 GB storage: FREE
- 15 GB data transfer out: FREE

**After Free Tier:**
- t2.micro: ~$8-10/month
- Storage: ~$0.80/month (8 GB)
- Data transfer: First 100 GB free, then ~$0.09/GB

**Cost Saving Tip:** Stop your instance when not needed (Instance > Instance State > Stop). You only pay for storage when stopped (~$0.80/month).

---

## Need Help?

If you get stuck:
1. Check the logs: `docker-compose logs`
2. Verify security groups allow HTTP traffic
3. Ensure Docker is running: `sudo systemctl status docker`
4. Try restarting: `docker-compose restart`

Your portfolio should now be live! Share your URL: `http://YOUR_EC2_IP`
