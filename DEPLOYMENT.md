# Deployment Guide

This guide covers multiple deployment options for your Next.js portfolio.

## Prerequisites

Before deploying, ensure you have:
- ✅ Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- ✅ An OpenRouter API key ([Get one here](https://openrouter.ai/keys))
- ✅ Node.js 18+ (for local testing)

## Option 1: Vercel (Recommended) ⚡

Vercel is the creators of Next.js and offers the best integration.

### Steps:

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your Git provider
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   In the project settings, add:
   - `OPENROUTER_API_KEY` (Required) - Your OpenRouter API key
   - `OPENROUTER_MODEL` (Optional) - Default: `openai/gpt-4o-mini`
   - `OR_SITE_URL` (Optional) - Your site URL for attribution
   - `OR_APP_NAME` (Optional) - App name for attribution

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at `your-project.vercel.app`

### Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

---

## Option 2: Netlify

### Steps:

1. **Push to Git** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - **OR** use Netlify's Next.js plugin (auto-detects)

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add the same variables as Vercel:
     - `OPENROUTER_API_KEY`
     - `OPENROUTER_MODEL` (optional)
     - `OR_SITE_URL` (optional)
     - `OR_APP_NAME` (optional)

5. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `your-project.netlify.app`

---

## Option 3: Railway

### Steps:

1. **Push to Git**

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure**
   - Railway auto-detects Next.js
   - Add environment variables in the Variables tab:
     - `OPENROUTER_API_KEY`
     - `OPENROUTER_MODEL` (optional)
     - `OR_SITE_URL` (optional)
     - `OR_APP_NAME` (optional)

4. **Deploy**
   - Railway automatically deploys
   - Your site will be live at `your-project.up.railway.app`

---

## Option 4: Render

### Steps:

1. **Push to Git**

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Sign up/Login
   - Click "New" → "Web Service"
   - Connect your Git repository

3. **Build Settings**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `Node`

4. **Environment Variables**
   - Add in the Environment section:
     - `OPENROUTER_API_KEY`
     - `OPENROUTER_MODEL` (optional)
     - `OR_SITE_URL` (optional)
     - `OR_APP_NAME` (optional)

5. **Deploy**
   - Click "Create Web Service"
   - Your site will be live at `your-project.onrender.com`

---

## Option 5: Self-Hosted (VPS/Docker)

### Using Docker:

1. **Create `Dockerfile`**:
   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci

   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Update `next.config.mjs`** for standalone output:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'standalone',
   };
   
   export default nextConfig;
   ```

3. **Build and run**:
   ```bash
   docker build -t portfolio .
   docker run -p 3000:3000 -e OPENROUTER_API_KEY=your-key portfolio
   ```

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `OPENROUTER_API_KEY` | ✅ Yes | Your OpenRouter API key | `sk-or-v1-...` |
| `OPENROUTER_MODEL` | ❌ No | Model to use (default: `openai/gpt-4o-mini`) | `openai/gpt-4o` |
| `OR_SITE_URL` | ❌ No | Your site URL for OpenRouter attribution | `https://yourportfolio.com` |
| `OR_APP_NAME` | ❌ No | App name for OpenRouter attribution | `Arjun's Portfolio` |

---

## Pre-Deployment Checklist

- [ ] Code is pushed to Git repository
- [ ] All environment variables are ready
- [ ] Tested locally with `npm run build` and `npm start`
- [ ] No console errors in development
- [ ] Resume file exists in `public/` folder
- [ ] All links and social media URLs are correct
- [ ] Contact form (if any) is working

---

## Post-Deployment

1. **Test your live site**:
   - Check all pages load correctly
   - Test the AI chat feature
   - Verify responsive design on mobile
   - Check all external links

2. **Set up custom domain** (if desired):
   - Follow your platform's domain setup guide
   - Update `OR_SITE_URL` environment variable

3. **Monitor**:
   - Check deployment logs for errors
   - Monitor API usage on OpenRouter dashboard

---

## Troubleshooting

### Build Fails
- Check Node.js version (needs 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Chat Feature Not Working
- Verify `OPENROUTER_API_KEY` is set correctly
- Check API key has sufficient credits
- Review browser console for errors
- Check server logs in deployment platform

### Environment Variables Not Working
- Ensure variables are set in production environment (not just local)
- Restart/redeploy after adding variables
- Check variable names match exactly (case-sensitive)

---

## Quick Deploy Commands

### Vercel CLI
```bash
npm i -g vercel
vercel
```

### Netlify CLI
```bash
npm i -g netlify-cli
netlify deploy --prod
```

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **OpenRouter Docs**: https://openrouter.ai/docs
