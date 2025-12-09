# ✅ Setup Checklist - CampusGuard SaaS

Use this checklist to ensure your SaaS application is properly configured and ready for use.

---

## 📋 Pre-Launch Checklist

### 1. ✅ Supabase Setup
- [ ] **Create Supabase Project**
  - Go to https://supabase.com
  - Create new project
  - Note project URL and anon key

- [ ] **Run Database Migration**
  ```sql
  -- Copy entire content from supabase/migrations/001_create_tables.sql
  -- Paste in Supabase SQL Editor
  -- Click "RUN"
  ```
  - [ ] Tables created successfully
  - [ ] RLS policies enabled
  - [ ] UNIQUE constraint working

- [ ] **Enable Authentication**
  - Navigate to: Authentication → Providers
  - [ ] Email provider enabled
  - [ ] Confirm emails disabled (or configure SMTP)
  - [ ] Auto-confirm email enabled (for testing)

- [ ] **Configure URL Settings**
  - Navigate to: Authentication → URL Configuration
  - [ ] Site URL set (http://localhost:5173 for development)
  - [ ] Redirect URLs configured

---

### 2. ✅ Local Development Setup

- [ ] **Install Dependencies**
  ```bash
  npm install
  ```

- [ ] **Configure Environment**
  - [ ] Copy `.env.example` to `.env`
  - [ ] Add `VITE_SUPABASE_URL`
  - [ ] Add `VITE_SUPABASE_ANON_KEY`

- [ ] **Verify Installation**
  ```bash
  npm run dev
  ```
  - [ ] No compilation errors
  - [ ] Application runs on http://localhost:5173

---

### 3. ✅ Feature Testing

#### Authentication
- [ ] **Sign Up**
  - [ ] Create new account
  - [ ] Email validation works
  - [ ] Redirects to dashboard

- [ ] **Sign In**
  - [ ] Login with credentials
  - [ ] Session persists on refresh
  - [ ] User email displays in navbar

- [ ] **Sign Out**
  - [ ] Logout button works
  - [ ] Redirects to login page
  - [ ] Session cleared

#### Device Management
- [ ] **Add Device**
  - [ ] All device types selectable
  - [ ] Duplicate name rejected
  - [ ] Device appears in dashboard
  - [ ] All fields required

- [ ] **View Devices**
  - [ ] Dashboard shows added devices
  - [ ] Status colors display correctly
  - [ ] Device info accurate

- [ ] **Delete Device**
  - [ ] Confirmation dialog appears
  - [ ] Device removed from database
  - [ ] Associated logs deleted

#### Sensor Logs
- [ ] **Add Log**
  - [ ] Device dropdown populates
  - [ ] Sensor labels match device type
  - [ ] Normal behavior guidelines show
  - [ ] Negative values rejected
  - [ ] Status updates automatically

- [ ] **Status Evaluation**
  - [ ] Green status: All values normal
  - [ ] Yellow status: 1-2 values abnormal
  - [ ] Red status: 3+ values abnormal

#### Maintenance
- [ ] **Mark as Maintained**
  - [ ] Button only shows for red devices
  - [ ] Status resets to NORMAL
  - [ ] Sensor readings cleared

---

### 4. ✅ Data Isolation Testing

- [ ] **Create Second Account**
  - [ ] Sign up with different email
  - [ ] Login successful

- [ ] **Verify Multi-Tenancy**
  - [ ] User A cannot see User B's devices
  - [ ] User B cannot see User A's devices
  - [ ] Each user's dashboard independent

---

### 5. ✅ UI/UX Verification

- [ ] **Design Elements**
  - [ ] Gradient backgrounds working
  - [ ] Bootstrap icons displaying
  - [ ] Animations smooth
  - [ ] Responsive on mobile

- [ ] **Navigation**
  - [ ] All navbar links functional
  - [ ] Active tab highlighting works
  - [ ] Logo returns to dashboard

- [ ] **Forms**
  - [ ] Input validation working
  - [ ] Error messages clear
  - [ ] Success notifications appear

---

### 6. ✅ Security Audit

- [ ] **RLS Policies**
  - [ ] Test in Supabase SQL Editor:
  ```sql
  -- Should only return current user's devices
  SELECT * FROM devices;
  ```
  - [ ] Only user's own data visible

- [ ] **Environment Variables**
  - [ ] `.env` in `.gitignore`
  - [ ] Keys not in source code
  - [ ] `.env.example` has placeholders only

- [ ] **Authentication**
  - [ ] Unauthenticated users redirected
  - [ ] Protected routes secure
  - [ ] Session management working

---

### 7. ✅ Production Readiness

- [ ] **Build Test**
  ```bash
  npm run build
  ```
  - [ ] No build errors
  - [ ] `dist/` folder created
  - [ ] Assets optimized

- [ ] **Documentation**
  - [ ] README.md complete
  - [ ] USER_GUIDE.md reviewed
  - [ ] DEPLOYMENT.md ready

- [ ] **Version Control**
  - [ ] Git repository initialized
  - [ ] All files committed
  - [ ] `.gitignore` configured

---

## 🚀 Deployment Checklist

### Choose Your Platform
- [ ] **Vercel** (Recommended)
  - [ ] Repository pushed to GitHub
  - [ ] Project imported to Vercel
  - [ ] Environment variables set
  - [ ] Build successful
  - [ ] Domain configured

- [ ] **Netlify**
  - [ ] `netlify.toml` created
  - [ ] Project deployed
  - [ ] Environment variables set
  - [ ] Redirects working

- [ ] **Custom Server**
  - [ ] Server configured
  - [ ] SSL certificate installed
  - [ ] Files uploaded
  - [ ] Web server restarted

---

### Post-Deployment

- [ ] **Update Supabase Auth Settings**
  - [ ] Add production URL to Site URL
  - [ ] Add production URL to Redirect URLs

- [ ] **Test Production Site**
  - [ ] Sign up new account
  - [ ] All features working
  - [ ] Mobile responsive
  - [ ] Performance acceptable

- [ ] **Monitoring Setup**
  - [ ] Error tracking configured
  - [ ] Analytics added
  - [ ] Uptime monitoring enabled

---

## 🎯 Recommended Settings

### Development
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Supabase Auth
- Auto-confirm email: **ON** (development)
- Email rate limiting: **OFF** (development)
- Minimum password length: **6** characters

### Production
- Auto-confirm email: **OFF**
- Enable email verification
- Configure custom SMTP
- Set up rate limiting

---

## 🐛 Common Issues

### Issue: "Cannot read properties of null"
**Solution:** Ensure user is authenticated before accessing data

### Issue: Duplicate key error
**Solution:** Check for existing device with same name

### Issue: RLS policy error
**Solution:** Verify user_id is being set correctly in all queries

### Issue: Auth redirect not working
**Solution:** Check Supabase URL configuration matches your domain

---

## 📊 Success Criteria

Your application is ready when:

✅ All checklist items completed
✅ No console errors
✅ Authentication flow smooth
✅ Data isolation verified
✅ Build succeeds without warnings
✅ Documentation up to date

---

## 📞 Next Steps

1. ✅ Complete this checklist
2. 📖 Review USER_GUIDE.md
3. 🚀 Follow DEPLOYMENT.md
4. 🎉 Launch your SaaS!

---

**Last Updated:** 2024
**Version:** 1.0.0

---

## 🔄 Quick Reset (Development Only)

If you need to start fresh:

```sql
-- In Supabase SQL Editor
DROP TABLE IF EXISTS sensor_logs CASCADE;
DROP TABLE IF EXISTS devices CASCADE;

-- Then re-run migration from 001_create_tables.sql
```

⚠️ **Warning:** This deletes ALL data!
