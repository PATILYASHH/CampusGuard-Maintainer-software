-- Drop existing tables if they exist (fresh start)
DROP TABLE IF EXISTS device_logs CASCADE;
DROP TABLE IF EXISTS devices CASCADE;

-- Create devices table
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL CHECK (device_type IN ('fan', 'ac', 'pc', 'printer')),
  device_name TEXT NOT NULL,
  location TEXT NOT NULL,
  installation_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'NORMAL' CHECK (status IN ('NORMAL', 'NEEDS_ATTENTION', 'MAINTENANCE_REQUIRED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, device_name)
);

-- Create sensor_logs table (renamed from device_logs)
CREATE TABLE sensor_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  sensor_1 NUMERIC NOT NULL CHECK (sensor_1 >= 0),
  sensor_2 NUMERIC NOT NULL CHECK (sensor_2 >= 0),
  sensor_3 NUMERIC NOT NULL CHECK (sensor_3 >= 0),
  sensor_4 NUMERIC NOT NULL CHECK (sensor_4 >= 0),
  status TEXT NOT NULL CHECK (status IN ('NORMAL', 'NEEDS_ATTENTION', 'MAINTENANCE_REQUIRED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_devices_user_id ON devices(user_id);
CREATE INDEX idx_devices_status ON devices(status);
CREATE INDEX idx_devices_type ON devices(device_type);
CREATE INDEX idx_sensor_logs_device_id ON sensor_logs(device_id);
CREATE INDEX idx_sensor_logs_created_at ON sensor_logs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensor_logs ENABLE ROW LEVEL SECURITY;

-- Devices policies - users can only access their own devices
CREATE POLICY "Users can view their own devices" ON devices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own devices" ON devices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own devices" ON devices
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices" ON devices
  FOR DELETE USING (auth.uid() = user_id);

-- Sensor logs policies - users can only access logs for their own devices
CREATE POLICY "Users can view their device logs" ON sensor_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM devices
      WHERE devices.id = sensor_logs.device_id
      AND devices.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert logs for their devices" ON sensor_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM devices
      WHERE devices.id = sensor_logs.device_id
      AND devices.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update logs for their devices" ON sensor_logs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM devices
      WHERE devices.id = sensor_logs.device_id
      AND devices.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete logs for their devices" ON sensor_logs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM devices
      WHERE devices.id = sensor_logs.device_id
      AND devices.user_id = auth.uid()
    )
  );
