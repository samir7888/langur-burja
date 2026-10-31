# Deployment Guide - Langur Burja on Vercel

## Quick Setup (5 minutes)

### Step 1: Create Upstash Redis Database

1. Go to [Upstash Console](https://console.upstash.com/)
2. Sign up/Login (free tier available)
3. Click **Create Database**
4. Choose:
   - **Name**: langur-burja
   - **Type**: Regional (cheaper, faster)
   - **Region**: Choose closest to your users (e.g., Asia Pacific for Nepal)
5. Click **Create**

### Step 2: Get Redis Credentials

1. In your Upstash database dashboard, scroll down to **REST API** section
2. Copy these two values:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
cd langur-burja
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name? langur-burja (or your choice)
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add UPSTASH_REDIS_REST_URL
# Paste your Redis REST URL

vercel env add UPSTASH_REDIS_REST_TOKEN
# Paste your Redis Token

vercel env add NEXT_PUBLIC_SITE_URL
# Enter your domain (e.g., https://langur-burja.vercel.app)

# Deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com/)
2. Click **Add New Project**
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Configure:

   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:

   ```
   UPSTASH_REDIS_REST_URL = your_redis_url
   UPSTASH_REDIS_REST_TOKEN = your_redis_token
   NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
   ```

6. Click **Deploy**

### Step 4: Update SEO Configuration

After deployment, update these files with your actual domain:

1. **`.env.local`** (for local development):

   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-actual-domain.vercel.app
   ```

2. **Update Google Search Console** (see README.md)

## Features Enabled

✅ **Persistent Game State**: Rooms survive server restarts
✅ **24-hour Room Expiration**: Automatic cleanup
✅ **Serverless Compatible**: Works on Vercel/AWS Lambda
✅ **Fast Performance**: Redis caching
✅ **Free Tier**: Up to 10,000 commands/day on Upstash free plan

## Testing Persistence

1. Create a room and note the code
2. Add some players and place bets
3. Wait 5 minutes (serverless function goes cold)
4. Rejoin using the room code
5. Game state should be restored ✓

## Troubleshooting

### Redis not connecting?

- Check environment variables are set correctly in Vercel dashboard
- Verify Redis URL and Token are correct
- Check Upstash console for connection errors

### Room not found after refresh?

- Check browser console for errors
- Verify Redis is enabled (see server logs)
- Try creating a new room to test

### Game works locally but not in production?

- Ensure environment variables are added to Vercel
- Check Vercel deployment logs for errors
- Verify Redis is in the same region for better latency

## Cost Estimation

**Upstash Redis Free Tier:**

- 10,000 commands per day
- 256 MB storage
- Good for ~100-200 active games

**Vercel Free Tier:**

- 100 GB bandwidth/month
- Unlimited hobby projects
- Perfect for this use case

**Total Cost: $0** for moderate usage!

## Upgrade Paths

If you exceed free tier limits:

**Upstash Pro**: $10/month

- 1M commands/day
- 10 GB storage

**Vercel Pro**: $20/month

- 1 TB bandwidth
- Better performance

## Support

For issues:

1. Check Vercel deployment logs
2. Check Upstash Redis logs
3. Review browser console errors
4. Check server console output

## Local Development

```bash
# Install dependencies
npm install

# Add your Redis credentials to .env.local
# (copy from Upstash dashboard)

# Run development server
npm run dev

# Open http://localhost:3000
```

## Production Checklist

- [ ] Redis database created on Upstash
- [ ] Environment variables added to Vercel
- [ ] Domain configured (optional: custom domain)
- [ ] Google Search Console setup
- [ ] Social media images created
- [ ] Tested room creation and persistence
- [ ] Tested multiplayer functionality
- [ ] Tested on mobile devices
- [ ] Analytics added (optional)

## Next Steps

1. Set up custom domain (optional)
2. Add Google Analytics
3. Submit sitemap to Google
4. Share on social media
5. Get user feedback

Congratulations! Your Langur Burja game is now live! 🎲🎉
