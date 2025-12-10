export type DeviceType = "fan" | "ac" | "pc" | "printer";
export type DeviceStatus = "NORMAL" | "NEEDS_ATTENTION" | "MAINTENANCE_REQUIRED";

export interface Device {
  id: string;
  user_id: string;
  device_type: DeviceType;
  device_name: string;
  location: string;
  installation_date: string;
  max_temp: number;
  max_vibration: number;
  max_power: number;
  max_usage: number;
  status: DeviceStatus;
  created_at: string;
  updated_at: string;
}

export interface DeviceLog {
  id: string;
  device_id: string;
  sensor_1: number;
  sensor_2: number;
  sensor_3: number;
  sensor_4: number;
  status: DeviceStatus;
  created_at: string;
}

export interface NewDevice {
  user_id: string;
  device_type: DeviceType;
  device_name: string;
  location: string;
  installation_date: string;
  max_temp: number;
  max_vibration: number;
  max_power: number;
  max_usage: number;
  status: DeviceStatus;
}

export interface NewDeviceLog {
  device_id: string;
  sensor_1: number;
  sensor_2: number;
  sensor_3: number;
  sensor_4: number;
  status: DeviceStatus;
}
