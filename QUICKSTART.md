# ⚡ Quick Start Guide - CampusGuard SaaS

Get up and running in 5 minutes!

---

## 🚀 Step 1: Supabase Setup (2 minutes)

1. **Create Project**
   - Visit https://supabase.com/dashboard
   - Click "New Project"
   - Choose org, name: "campusguard", password, region
   - Wait for project creation

2. **Get Credentials**
   - Go to Settings → API
   - Copy **Project URL**
   - Copy **anon public key**

3. **Run Migration**
   - Go to SQL Editor
   - Click "New Query"
   - Copy ALL content from `supabase/migrations/001_create_tables.sql`
   - Paste and click **RUN**
   - You should see: "Success. No rows returned"

4. **Enable Auth**
   - Go to Authentication → Providers
   - Ensure **Email** is enabled
   - Go to Authentication → Settings
   - Enable "Confirm email" = **OFF** (for testing)

---

## 💻 Step 2: Local Setup (2 minutes)

1. **Install Dependencies**
   ```powershell
   npm install
   ```

2. **Configure Environment**
   ```powershell
   # Copy the example file
   Copy-Item .env.example .env

   # Edit .env and add your Supabase credentials:
   # VITE_SUPABASE_URL=https://xxxxx.supabase.co
   # VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. **Start Development Server**
   ```powershell
   npm run dev
   ```

   Application opens at: http://localhost:5173

---

## ✅ Step 3: Test It (1 minute)

1. **Create Account**
   - Click "Sign Up" tab
   - Email: `test@example.com`
   - Password: `test123`
   - Click "Sign Up"

2. **Add a Device**
   - Click "Add Device"
   - Name: "Lab Computer 01"
   - Type: "Computer"
   - Location: "Computer Lab"
   - Date: Today
   - Click "Add Device"

3. **Add Sensor Log**
   - Click "Add Log"
   - Select "Lab Computer 01"
   - Temperature: 65
   - CPU Usage: 45
   - Memory Usage: 60
   - Disk Usage: 70
   - Click "Add Log"

4. **Check Dashboard**
   - Click "Dashboard"
   - Device should show **🟢 NORMAL** status

---

## 🎉 You're Done!

Your SaaS application is running locally!

---

## 📚 What's Next?

### Explore Features
- ✅ Add different device types (Fan, AC, Printer)
- ✅ Test abnormal sensor values for yellow/red status
- ✅ Try "Mark as Maintained" on red devices
- ✅ Test delete functionality

### Customize
- Edit colors in CSS files
- Modify sensor thresholds in `src/utils/prediction.ts`
- Add your college logo in navbar

### Deploy to Production
- Follow `DEPLOYMENT.md` for Vercel/Netlify
- Add custom domain
- Enable email verification

### Learn More
- Read `USER_GUIDE.md` for feature details
- Check `README.md` for technical documentation
- Review `SETUP_CHECKLIST.md` before production

---

## 🐛 Troubleshooting Quick Fixes

### "Supabase client not initialized"
```powershell
# Check .env file has correct values
Get-Content .env
```

### "Table does not exist"
- Re-run migration SQL in Supabase SQL Editor

### Port 5173 already in use
```powershell
# Kill the process and restart
npm run dev
```

### TypeScript errors
```powershell
# Reinstall dependencies
Remove-Item -Recurse node_modules
Remove-Item package-lock.json
npm install
```

---

## 🎯 Quick Commands Reference

```powershell
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

---

## 📊 Default Test Data Ideas

### Computer (Green Status)
- Temperature: 45-65°C
- CPU: 30-70%
- Memory: 40-80%
- Disk: 50-85%

### Computer (Red Status)
- Temperature: 85°C
- CPU: 95%
- Memory: 98%
- Disk: 95%

### Printer (Green Status)
- Temperature: 40°C
- Paper Jams: 1
- Toner: 60%
- Errors: 2

### Fan (Yellow Status)
- Temperature: 55°C
- Vibration: 40Hz
- Noise: 65dB
- Speed: 1000RPM

---

## 🔗 Important Links

- **Local App:** http://localhost:5173
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Bootstrap Icons:** https://icons.getbootstrap.com

---

## ✨ Tips for Success

1. **Keep Supabase Tab Open** - Easy access to database/logs
2. **Use Browser DevTools** - Check console for errors
3. **Test with Multiple Accounts** - Verify data isolation
4. **Save Your .env File** - Keep credentials backed up
5. **Read Error Messages** - They usually tell you the fix

---

## 💡 Pro Tips

- Use **Ctrl+Shift+I** to open browser DevTools
- Check **Network** tab for API request issues
- Use **Console** tab for JavaScript errors
- Supabase dashboard shows real-time database changes
- Test on mobile viewport using DevTools device mode

---

## 🎓 Understanding the Flow

```
User Signs Up
    ↓
Supabase Creates auth.users entry
    ↓
User Adds Device
    ↓
Device stored with user_id (RLS ensures privacy)
    ↓
User Adds Sensor Log
    ↓
Prediction algorithm evaluates readings
    ↓
Status updated (NORMAL/NEEDS_ATTENTION/MAINTENANCE_REQUIRED)
    ↓
Dashboard shows color-coded status
```

---

**Ready to Build Something Amazing? Let's Go! 🚀**

Questions? Check the full documentation in README.md or USER_GUIDE.md!
