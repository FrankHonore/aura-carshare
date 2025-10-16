# Aura Car Sharing - Deployment Guide

This guide covers multiple deployment options for the Aura car-sharing platform.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Git repository (GitHub, GitLab, etc.)

## Environment Variables Required

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="optional-google-oauth-id"
GOOGLE_CLIENT_SECRET="optional-google-oauth-secret"
```

## Deployment Options

### 1. Vercel (Recommended)

**Quick Deploy:**
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

**Using Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 2. Netlify

**Quick Deploy:**
1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Connect your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `.next`
6. Add environment variables
7. Deploy!

### 3. Railway

**Quick Deploy:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### 4. Docker Deployment

**Local Docker:**
```bash
# Build and run with Docker Compose
docker-compose up --build
```

**Production Docker:**
```bash
# Build image
docker build -t aura-carshare .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_URL="your-domain" \
  -e NEXTAUTH_SECRET="your-secret" \
  aura-carshare
```

### 5. DigitalOcean App Platform

1. Create new app on DigitalOcean
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set run command: `npm start`
5. Add environment variables
6. Deploy!

### 6. Heroku

```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NEXTAUTH_SECRET="your-secret"
heroku config:set NEXTAUTH_URL="https://your-app.herokuapp.com"

# Deploy
git push heroku main
```

## Database Setup

### PostgreSQL on Vercel
Use Vercel Postgres or external providers:
- [Supabase](https://supabase.com)
- [PlanetScale](https://planetscale.com)
- [Railway](https://railway.app)
- [Neon](https://neon.tech)

### Database Migration
After deployment, run migrations:
```bash
npx prisma migrate deploy
npx prisma generate
```

## Post-Deployment Steps

1. **Verify Environment Variables**
   - Check all required variables are set
   - Test database connection

2. **Run Database Migrations**
   ```bash
   npx prisma migrate deploy
   ```

3. **Test Authentication**
   - Verify NextAuth is working
   - Test OAuth providers if configured

4. **Set Up Monitoring**
   - Configure error tracking (Sentry)
   - Set up uptime monitoring

## Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version (should be 18+)
- Verify all environment variables are set
- Check package.json dependencies

**Database Connection:**
- Verify DATABASE_URL format
- Check database is accessible from deployment platform
- Run `npx prisma db push` to sync schema

**Authentication Issues:**
- Verify NEXTAUTH_URL matches your domain
- Check NEXTAUTH_SECRET is set
- For OAuth, verify redirect URLs in provider settings

### Performance Optimization

1. **Enable Static Generation**
   - Most pages are already optimized for SSG
   - Car listings use ISR for better performance

2. **Image Optimization**
   - Configure image domains in next.config.js
   - Use Next.js Image component (already implemented)

3. **Database Optimization**
   - Add database indexes for frequently queried fields
   - Use connection pooling for high traffic

## Security Checklist

- [ ] Environment variables are secure
- [ ] Database credentials are not in code
- [ ] HTTPS is enabled
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] OAuth redirect URLs are correct
- [ ] Database access is restricted

## Monitoring & Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Vercel Analytics, Google Analytics
- **Uptime**: Uptime Robot, Pingdom
- **Performance**: Vercel Speed Insights

### Health Check Endpoint
The app includes a health check at `/api/health`:
```bash
curl https://your-domain.com/api/health
```

## Scaling Considerations

### Database Scaling
- Use read replicas for high traffic
- Implement connection pooling
- Consider database sharding for large datasets

### Application Scaling
- Use CDN for static assets
- Implement caching (Redis)
- Consider serverless functions for API routes

### Cost Optimization
- Use Vercel's edge functions
- Implement image optimization
- Monitor and optimize database queries

## Support

For deployment issues:
1. Check the platform-specific documentation
2. Review environment variables
3. Check application logs
4. Test locally with production environment variables