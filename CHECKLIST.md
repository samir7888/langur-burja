# 🚀 Deployment Checklist

Use this checklist to ensure everything is set up correctly.

## ✅ Pre-Deployment

- [ ] Code is working locally (`npm run dev`)
- [ ] All dependencies installed (`npm install`)
- [ ] `.env.local` has placeholder values
- [ ] `.env.example` exists for reference
- [ ] Git repository initialized
- [ ] Code pushed to GitHub/GitLab

## ✅ Upstash Redis Setup

- [ ] Created account at https://console.upstash.com/
- [ ] Created new Redis database
- [ ] Named database: `langur-burja`
- [ ] Selected region: Asia Pacific (for Nepal/India)
- [ ] Copied `UPSTASH_REDIS_REST_URL`
- [ ] Copied `UPSTASH_REDIS_REST_TOKEN`

## ✅ Vercel Deployment

- [ ] Created account at https://vercel.com/
- [ ] Connected GitHub repository
- [ ] Project imported successfully
- [ ] Added environment variable: `UPSTASH_REDIS_REST_URL`
- [ ] Added environment variable: `UPSTASH_REDIS_REST_TOKEN`
- [ ] Added environment variable: `NEXT_PUBLIC_SITE_URL`
- [ ] Deployment successful (no errors)
- [ ] Site is live and accessible

## ✅ Testing

- [ ] Can create a room
- [ ] Can join a room with code
- [ ] Can place bets
- [ ] Dice roll works
- [ ] Win/lose calculation correct
- [ ] Sound effects work
- [ ] Mobile responsive
- [ ] Refresh keeps session (localStorage)
- [ ] Room persists after server restart (Redis)

## ✅ SEO Setup

- [ ] Updated `NEXT_PUBLIC_SITE_URL` with actual domain
- [ ] Created Google Search Console account
- [ ] Added site to Search Console
- [ ] Got verification code
- [ ] Added verification code to `app/layout.js`
- [ ] Submitted sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Created social media images:
  - [ ] `og-image.png` (1200x630)
  - [ ] `favicon.ico` (32x32)
  - [ ] `apple-touch-icon.png` (180x180)
  - [ ] `icon-192.png` (192x192)
  - [ ] `icon-512.png` (512x512)

## ✅ Performance Check

- [ ] Vercel deployment logs show no errors
- [ ] Redis connection successful (check server logs)
- [ ] Page loads in < 3 seconds
- [ ] Mobile performance good
- [ ] No console errors in browser

## ✅ Optional Enhancements

- [ ] Custom domain configured
- [ ] Google Analytics added
- [ ] Social media accounts created
- [ ] Shared on Facebook/Twitter
- [ ] Posted in Nepali gaming groups
- [ ] Asked friends to test
- [ ] Got user feedback

## 🐛 Common Issues

### Issue: "Room not found" after refresh

**Solution**: Check Redis environment variables in Vercel

### Issue: Redis connection error

**Solution**: Verify `UPSTASH_REDIS_REST_URL` and `TOKEN` are correct

### Issue: Game works locally but not in production

**Solution**: Ensure all env vars are added to Vercel (not just `.env.local`)

### Issue: Slow performance

**Solution**: Check Redis region matches your user location

## 📊 Monitor

After deployment, monitor these:

- [ ] Vercel Analytics (traffic, performance)
- [ ] Upstash Dashboard (requests, latency)
- [ ] Google Search Console (impressions, clicks)
- [ ] User feedback and bug reports

## 🎉 Success Criteria

Your deployment is successful when:

✅ Users can create and join rooms
✅ Game state persists across refreshes
✅ No errors in Vercel logs
✅ Redis shows active connections
✅ Site is searchable on Google (after indexing)
✅ Mobile users can play smoothly

---

**Need help?** Check:

- [VERCEL-SETUP.md](VERCEL-SETUP.md) - Quick setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed guide
- Vercel logs: https://vercel.com/dashboard
- Upstash logs: https://console.upstash.com/
