# 📘 CampusGuard User Guide

## Welcome to CampusGuard! 🎓

Your smart predictive maintenance system for college electronic devices.

---

## 🚀 Getting Started

### 1. Create Your Account
1. Visit the application URL
2. Click **Sign Up**
3. Enter your email and password
4. Confirm your password
5. Click **Sign Up** button

### 2. Sign In
1. Click **Sign In** tab
2. Enter your credentials
3. Click **Sign In** button
4. You'll be redirected to the dashboard

---

## 📱 Dashboard Overview

### Navigation Bar
- **CampusGuard** - Logo (click to return home)
- **Dashboard** - View all devices
- **Add Device** - Register new devices
- **Add Log** - Record sensor readings
- **User Profile** - Shows your email
- **Logout** - Sign out of your account

### Device Status Colors
- 🟢 **Green (NORMAL)** - Device is healthy
- 🟡 **Yellow (NEEDS_ATTENTION)** - Monitor closely
- 🔴 **Red (MAINTENANCE_REQUIRED)** - Immediate action needed

---

## 🔧 Managing Devices

### Adding a New Device

1. Click **Add Device** in the navbar
2. Fill in the required information:
   - **Device Name** - Unique name for your device (e.g., "Library Printer 01")
   - **Device Type** - Select from dropdown:
     - 🖥️ **Computer** - Desktop PCs, laptops
     - 🖨️ **Printer** - All types of printers
     - 🌀 **Fan** - Ceiling fans, table fans
     - ❄️ **Air Conditioner** - AC units
   - **Location** - Where the device is located (e.g., "Computer Lab 2")
   - **Installation Date** - When the device was installed

3. Click **Add Device** button
4. Success message will appear
5. Device added to your dashboard

#### Validation Rules
- ❌ **Duplicate names not allowed** - Each device must have a unique name
- ✅ All fields are required
- ✅ Installation date cannot be in the future

---

### Viewing Your Devices

**Dashboard** shows all your registered devices with:
- Device name and type
- Current status (color-coded)
- Location
- Installation date
- Action buttons

---

### Deleting a Device

1. Go to **Dashboard**
2. Find the device you want to remove
3. Click the **🗑️ Delete** button
4. Confirm deletion in the popup
5. Device and all its logs will be removed

⚠️ **Warning:** This action cannot be undone!

---

### Marking Device as Maintained

When a device shows **MAINTENANCE_REQUIRED** status:

1. Go to **Dashboard**
2. Find the device with red status
3. Click **✅ Mark as Maintained** button
4. Status resets to **NORMAL**
5. Sensor readings cleared for fresh monitoring

💡 **Tip:** Use this after performing maintenance work on the device.

---

## 📊 Recording Sensor Data

### Adding Sensor Logs

1. Click **Add Log** in the navbar
2. Select the device from dropdown
3. Device information will appear:
   - Device type
   - Current status
   - Normal behavior guidelines

4. Enter sensor readings (all values must be ≥ 0):
   - Varies by device type (see below)

5. Click **Add Log** button
6. System automatically evaluates device health

---

### Sensor Types by Device

#### 🖥️ Computer
| Sensor | Normal Range | What It Measures |
|--------|-------------|------------------|
| **Temperature** | 30-70°C | CPU/GPU heat |
| **CPU Usage** | 0-100% | Processor load |
| **Memory Usage** | 0-100% | RAM utilization |
| **Disk Usage** | 0-100% | Storage capacity |

**Normal Behavior:**
- Temperature: 30-70°C
- CPU Usage: 0-80%
- Memory Usage: 0-85%
- Disk Usage: 0-90%

---

#### 🖨️ Printer
| Sensor | Normal Range | What It Measures |
|--------|-------------|------------------|
| **Temperature** | 20-60°C | Internal heat |
| **Paper Jams** | 0-10 | Jam frequency |
| **Toner Level** | 0-100% | Ink/toner remaining |
| **Print Errors** | 0-10 | Error count |

**Normal Behavior:**
- Temperature: 20-60°C
- Paper Jams: 0-3
- Toner Level: 20-100%
- Print Errors: 0-5

---

#### 🌀 Fan
| Sensor | Normal Range | What It Measures |
|--------|-------------|------------------|
| **Temperature** | 20-50°C | Motor heat |
| **Vibration** | 0-50 Hz | Vibration level |
| **Noise Level** | 0-70 dB | Sound output |
| **Speed RPM** | 100-1500 | Rotation speed |

**Normal Behavior:**
- Temperature: 20-50°C
- Vibration: 0-30 Hz
- Noise Level: 20-60 dB
- Speed: 300-1200 RPM

---

#### ❄️ Air Conditioner
| Sensor | Normal Range | What It Measures |
|--------|-------------|------------------|
| **Temperature** | 16-30°C | Operating temp |
| **Pressure** | 0-500 PSI | Refrigerant pressure |
| **Humidity** | 30-70% | Moisture level |
| **Power Consumption** | 500-3000W | Energy usage |

**Normal Behavior:**
- Temperature: 18-26°C
- Pressure: 50-300 PSI
- Humidity: 40-60%
- Power: 800-2500W

---

## 🔍 Understanding Device Status

### Status Logic

The system evaluates each sensor reading and assigns a status:

#### 🟢 NORMAL
All sensors within normal range → Device is healthy

#### 🟡 NEEDS_ATTENTION
1-2 sensors outside normal range → Monitor the device

#### 🔴 MAINTENANCE_REQUIRED
3+ sensors outside normal range → Take immediate action

---

## 💡 Best Practices

### Regular Monitoring
- ✅ Record sensor logs **daily** for critical devices
- ✅ Record logs **weekly** for non-critical devices
- ✅ Check dashboard for status changes

### Maintenance
- ✅ Act immediately on red-status devices
- ✅ Investigate yellow-status devices within 24 hours
- ✅ Keep maintenance records outside the system

### Data Entry
- ✅ Use accurate sensor readings
- ✅ Don't enter random/fake data
- ✅ Record readings at consistent times

---

## 📈 Tips for Different Device Types

### Computers
- Monitor during peak usage hours
- High CPU/Memory usage is normal during heavy tasks
- Temperature spikes normal under load

### Printers
- Check toner levels weekly
- Paper jams increase with humidity
- Clean regularly to prevent errors

### Fans
- Listen for unusual noises
- Vibration increases with age
- Clean blades to reduce noise

### Air Conditioners
- Monitor during summer months
- Power consumption varies with settings
- Filter changes improve efficiency

---

## ❓ Frequently Asked Questions

### Q: Can I change device information after adding it?
**A:** Currently, you need to delete and re-add the device. Future updates will add edit functionality.

### Q: How long is sensor log history kept?
**A:** All historical data is retained unless you delete the device.

### Q: Can I export data?
**A:** Export functionality will be added in future updates.

### Q: Can multiple users share devices?
**A:** No, each account's devices are private. Team features coming soon.

### Q: What happens if I delete a device?
**A:** The device and all its sensor logs are permanently deleted.

### Q: Can I restore a deleted device?
**A:** No, deletion is permanent. We recommend keeping external records.

---

## 🆘 Troubleshooting

### Can't Add Device
- Check for duplicate names
- Ensure all fields are filled
- Try a different device name

### Can't Add Log
- Verify device exists
- Check all values are ≥ 0
- Ensure all fields are filled

### Status Not Updating
- Refresh the page
- Add a new log entry
- Check your internet connection

### Can't See My Devices
- Verify you're logged in
- Refresh the page
- Check if devices were added to this account

---

## 📞 Need Help?

- **Technical Issues:** Check browser console for errors
- **Feature Requests:** Contact your administrator
- **Data Issues:** Review this guide's best practices

---

## 🎯 Quick Reference Card

### Device Status
- 🟢 = All good
- 🟡 = Watch it
- 🔴 = Fix now

### Actions
- **Add Device** → Register new equipment
- **Add Log** → Record readings
- **Delete** → Remove device
- **Mark Maintained** → Reset status

### Validation
- No duplicate names
- No negative values
- All fields required

---

**Happy Monitoring! 🎉**

Keep your campus devices running smoothly with CampusGuard!
