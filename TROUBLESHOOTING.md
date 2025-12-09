# 🔧 Troubleshooting Guide

Common issues and their solutions for CampusGuard SaaS.

---

## 🚨 Installation Issues

### Issue: `npm install` fails
**Error:** `ERESOLVE unable to resolve dependency tree`

**Solution:**
```powershell
# Clear cache and reinstall
Remove-Item -Recurse node_modules
Remove-Item package-lock.json
npm cache clean --force
npm install
```

---

### Issue: TypeScript errors after install
**Error:** `Cannot find module 'vite/client'`

**Solution:**
The `src/vite-env.d.ts` file should exist with:
```typescript
/// <reference types="vite/client" />
```

If missing, create it or run:
```powershell
npm install --save-dev @types/node
```

---

## 🔐 Authentication Issues

### Issue: "Invalid API key" error
**Error:** `Invalid API key provided`

**Solution:**
1. Check `.env` file exists
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
3. Get values from: Supabase Dashboard → Settings → API
4. Restart dev server after editing `.env`:
```powershell
# Stop server (Ctrl+C), then:
npm run dev
```

---

### Issue: Can't sign up or login
**Error:** `Sign up failed` or `Invalid credentials`

**Solutions:**

1. **Check Email Provider is Enabled:**
   - Supabase Dashboard → Authentication → Providers
   - Ensure "Email" is enabled

2. **Check Auto-confirm Settings:**
   - Supabase Dashboard → Authentication → Settings
   - For testing: Enable "Confirm email" = OFF

3. **Check Network Tab:**
   - Open browser DevTools (F12)
   - Check Network tab for failed requests
   - Look for 400/401/403 errors

4. **Verify Database Migration:**
```sql
-- Run in Supabase SQL Editor
SELECT * FROM auth.users;
-- Should return table (even if empty)
```

---

### Issue: User logged out on page refresh
**Error:** Session doesn't persist

**Solution:**
Check `AuthContext.tsx` has:
```typescript
useEffect(() => {
  supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
    setLoading(false);
  });
}, []);
```

Also check browser cookies are enabled.

---

## 💾 Database Issues

### Issue: "relation does not exist"
**Error:** `relation "public.devices" does not exist`

**Solution:**
Run the migration SQL:
1. Copy all content from `supabase/migrations/001_create_tables.sql`
2. Supabase Dashboard → SQL Editor → New Query
3. Paste and click **RUN**
4. Should see: "Success. No rows returned"

---

### Issue: "permission denied for table devices"
**Error:** RLS policy blocking access

**Solution:**
1. Verify you're logged in
2. Check RLS policies exist:
```sql
-- Run in Supabase SQL Editor
SELECT * FROM pg_policies WHERE tablename = 'devices';
-- Should return 4 policies (SELECT, INSERT, UPDATE, DELETE)
```

3. If missing, re-run the migration SQL

4. Test policy:
```sql
-- Should work (returns your devices)
SELECT * FROM devices;

-- Should fail (can't see other users' data)
SELECT * FROM devices WHERE user_id != auth.uid();
```

---

### Issue: Can't add devices
**Error:** `duplicate key value violates unique constraint`

**Solutions:**

1. **Check for Duplicate Name:**
   - Device names must be unique per user
   - Try a different name

2. **Case-Insensitive Check:**
   - "Computer 01" and "COMPUTER 01" are different in DB
   - App checks for duplicates (case-insensitive)

3. **Verify Constraint:**
```sql
-- Check constraint exists
SELECT * FROM information_schema.table_constraints 
WHERE table_name = 'devices' AND constraint_type = 'UNIQUE';
-- Should show: devices_user_id_device_name_key
```

---

### Issue: Deleted device still appears
**Error:** Device not removed from dashboard

**Solutions:**

1. **Refresh the Page:**
   - Press F5 or Ctrl+R

2. **Check Cascade Delete:**
```sql
-- Verify foreign key has CASCADE
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    rc.delete_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
    ON tc.constraint_name = rc.constraint_name
WHERE tc.table_name = 'devices' AND tc.constraint_type = 'FOREIGN KEY';
-- delete_rule should be 'CASCADE'
```

3. **Manual Delete:**
```sql
DELETE FROM sensor_logs WHERE device_id = 'device-uuid-here';
DELETE FROM devices WHERE id = 'device-uuid-here';
```

---

## 📊 Sensor Log Issues

### Issue: Can't add sensor logs
**Error:** `Sensor values must be non-negative`

**Solution:**
All sensor values must be ≥ 0:
- Check all 4 fields have values
- Verify no negative numbers
- Decimals are allowed (e.g., 45.5)

---

### Issue: Status not updating
**Error:** Device stays green despite abnormal values

**Solutions:**

1. **Check Prediction Logic:**
   - Status updates when you add a new log
   - Refresh dashboard after adding log

2. **Verify Thresholds:**
   Open `src/utils/prediction.ts` and check thresholds match your expectations

3. **Test with Extreme Values:**
   - Computer temp: 150°C (should be red)
   - Printer toner: 5% (should trigger yellow/red)

4. **Check Console for Errors:**
   - F12 → Console tab
   - Look for JavaScript errors

---

### Issue: Wrong sensor labels
**Error:** Seeing "Sensor 1, Sensor 2" instead of "Temperature, CPU Usage"

**Solution:**
The `getSensorLabels()` function in `AddLog.tsx` should return device-specific labels. Verify:
```typescript
const getSensorLabels = (deviceType: DeviceType) => {
  switch (deviceType) {
    case 'pc':
      return ['Temperature', 'CPU Usage', 'Memory Usage', 'Disk Usage'];
    // ... other cases
  }
};
```

---

## 🎨 UI/UX Issues

### Issue: Bootstrap Icons not showing
**Error:** Icons appear as blank boxes or text

**Solutions:**

1. **Verify Installation:**
```powershell
npm list bootstrap-icons
# Should show: bootstrap-icons@1.13.1
```

2. **Check Import:**
In `src/main.tsx`:
```typescript
import 'bootstrap-icons/font/bootstrap-icons.css';
```

3. **Reinstall Package:**
```powershell
npm uninstall bootstrap-icons
npm install bootstrap-icons
```

4. **Check Network Tab:**
   - DevTools → Network
   - Look for failed requests to `.woff` files

---

### Issue: Gradients not showing
**Error:** Background is solid color

**Solution:**
Check `src/styles/Auth.css` and `src/App.css` have:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

If issue persists, check browser compatibility or try:
```css
background: rgb(102, 126, 234);
background: -webkit-linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

### Issue: Responsive layout broken
**Error:** Mobile view doesn't work

**Solution:**
Check `<meta>` tag in `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Add mobile-specific CSS:
```css
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }
}
```

---

## 🚀 Build & Deployment Issues

### Issue: Build fails
**Error:** `Build failed with X errors`

**Solutions:**

1. **Check TypeScript Errors:**
```powershell
npm run build
# Read error messages carefully
```

2. **Common TypeScript Errors:**
   - Missing return types
   - Unused variables
   - Type mismatches

3. **Fix and Rebuild:**
```powershell
# After fixing errors:
npm run build
```

---

### Issue: Environment variables not working in production
**Error:** `undefined` for `VITE_SUPABASE_URL`

**Solutions:**

1. **Vercel:**
   - Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Redeploy

2. **Netlify:**
   - Site Settings → Environment Variables
   - Add variables
   - Trigger new deploy

3. **Custom Server:**
   - Ensure `.env` file is on server
   - Or set environment variables at system level

---

### Issue: 404 on page refresh (production)
**Error:** Refreshing page gives 404 error

**Solutions:**

1. **Vercel:**
   - Automatically handles this with `vercel.json`

2. **Netlify:**
   - Add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

3. **Apache:**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

4. **Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## 🔍 Debugging Techniques

### Check Console Errors
```powershell
# Open browser DevTools
Press F12
# Go to Console tab
# Look for red error messages
```

### Check Network Requests
```powershell
# DevTools → Network tab
# Reload page
# Look for failed requests (red)
# Click on request to see details
```

### Check Supabase Logs
```powershell
# Supabase Dashboard → Logs
# Select API or Auth logs
# Look for errors around your action time
```

### Check Database Directly
```sql
-- Verify data exists
SELECT * FROM devices;
SELECT * FROM sensor_logs;

-- Check RLS policies
SELECT * FROM pg_policies;

-- Check constraints
SELECT * FROM information_schema.table_constraints 
WHERE table_name IN ('devices', 'sensor_logs');
```

---

## 🆘 Still Stuck?

### 1. Check Documentation
- README.md - Overview
- QUICKSTART.md - Setup
- USER_GUIDE.md - Features
- SETUP_CHECKLIST.md - Verification

### 2. Common Checklist
- [ ] Node.js installed (v18+)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Supabase project created
- [ ] Migration SQL run
- [ ] Email auth enabled
- [ ] Dev server running

### 3. Start Fresh
```powershell
# Nuclear option - complete reset
Remove-Item -Recurse node_modules
Remove-Item package-lock.json
Remove-Item .env
Copy-Item .env.example .env
# Edit .env with your credentials
npm install
npm run dev
```

### 4. Check Versions
```powershell
node --version    # Should be v18 or higher
npm --version     # Should be 9 or higher
```

---

## 📊 Error Code Reference

### Supabase Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request payload |
| 401 | Unauthorized | Check auth token |
| 403 | Forbidden | Check RLS policies |
| 404 | Not Found | Check table/column names |
| 409 | Conflict | Duplicate unique key |
| 500 | Server Error | Check Supabase status |

### HTTP Status Codes

| Code | Meaning | Common Cause |
|------|---------|--------------|
| 200 | Success | All good! |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Not logged in |
| 404 | Not Found | Wrong URL |
| 500 | Server Error | Backend issue |

---

## 🎯 Prevention Tips

### Before Adding Features
- ✅ Test in development first
- ✅ Commit working code to git
- ✅ Read TypeScript errors carefully
- ✅ Check console for warnings

### During Development
- ✅ Keep DevTools open
- ✅ Test after each change
- ✅ Use meaningful commit messages
- ✅ Don't commit `.env` file

### Before Deployment
- ✅ Run `npm run build` locally
- ✅ Test production build with `npm run preview`
- ✅ Verify environment variables
- ✅ Complete SETUP_CHECKLIST.md

---

**Need More Help?**
- 📖 Read the documentation
- 🔍 Check browser console
- 📊 Review Supabase logs
- 🧪 Test with minimal example
- 🔄 Try the nuclear reset option

---

**Last Updated:** 2024
**Version:** 1.0.0
