# GitHub Deployment - Quick Start

Get automated deployment set up in 15 minutes!

## Prerequisites

- ☐ EC2 instance running (see EC2_CHECKLIST.md)
- ☐ GitHub account
- ☐ Git installed locally

---

## Step 1: Create GitHub Repository (2 min)

1. Go to https://github.com/new
2. Name: `gautham-portfolio`
3. Visibility: Public
4. **Don't** initialize with README
5. Click "Create repository"

---

## Step 2: Push Code to GitHub (3 min)

```powershell
cd "D:\Sample Project"

git add .
git commit -m "Initial commit: Portfolio with automated deployment"

# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/gautham-portfolio.git

git branch -M main
git push -u origin main
```

If prompted for password, use a Personal Access Token:
- GitHub.com → Settings → Developer settings → Personal access tokens → Generate new

---

## Step 3: Setup GitHub Secrets (5 min)

Go to: Your Repo → Settings → Secrets and variables → Actions → New repository secret

**Add 3 secrets:**

1. **EC2_HOST**
   - Value: Your EC2 IP (e.g., `54.123.45.67`)

2. **EC2_USERNAME**
   - Value: `ec2-user` (Amazon Linux) or `ubuntu` (Ubuntu)

3. **EC2_SSH_KEY**
   - Value: Your entire `.pem` file content
   - Copy with: `Get-Content gautham-portfolio-key.pem | Set-Clipboard`
   - Paste everything including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`

---

## Step 4: Initial EC2 Setup (5 min)

**Connect to EC2:**
```bash
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
```

**Install Docker:**
```bash
sudo yum update -y
sudo yum install docker git -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

exit
```

**Reconnect and deploy:**
```bash
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP

# Clone your repo (replace YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/gautham-portfolio.git portfolio
cd portfolio

# Deploy
docker-compose up -d --build
```

**Verify:** Visit `http://YOUR_EC2_IP`

---

## Step 5: Test Automated Deployment (2 min)

**Make a small change locally:**
```powershell
cd "D:\Sample Project"

# Edit any file (e.g., change a color in client/src/App.css)

git add .
git commit -m "Test automated deployment"
git push origin main
```

**Watch it deploy:**
1. Go to GitHub → Your repo → Actions tab
2. See "Deploy to EC2" running
3. Wait for green checkmark (2-5 minutes)
4. Visit `http://YOUR_EC2_IP` - changes are live!

---

## ✅ You're Done!

From now on, any push to `main` branch automatically deploys to EC2.

## Update Workflow

1. Make changes locally
2. `git add . && git commit -m "Your message" && git push`
3. Wait 2-5 minutes
4. Changes are live!

---

## Troubleshooting

**GitHub Actions can't connect to EC2:**
- Check EC2 security group allows SSH from 0.0.0.0/0
- Verify all 3 secrets are added correctly
- Check EC2_SSH_KEY includes full .pem file content

**Container not running:**
```bash
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
cd portfolio
docker-compose logs
```

**Need detailed help?**
- See `GITHUB_DEPLOYMENT.md` for complete guide
- Check GitHub Actions logs in Actions tab

---

## Your Info

- **GitHub Repo:** https://github.com/YOUR_USERNAME/gautham-portfolio
- **EC2 IP:** _________________
- **Live Site:** http://_________________

Bookmark this for reference!
