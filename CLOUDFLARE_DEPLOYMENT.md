# Deploy to Cloudflare Pages

This guide walks you through deploying your portfolio to Cloudflare Pages with automated GitHub Actions deployment.

## Prerequisites

- GitHub account with this repository
- Cloudflare account (free tier works!)
- Git installed locally

---

## Option A: Quick Setup (Cloudflare Dashboard - No Secrets Needed)

### Step 1: Connect GitHub to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages** in the left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Authorize Cloudflare to access your GitHub repository
5. Select your repository: `gautham-portfolio`

### Step 2: Configure Build Settings

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Project name** | `gautham-portfolio` (or your preferred name) |
| **Production branch** | `main` |
| **Framework preset** | `Create React App` |
| **Build command** | `cd client && npm install && npm run build` |
| **Build output directory** | `client/build` |
| **Root directory** | `/` |

### Step 3: Deploy

1. Click **Save and Deploy**
2. Cloudflare will automatically build and deploy your site
3. You'll get a URL like: `https://gautham-portfolio.pages.dev`

### Step 4: Auto Deployments

Every push to `main` will automatically trigger a new deployment! 🚀

---

## Option B: Advanced Setup (GitHub Actions - Full Control)

Use this option if you want to control deployments via GitHub Actions workflow.

### Step 1: Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages** → **Create application** → **Pages**
3. Click **Direct Upload** (not Git)
4. Create project name: `gautham-portfolio`
5. Click **Create project** → You can skip the upload for now

### Step 2: Get Cloudflare Credentials

#### Get Account ID:
1. In Cloudflare Dashboard, click on **Workers & Pages**
2. Look at the URL or sidebar - your Account ID is visible
3. Or go to your profile → **Account ID** on the right side

#### Create API Token:
1. Go to **My Profile** → **API Tokens**
2. Click **Create Token**
3. Use **Edit Cloudflare Workers** template
4. **OR** create custom token with these permissions:
   - Account → Cloudflare Pages → Edit
5. Click **Continue to summary** → **Create Token**
6. **Copy the token** (you won't see it again!)

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `CLOUDFLARE_API_TOKEN` | Your API token from Step 2 | Cloudflare → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID | Cloudflare Dashboard URL or profile |

### Step 4: Update Workflow (Optional)

The workflow file `.github/workflows/cloudflare-pages.yml` is already created!

**Update the project name if needed:**
```yaml
projectName: gautham-portfolio  # Change this to match your Cloudflare Pages project
```

### Step 5: Deploy

1. Commit any changes (if you modified the workflow)
2. Push to `main` branch:
   ```bash
   git add .
   git commit -m "Add Cloudflare Pages deployment"
   git push origin main
   ```

3. GitHub Actions will automatically:
   - Install dependencies
   - Build your React app
   - Deploy to Cloudflare Pages

4. Check deployment status:
   - Go to **Actions** tab in GitHub
   - Watch the "Deploy to Cloudflare Pages" workflow

---

## Verify Deployment

### Check Your Site

Visit your Cloudflare Pages URL:
- **Default:** `https://gautham-portfolio.pages.dev`
- **Custom domain:** Configure in Cloudflare Pages settings

### Test the Resume Download

Click the **Download Resume** button - it should work even without the backend server!

---

## Custom Domain (Optional)

### Add Your Own Domain

1. Go to Cloudflare Pages → Your project
2. Click **Custom domains** → **Set up a custom domain**
3. Enter your domain (e.g., `gautham-portfolio.com`)
4. Follow DNS configuration instructions
5. Cloudflare provides free SSL automatically! 🔒

---

## Troubleshooting

### Build Fails in GitHub Actions

**Check the logs:**
```bash
# Go to GitHub → Actions → Failed workflow → View logs
```

**Common issues:**
- Missing `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` secrets
- Wrong project name in workflow file
- Build errors in React app

### Resume Download Not Working

**Make sure:**
- PDF exists in `client/public/Gautham_Madhu_Resume (1).pdf`
- Build includes the public folder
- No 404 error in browser console

### Deployment Succeeds but Site Shows Blank

**Check:**
- Build output directory is `client/build` (not just `build`)
- React app builds successfully locally: `cd client && npm run build`
- Check browser console for errors

---

## Disable EC2 Deployment (Optional)

If you want to deploy **only** to Cloudflare and stop EC2 deployments:

### Option 1: Disable EC2 Workflow
Rename the file:
```bash
mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
```

### Option 2: Keep Both
Keep both workflows active to deploy to both EC2 and Cloudflare simultaneously!

---

## Environment Comparison

| Feature | EC2 Deployment | Cloudflare Pages |
|---------|---------------|------------------|
| **Backend Support** | ✅ Yes (Node.js server) | ❌ No (static only) |
| **Cost** | 💰 ~$5-10/month | 🆓 Free tier generous |
| **Performance** | 🌍 Single region | 🚀 Global CDN |
| **SSL** | 🔧 Manual setup | 🔒 Automatic |
| **Scaling** | 📊 Manual | ♾️ Automatic |
| **Deployment** | ⏱️ ~2-3 min | ⚡ ~1 min |

---

## Next Steps

1. ✅ Choose deployment option (A or B)
2. ✅ Deploy your portfolio
3. ✅ Test the live site
4. 🎨 Optional: Set up custom domain
5. 📊 Optional: Monitor with Cloudflare Analytics

---

## Useful Links

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Marketplace](https://github.com/marketplace/actions/cloudflare-pages-github-action)
- [Your Cloudflare Dashboard](https://dash.cloudflare.com/)

---

**Need help?** Check the GitHub Actions logs or Cloudflare Pages deployment logs for detailed error messages.
