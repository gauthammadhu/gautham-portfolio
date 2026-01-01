# GitHub Actions Automated Deployment to EC2

This guide will help you set up automated deployment using GitHub Actions. Every time you push code to the `main` branch, it will automatically deploy to your EC2 instance.

## Overview

**What happens when you push code:**
1. GitHub Actions builds your React app
2. Connects to your EC2 instance via SSH
3. Pulls the latest code
4. Builds and restarts the Docker container
5. Verifies the deployment was successful

## Part 1: Setup EC2 Instance (One-Time)

### Step 1: Launch EC2 Instance

Follow the checklist in `EC2_CHECKLIST.md` to:
1. Launch a t2.micro instance
2. Configure security group (SSH port 22, HTTP port 80)
3. Download your `.pem` key file
4. Note your EC2 public IP address

### Step 2: Initial Setup on EC2

**Connect to EC2:**
```bash
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
```

**Install Docker and Docker Compose:**
```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install docker git -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login for docker group to take effect
exit
```

**Reconnect and clone your repository:**
```bash
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP

# Clone your repository (you'll do this after creating it on GitHub)
git clone https://github.com/YOUR_USERNAME/gautham-portfolio.git portfolio
cd portfolio
```

---

## Part 2: Create GitHub Repository

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in:
   - Repository name: `gautham-portfolio`
   - Description: `Professional portfolio website`
   - Visibility: **Public** (or Private if you prefer)
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

**On your local machine (Windows PowerShell):**

```powershell
# Navigate to your project
cd "D:\Sample Project"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website with Docker and GitHub Actions"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/gautham-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

If prompted for credentials, you'll need a **Personal Access Token**:
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when pushing

---

## Part 3: Configure GitHub Secrets

GitHub Actions needs credentials to connect to your EC2 instance.

### Step 1: Get Your SSH Private Key

**On Windows:**
```powershell
# Read your .pem file content
Get-Content gautham-portfolio-key.pem | Set-Clipboard
```

The private key is now copied to your clipboard.

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **"New repository secret"**

**Add these three secrets:**

**Secret 1: EC2_HOST**
- Name: `EC2_HOST`
- Value: Your EC2 public IP (e.g., `54.123.456.789`)
- Click "Add secret"

**Secret 2: EC2_USERNAME**
- Name: `EC2_USERNAME`
- Value: `ec2-user` (for Amazon Linux) or `ubuntu` (for Ubuntu)
- Click "Add secret"

**Secret 3: EC2_SSH_KEY**
- Name: `EC2_SSH_KEY`
- Value: Paste your entire `.pem` file content (from clipboard)
  - Should start with `-----BEGIN RSA PRIVATE KEY-----`
  - Should end with `-----END RSA PRIVATE KEY-----`
  - Include everything, including the header and footer
- Click "Add secret"

---

## Part 4: Initial Manual Deployment

Before GitHub Actions can work, we need to do an initial deployment manually.

### Step 1: Connect to EC2

```bash
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
```

### Step 2: Clone and Deploy

```bash
# Clone repository (if not already done)
git clone https://github.com/YOUR_USERNAME/gautham-portfolio.git portfolio
cd portfolio

# Run initial deployment
chmod +x deploy.sh
./deploy.sh

# If you need to logout/login for Docker:
exit
# Reconnect
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
cd portfolio
docker-compose up -d --build
```

### Step 3: Verify

Visit `http://YOUR_EC2_IP` to confirm the site is working.

---

## Part 5: Test Automated Deployment

Now let's test the GitHub Actions workflow!

### Step 1: Make a Small Change

**On your local machine:**

```powershell
cd "D:\Sample Project"

# Make a small change (example: update the tagline)
# Edit client/src/App.js or any file

# Commit and push
git add .
git commit -m "Test automated deployment"
git push origin main
```

### Step 2: Watch the Deployment

1. Go to your GitHub repository
2. Click **Actions** tab (top menu)
3. You should see your workflow running: "Deploy to EC2"
4. Click on it to watch the progress in real-time
5. Wait for all steps to complete (green checkmarks)

### Step 3: Verify

1. Visit `http://YOUR_EC2_IP`
2. Refresh the page
3. Your changes should be live!

---

## How It Works

### Workflows

**1. deploy.yml** (Runs on push to main)
- Builds the React application
- Connects to EC2 via SSH
- Pulls latest code
- Rebuilds and restarts Docker container
- Verifies deployment success

**2. build-test.yml** (Runs on pull requests)
- Tests that the application builds successfully
- Useful for catching errors before merging

### Manual Deployment Trigger

You can also trigger deployment manually:
1. Go to GitHub → Actions tab
2. Click "Deploy to EC2" workflow
3. Click "Run workflow" button
4. Select branch and click "Run workflow"

---

## Troubleshooting

### GitHub Actions fails to connect to EC2

**Check:**
- ✅ EC2 security group allows SSH (port 22) from anywhere (0.0.0.0/0)
- ✅ EC2_HOST secret contains just the IP address (no `http://` or trailing slashes)
- ✅ EC2_SSH_KEY secret contains the entire .pem file content
- ✅ EC2_USERNAME is `ec2-user` (Amazon Linux) or `ubuntu` (Ubuntu)

**Fix security group:**
1. EC2 Console → Security Groups
2. Select your security group
3. Inbound rules → Edit
4. Add rule: SSH, TCP, 22, 0.0.0.0/0
5. Save rules

### Docker permission denied on EC2

```bash
# On EC2, add user to docker group
sudo usermod -aG docker ec2-user
exit
# Reconnect
```

### Workflow shows "Container not running"

**On EC2, check logs:**
```bash
cd ~/portfolio
docker-compose logs
docker ps -a
```

**Common issues:**
- Port 3000 already in use → Restart: `docker-compose restart`
- Build failed → Check: `docker-compose logs`

### Changes not appearing on website

**Check workflow completed:**
- GitHub → Actions → Should show green checkmark

**Force refresh browser:**
- Press `Ctrl + Shift + R` (Windows/Linux)
- Press `Cmd + Shift + R` (Mac)

**Check EC2:**
```bash
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
cd portfolio
git log -1  # Should show your latest commit
docker ps   # Should show running container
```

---

## Security Best Practices

### 1. Protect Your Secrets

- ❌ Never commit `.pem` files to git
- ❌ Never share your EC2_SSH_KEY
- ✅ Use GitHub Secrets for sensitive data
- ✅ Rotate SSH keys periodically

### 2. EC2 Security Group

For production, restrict SSH access:
- Development: SSH from "My IP"
- Production: SSH from GitHub Actions IPs only

### 3. HTTPS Setup (Recommended)

For production, enable HTTPS:
1. Get a domain name
2. Point it to your EC2 IP
3. Install Let's Encrypt SSL certificate
4. Update Docker setup to use nginx with SSL

---

## Updating Your Portfolio

### Making Changes

1. **Edit files locally**
   ```powershell
   cd "D:\Sample Project"
   # Make your changes
   ```

2. **Test locally**
   ```powershell
   cd client
   npm start
   ```

3. **Commit and push**
   ```powershell
   git add .
   git commit -m "Description of your changes"
   git push origin main
   ```

4. **Watch deployment**
   - Go to GitHub → Actions
   - Wait for green checkmark

5. **Verify live site**
   - Visit `http://YOUR_EC2_IP`
   - Your changes are now live!

### Common Updates

**Update resume:**
1. Replace `Gautham_Madhu_Resume (1).pdf` in the `public` folder
2. Commit and push

**Change colors/styling:**
1. Edit `client/src/App.css`
2. Commit and push

**Add new sections:**
1. Edit `client/src/App.js`
2. Commit and push

---

## Workflow Status Badge

Add this to your README.md to show deployment status:

```markdown
![Deploy to EC2](https://github.com/YOUR_USERNAME/gautham-portfolio/workflows/Deploy%20to%20EC2/badge.svg)
```

---

## Cost Tracking

### GitHub Actions Minutes

- **Free tier:** 2,000 minutes/month (public repos get unlimited)
- **Each deployment:** ~2-3 minutes
- **Monthly capacity:** 600+ deployments (more than enough!)

### AWS EC2

- **Free tier:** 750 hours/month (t2.micro)
- **After free tier:** ~$8-10/month

---

## Next Steps

### 1. Custom Domain (Optional)

1. Buy domain (GoDaddy, Namecheap, Route53)
2. Point A record to EC2 IP
3. Update GitHub secret for domain
4. Access via `https://yourdomain.com`

### 2. Enable HTTPS (Recommended)

1. Set up domain first
2. Install Certbot on EC2
3. Configure nginx reverse proxy
4. Auto-renew SSL certificates

### 3. Monitoring

Set up alerts for:
- Deployment failures (GitHub notifications)
- Website downtime (UptimeRobot, Pingdom)
- AWS costs (AWS Budget alerts)

---

## Summary

**One-time setup:**
1. ✅ Launch EC2 instance
2. ✅ Create GitHub repository
3. ✅ Add GitHub secrets
4. ✅ Initial manual deployment

**Every update (automatic):**
1. Make changes locally
2. Git commit and push
3. GitHub Actions deploys automatically
4. Your site updates in ~5 minutes

**Your deployment pipeline is now complete!** 🎉

Any push to `main` branch will automatically deploy to EC2.
