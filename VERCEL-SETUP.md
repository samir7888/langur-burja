# Quick Vercel Setup - 3 Steps

## 1️⃣ Create Redis Database (2 min)

1. Go to: https://console.upstash.com/
2. Sign up (it's free)
3. Click **Create Database**
4. Name it: `langur-burja`
5. Region: **Asia Pacific (ap-south-1)** for Nepal/India users
6. Click Create

## 2️⃣ Copy Redis Credentials (1 min)

In your Upstash dashboard, find the **REST API** section and copy:

```
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

## 3️⃣ Deploy to Vercel (2 min)

### Using GitHub (Easiest):

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add these environment variables:
   ```
   UPSTASH_REDIS_REST_URL = (paste your URL)
   UPSTASH_REDIS_REST_TOKEN = (paste your token)
   NEXT_PUBLIC_SITE_URL = https://your-app.vercel.app
   ```
5. Click **Deploy**

### Using Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel

# Add environment variables:
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
vercel env add NEXT_PUBLIC_SITE_URL

# Deploy to production:
vercel --prod
```

## ✅ Done!

Your game is now live with persistent storage!

Test it:

1. Create a room
2. Close browser
3. Reopen and rejoin with room code
4. Game state is saved! 🎉

## 📊 Free Tier Limits

- **Upstash**: 10,000 requests/day (enough for 100+ games)
- **Vercel**: 100 GB bandwidth/month (plenty for traffic)
- **Cost**: $0 💰

## 🔧 Troubleshooting

**"Room not found" error?**

- Check Redis credentials in Vercel dashboard
- Verify environment variables are saved
- Redeploy: `vercel --prod`

**Still having issues?**

- Check Vercel logs: https://vercel.com/dashboard
- Check Upstash logs: https://console.upstash.com/

## 🚀 What's Working Now

✅ Game state persists across refreshes
✅ Rooms survive server restarts
✅ Players can rejoin anytime (24 hours)
✅ No data loss on Vercel serverless
✅ Automatic cleanup of old rooms
✅ Fast Redis caching
✅ SEO optimized for Google
✅ Mobile-friendly

## 📱 Share Your Game

After deployment, share this link:

```
https://your-app.vercel.app
```

Players on the same WiFi can play together!

---

Need help? Check `DEPLOYMENT.md` for detailed guide.
