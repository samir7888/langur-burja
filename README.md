# Langur Burja Online - लङ्गुर बुर्जा

Play the traditional Nepali dice game Langur Burja online with friends!

## SEO Setup Instructions

### 1. Update Your Domain

Edit `.env.local` and replace `https://yoursite.com` with your actual domain:

```
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
```

### 2. Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain)
3. Copy the verification meta tag code
4. Update `app/layout.js` line with verification code:
   ```javascript
   verification: {
     google: 'paste-your-code-here',
   }
   ```

### 3. Submit Sitemap

After deploying:

1. Go to Google Search Console
2. Navigate to Sitemaps section
3. Submit: `https://your-domain.com/sitemap.xml`

### 4. Create Social Media Images

Create these images for better social sharing:

- `/public/og-image.png` - 1200x630px (Open Graph)
- `/public/favicon.ico` - 32x32px or 16x16px
- `/public/apple-touch-icon.png` - 180x180px
- `/public/icon-192.png` - 192x192px
- `/public/icon-512.png` - 512x512px

### 5. Local SEO for Nepal

- Create Google My Business listing (if applicable)
- Get backlinks from Nepali websites and forums
- Share on Nepali social media groups
- Encourage user reviews and ratings

### 6. Keywords Optimized For:

- Primary: langur burja, लङ्गुर बुर्जा, nepali game
- Secondary: dashain game, tihar game, jhanda burja, crown and anchor nepal
- Long-tail: langur burja online free, how to play langur burja, langur burja multiplayer

### 7. Performance Tips

- Enable compression on your server
- Use CDN for faster loading in South Asia
- Monitor Core Web Vitals in Google Search Console

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
npm start
```

## Game Features

- Free multiplayer online game
- Real-time dice animation
- Room-based gameplay
- Persistent game state
- Mobile-friendly responsive design
