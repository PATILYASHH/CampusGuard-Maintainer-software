# 🎓 CampusGuard Maintenance System

A complete **SaaS Predictive Maintenance System** for college electronic devices (fans, ACs, PCs, printers) built with React, TypeScript, and Supabase.

## 📚 Documentation

> **New?** Start with [QUICKSTART.md](QUICKSTART.md) for 5-minute setup, or see [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for complete navigation.

- **[⚡ Quick Start Guide](QUICKSTART.md)** - Get running in 5 minutes!
- **[📘 User Guide](USER_GUIDE.md)** - Complete feature documentation
- **[🚀 Deployment Guide](DEPLOYMENT.md)** - Deploy to production
- **[✅ Setup Checklist](SETUP_CHECKLIST.md)** - Pre-launch verification
- **[🔧 Supabase Setup](supabase/README.md)** - Database configuration
- **[🔍 Troubleshooting](TROUBLESHOOTING.md)** - Fix common issues
- **[📋 Changelog](CHANGELOG.md)** - Version history
- **[🎉 Project Summary](PROJECT_COMPLETE.md)** - What was delivered
- **[📚 Docs Index](DOCUMENTATION_INDEX.md)** - Navigation guide

## 🌟 Features Highlights

- ✅ **Multi-tenant SaaS** with user authentication
- ✅ **Row Level Security (RLS)** for data isolation
- ✅ **Predictive maintenance** with device-specific algorithms
- ✅ **Real-time status monitoring** (Normal/Attention/Maintenance)
- ✅ **Bootstrap Icons** for modern UI
- ✅ **Gradient design** with smooth animations
- ✅ **Device-specific sensor labels** and validation
- ✅ **Duplicate prevention** and negative value blocking
- ✅ **Mark as Maintained** functionality

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase Database

1. Go to [Supabase](https://supabase.com) and create a project
2. Open SQL Editor in your Supabase dashboard
3. Copy and run the SQL from `supabase/migrations/001_create_tables.sql`

### 3. Enable Email Authentication

1. Go to **Authentication → Providers** in Supabase Dashboard
2. Enable **Email** provider
3. Configure email templates (optional)

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from: **Supabase Dashboard → Project Settings → API**

### 5. Run the Application
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Sign Up & Login

1. Create a new account with your email and password
2. Check your email for verification (if enabled)
3. Login to access the dashboard

## 📋 Features

### 🔐 Authentication & Security
- User registration with email/password
- Secure login system
- Row Level Security (RLS) - users only see their own devices
- Session management
- Logout functionality

### 1. Dashboard
- View all your devices and their current status
- Color-coded status indicators:
  - 🟢 NORMAL (Green)
  - 🟡 WARNING (Yellow)
  - 🔴 MAINTENANCE_REQUIRED (Red)
- Summary cards showing device counts by status
- Mark devices as maintained
- Delete devices with confirmation

### 2. Add Device
- Register new devices with threshold values
- Duplicate device name prevention
- Supported device types: Fan, AC, PC, Printer
- Set maximum thresholds for temperature, vibration, power, and usage
- No negative values allowed

### 3. Add Sensor Log
- Record sensor readings for devices
- Device-specific sensor labels
- Automatic status evaluation based on sensor values
- Real-time status updates
- No negative values allowed

## 🔧 Device Prediction Rules

**Fan:**
- Maintenance required if: temp > 70°C OR vibration > 6 OR power > 500W

**AC:**
- Maintenance required if: temp > 22°C OR humidity > 85% OR power > 800W

**PC:**
- Maintenance required if: temp > 95°C
- Warning if: temp > 85°C OR usage > 90%

**Printer:**
- Maintenance required if: paper < 20 sheets OR jam count > 10

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** Bootstrap Icons
- **Styling:** Custom CSS with modern design
- **Security:** Row Level Security (RLS)

## 📁 Project Structure

```
src/
├── components/
│   ├── AddDevice.tsx      # Add new device form
│   ├── AddLog.tsx         # Add sensor log form
│   └── Dashboard.tsx      # Device status dashboard
├── styles/
## 🗄️ Database Schema

### devices table
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `device_type` (text): fan | ac | pc | printer
- `device_name` (text)
- `location` (text)
- `max_temp`, `max_vibration`, `max_power`, `max_usage` (integer)
- `status` (text): NORMAL | WARNING | MAINTENANCE_REQUIRED
- `created_at` (timestamp)
- Unique constraint: (user_id, device_name) # Main app with navigation
└── main.tsx               # Entry point
```

## 🗄️ Database Schema

### devices table
- `id` (uuid)
- `device_type` (text): fan | ac | pc | printer
- `device_name` (text)
- `location` (text)
- `max_temp`, `max_vibration`, `max_power`, `max_usage` (integer)
- `status` (text): NORMAL | WARNING | MAINTENANCE_REQUIRED
- `created_at` (timestamp)

### sensor_logs table
- `id` (uuid)
- `device_id` (uuid, foreign key)
- `sensor_1`, `sensor_2`, `sensor_3`, `sensor_4` (numeric)
- `status` (text)
- `created_at` (timestamp)

## 📁 Project Structure

```
CampusGuard-Maintainer-software/
├── src/
│   ├── components/           # React components
│   │   ├── AddDevice.tsx    # Device registration form
│   │   ├── AddLog.tsx       # Sensor data entry
│   │   ├── Dashboard.tsx    # Device list with status
│   │   └── Auth.tsx         # Login/signup component
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication state
│   ├── lib/                 # Supabase client
│   │   └── supabase.ts      # Supabase initialization
│   ├── types/               # TypeScript types
│   │   └── database.types.ts # DB interfaces
│   ├── utils/               # Utilities
│   │   └── prediction.ts    # Prediction algorithms
│   ├── styles/              # CSS files
│   │   ├── App.css          # Main app styles
│   │   └── Auth.css         # Auth page styles
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── supabase/
│   ├── migrations/          # SQL migrations
│   │   └── 001_create_tables.sql
│   └── README.md            # Supabase setup guide
├── QUICKSTART.md            # 5-minute setup guide
├── USER_GUIDE.md            # User documentation
├── DEPLOYMENT.md            # Production deployment
├── SETUP_CHECKLIST.md       # Pre-launch checklist
├── .env.example             # Environment template
└── package.json             # Dependencies
```

## 🔧 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Backend:** Supabase (PostgreSQL + Auth)
- **Icons:** Bootstrap Icons
- **Styling:** Custom CSS with gradients
- **State Management:** React Context API
- **Security:** Row Level Security (RLS)

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

- 📖 Read the [User Guide](USER_GUIDE.md)
- 🚀 Check the [Deployment Guide](DEPLOYMENT.md)
- ✅ Use the [Setup Checklist](SETUP_CHECKLIST.md)
- 🔧 Review [Supabase Setup](supabase/README.md)

## 📝 License

MIT License - feel free to use this project for your college or organization!

---

**Built with ❤️ for college campuses**
