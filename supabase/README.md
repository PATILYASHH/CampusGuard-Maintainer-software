# Supabase Setup Instructions

## How to Setup Your SaaS Database with Authentication

### Step 1: Create Supabase Project
1. Go to https://supabase.com and sign in
2. Click **New Project**
3. Choose your organization
4. Set a project name and database password
5. Select a region close to your users
6. Click **Create new project** and wait for it to initialize

### Step 2: Enable Email Authentication
1. Navigate to **Authentication → Providers** in the left sidebar
2. Find **Email** provider
3. Make sure it's **Enabled** (it should be by default)
4. Optional: Configure email templates under **Authentication → Email Templates**

### Step 3: Run the Migration
1. Navigate to **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the entire contents of `migrations/001_create_tables.sql`
4. Paste it into the SQL Editor
5. Click **Run** or press `Ctrl+Enter`

This will create:
- ✅ `devices` table with user_id foreign key
- ✅ `device_logs` table with foreign key relationship
- ✅ Database indexes for performance
- ✅ Row Level Security (RLS) policies for multi-tenant data isolation
- ✅ Unique constraint on device names per user

### Step 4: Verify Tables & Policies
1. Go to **Table Editor** and verify:
   - `devices` table with user_id column
   - `device_logs` table
2. Go to **Authentication → Policies** and verify RLS policies are enabled

### Step 5: Get Your Supabase Credentials
1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** key (starts with eyJ...)

### Step 6: Configure Your React App
1. Create `.env` file in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. The Supabase client is already configured in `src/lib/supabase.ts`

### Step 7: Install Dependencies
```bash
npm install @supabase/supabase-js bootstrap-icons
```

### Step 8: Run Your Application
```bash
npm run dev
```

Your SaaS application is now ready! 🎉

---

---

## 🔐 Security Features

### Row Level Security (RLS)
The database is configured with RLS policies to ensure:
- Users can only view, create, update, and delete **their own devices**
- Users can only access sensor logs for **their own devices**
- Complete data isolation between different users
- No user can access another user's data

### Authentication
- Email/password authentication via Supabase Auth
- Secure session management
- Password must be at least 6 characters
- Email verification (optional, can be configured)

---

## Database Schema

### `devices` table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| device_type | text | fan \| ac \| pc \| printer |
---

## 📊 How It Works

### Multi-Tenant Architecture
1. **User Signs Up** → Account created in `auth.users` table
2. **User Adds Device** → Device created with `user_id` reference
3. **RLS Enforces Isolation** → Query automatically filters by `auth.uid()`
4. **User Sees Only Their Data** → Complete data privacy

### Data Flow
```
User Login → JWT Token → Supabase Client → RLS Policies → User's Data Only
```ensor_2 | integer | Sensor reading 2 |
| sensor_3 | integer | Sensor reading 3 |
| status | text | NORMAL \| WARNING \| MAINTENANCE_REQUIRED |
| created_at | timestamp | Auto-generated |

---

## Sample Data (Optional)

If you want to test with sample data, run this in SQL Editor:

```sql
-- Insert sample devices
INSERT INTO devices (device_type, device_name, location, max_temp, max_vibration, max_power, max_usage, status)
VALUES 
  ('fan', 'FAN-101', 'Lab-1', 70, 6, 500, 100, 'NORMAL'),
  ('ac', 'AC-201', 'Classroom-A', 22, 85, 800, 200, 'NORMAL'),
  ('pc', 'PC-301', 'Computer Lab', 95, 90, 600, 150, 'NORMAL'),
  ('printer', 'PRINTER-401', 'Office', 100, 10, 300, 80, 'NORMAL');
```

---

## Troubleshooting

**Error: "relation does not exist"**
- Make sure you ran the migration SQL
- Check Table Editor to confirm tables exist

**Error: "permission denied"**
- Check RLS policies are created
- For development, policies allow all operations

**Can't connect to Supabase**
- Verify your `.env` variables are correct
- Restart your dev server after adding `.env`
