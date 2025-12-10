import { DeviceType, DeviceStatus } from "../types/database.types";

export function evaluateStatus(
  deviceType: DeviceType,
  s1: number,
  s2: number,
  s3: number,
  s4: number,
  maxTemp: number,
  maxVibration: number,
  maxPower: number,
  maxUsage: number
): DeviceStatus {
  if (deviceType === "fan") {
    if (s1 > maxTemp || s2 > maxVibration || s3 > maxPower || s4 > 1500) return "MAINTENANCE_REQUIRED";
  }

  if (deviceType === "ac") {
    if (s1 > maxTemp || s2 > 85 || s3 > maxPower || s4 > 300) return "MAINTENANCE_REQUIRED";
  }

  if (deviceType === "pc") {
    if (s1 > maxTemp || s2 > maxUsage || s3 > maxUsage || s4 > maxUsage) return "MAINTENANCE_REQUIRED";
    if (s1 > 85 || s2 > 90 || s3 > 90 || s4 > 90) return "NEEDS_ATTENTION";
  }

  if (deviceType === "printer") {
    if (s1 < 20 || s2 > 10 || s3 > 10 || s4 < 20) return "MAINTENANCE_REQUIRED";
  }

  return "NORMAL";
}

export function getSensorLabels(deviceType: DeviceType): {
  sensor1: string;
  sensor2: string;
  sensor3: string;
  sensor4: string;
} {
  switch (deviceType) {
    case "fan":
      return {
        sensor1: "Temperature (°C)",
        sensor2: "Vibration Level",
        sensor3: "Power Consumption (W)",
        sensor4: "Speed (RPM)",
      };
    case "ac":
      return {
        sensor1: "Temperature (°C)",
        sensor2: "Humidity (%)",
        sensor3: "Power Consumption (W)",
        sensor4: "Pressure (PSI)",
      };
    case "pc":
      return {
        sensor1: "CPU Temperature (°C)",
        sensor2: "CPU Usage (%)",
        sensor3: "RAM Usage (%)",
        sensor4: "Disk Usage (%)",
      };
    case "printer":
      return {
        sensor1: "Paper Level (sheets)",
        sensor2: "Paper Jam Count",
        sensor3: "Print Queue Size",
        sensor4: "Toner Level (%)",
      };
    default:
      return {
        sensor1: "Sensor 1",
        sensor2: "Sensor 2",
        sensor3: "Sensor 3",
        sensor4: "Sensor 4",
      };
  }
}

export function getNormalBehavior(deviceType: DeviceType, maxTemp?: number, maxVibration?: number, maxPower?: number, maxUsage?: number): {
  description: string;
  thresholds: string[];
} {
  const labels = getSensorLabels(deviceType);

  switch (deviceType) {
    case "fan":
      return {
        description: "Normal fan operation parameters",
        thresholds: [
          `${labels.sensor1}: Below ${maxTemp ?? 70}°C`,
          `${labels.sensor2}: Below ${maxVibration ?? 6}`,
          `${labels.sensor3}: Below ${maxPower ?? 500}W`,
          `${labels.sensor4}: Below 1500 RPM`,
        ],
      };
    case "ac":
      return {
        description: "Normal AC operation parameters",
        thresholds: [
          `${labels.sensor1}: Below ${maxTemp ?? 22}°C`,
          `${labels.sensor2}: Below 85%`,
          `${labels.sensor3}: Below ${maxPower ?? 800}W`,
          `${labels.sensor4}: Below 300 PSI`,
        ],
      };
    case "pc":
      return {
        description: "Normal PC operation parameters",
        thresholds: [
          `${labels.sensor1}: Below ${maxTemp ?? 85}°C (Warning at 85-95°C)`,
          `${labels.sensor2}: Below ${maxUsage ?? 90}%`,
          `${labels.sensor3}: Below ${maxUsage ?? 90}%`,
          `${labels.sensor4}: Below ${maxUsage ?? 90}%`,
        ],
      };
    case "printer":
      return {
        description: "Normal printer operation parameters",
        thresholds: [
          `${labels.sensor1}: Above 20 sheets`,
          `${labels.sensor2}: Below 10`,
          `${labels.sensor3}: Below 10`,
          `${labels.sensor4}: Above 20%`,
        ],
      };
    default:
      return {
        description: "Normal operation parameters",
        thresholds: [],
      };
  }
}
