# EC2 Deployment Checklist

Quick reference for deploying to EC2.

## ☐ Step 1: AWS Console - Launch EC2

1. ☐ Go to https://console.aws.amazon.com/ec2
2. ☐ Click **"Launch Instance"**
3. ☐ Name: `gautham-portfolio`
4. ☐ AMI: **Amazon Linux 2023** or **Ubuntu 22.04**
5. ☐ Instance type: **t2.micro** (Free tier)
6. ☐ Create new key pair → Save `.pem` file (DON'T LOSE THIS!)
7. ☐ Security group rules:
   - ☐ SSH (22) - My IP
   - ☐ HTTP (80) - Anywhere (0.0.0.0/0)
   - ☐ HTTPS (443) - Anywhere (0.0.0.0/0)
8. ☐ Click **"Launch Instance"**
9. ☐ **Copy the Public IP address** → ___________________

## ☐ Step 2: Build Application (Local)

```powershell
cd "D:\Sample Project"
cd client
npm run build
cd ..
```

## ☐ Step 3: Set Key Permissions (Local - PowerShell)

```powershell
cd Downloads  # or wherever your .pem file is
icacls "gautham-portfolio-key.pem" /inheritance:r
icacls "gautham-portfolio-key.pem" /grant:r "$env:USERNAME`:R"
```

## ☐ Step 4: Upload Files (Local)

**Option A: SCP (Command Line)**
```powershell
# Replace YOUR_EC2_IP with actual IP
scp -i gautham-portfolio-key.pem -r "D:\Sample Project" ec2-user@YOUR_EC2_IP:~/portfolio
```

**Option B: WinSCP (GUI)**
- Download: https://winscp.net/
- Host: YOUR_EC2_IP
- Username: `ec2-user` (Amazon Linux) or `ubuntu` (Ubuntu)
- Private key: Browse to your .pem file
- Drag and drop "Sample Project" folder

## ☐ Step 5: Connect to EC2 (Local)

```powershell
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
```

## ☐ Step 6: Deploy (On EC2)

```bash
cd portfolio
chmod +x deploy.sh
./deploy.sh

# If prompted to logout after Docker install:
exit
# Then reconnect and run:
ssh -i gautham-portfolio-key.pem ec2-user@YOUR_EC2_IP
cd portfolio
docker-compose up -d --build
```

## ☐ Step 7: Verify

Open browser: `http://YOUR_EC2_IP`

---

## Quick Commands

**Check status:**
```bash
docker ps
```

**View logs:**
```bash
docker-compose logs -f
```

**Restart:**
```bash
docker-compose restart
```

**Stop:**
```bash
docker-compose down
```

---

## Your EC2 IP: ___________________

## Your Website: http://___________________
