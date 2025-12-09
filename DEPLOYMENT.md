# Deployment Guide - CampusGuard SaaS

## 🚀 Deploy to Production

### Prerequisites
- Supabase account with project created
- GitHub account
- Domain name (optional)

---

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository
```bash
git init
git add .
git commit -m "Initial commit - CampusGuard SaaS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com and sign in with GitHub
2. Click **New Project**
3. Import your repository
4. Configure your project:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables
In Vercel project settings, add:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Deploy
Click **Deploy** and wait for deployment to complete.

### Step 5: Update Supabase Settings
1. Go to your Supabase project
2. Navigate to **Authentication → URL Configuration**
3. Add your Vercel domain to **Site URL**
4. Add your Vercel domain to **Redirect URLs**

---

## Option 2: Deploy to Netlify

### Step 1: Build Configuration
Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Deploy
1. Go to https://netlify.com and sign in
2. Click **Add new site → Import an existing project**
3. Connect to GitHub and select your repository
4. Netlify will detect Vite automatically

### Step 3: Environment Variables
In Netlify site settings → **Environment variables**, add:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Update Supabase
Add your Netlify domain to Supabase Auth settings.

---

## Option 3: Deploy to Your Own Server

### Step 1: Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Step 2: Server Configuration

#### Using Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/campusguard/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Using Apache
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/campusguard/dist

    <Directory /var/www/campusguard/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### Step 3: Upload Files
```bash
# Upload dist folder to server
scp -r dist/* user@yourserver:/var/www/campusguard/dist/
```

### Step 4: SSL Certificate (Recommended)
```bash
# Using Let's Encrypt
sudo certbot --nginx -d yourdomain.com
```

---

## 🔒 Production Checklist

### Security
- [ ] Enable email verification in Supabase Auth
- [ ] Configure custom SMTP for emails
- [ ] Set up rate limiting in Supabase
- [ ] Enable 2FA for admin accounts
- [ ] Review RLS policies

### Performance
- [ ] Enable caching headers
- [ ] Compress static assets
- [ ] Use CDN for assets (optional)
- [ ] Monitor database performance

### Monitoring
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure analytics (Google Analytics, Plausible)
- [ ] Set up uptime monitoring
- [ ] Enable Supabase logs

### Backup
- [ ] Enable automated Supabase backups
- [ ] Set up backup retention policy
- [ ] Test backup restoration

---

## 🌐 Custom Domain Setup

### Vercel
1. Go to project settings → **Domains**
2. Add your custom domain
3. Update DNS records as shown

### Netlify
1. Go to site settings → **Domain management**
2. Add custom domain
3. Configure DNS records

---

## 📊 Post-Deployment

### Test Your Application
1. Sign up with a new account
2. Verify email (if enabled)
3. Add a test device
4. Add sensor logs
5. Test all features
6. Test on mobile devices

### Monitor Performance
- Check Supabase dashboard for:
  - Database queries
  - API requests
  - Storage usage
  - Active users

---

## 🆘 Troubleshooting

### Issue: Auth Not Working
- Verify environment variables are set correctly
- Check Supabase Auth settings
- Ensure redirect URLs are configured

### Issue: Database Errors
- Check RLS policies are enabled
- Verify user_id is being set correctly
- Review Supabase logs

### Issue: Build Failures
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run build`
- Verify all dependencies are installed

---

## 📈 Scaling Your SaaS

### As Your User Base Grows:
1. **Database:**
   - Upgrade Supabase plan
   - Add database indexes
   - Implement connection pooling

2. **Frontend:**
   - Implement lazy loading
   - Add pagination for large datasets
   - Use virtual scrolling for lists

3. **Features:**
   - Add team/organization support
   - Implement webhooks for integrations
   - Add export functionality (CSV, PDF)
   - Create mobile apps

---

## 💰 Monetization (Optional)

### Pricing Tiers
- **Free:** 5 devices max
- **Pro:** 50 devices, priority support
- **Enterprise:** Unlimited devices, custom features

### Implementation
Use Supabase Functions + Stripe for payment processing.

---

## 📞 Support

For issues or questions:
- GitHub Issues: [Your repo issues page]
- Documentation: This README
- Supabase Docs: https://supabase.com/docs
