import { DeviceType, DeviceStatus } from "../types/database.types";

export function evaluateStatus(
  deviceType: DeviceType,
  s1: number,
  s2: number,
  s3: number
): DeviceStatus {
  if (deviceType === "fan") {
    if (s1 > 70 || s2 > 6 || s3 > 500) return "MAINTENANCE_REQUIRED";
  }

  if (deviceType === "ac") {
    if (s1 > 22 || s2 > 85 || s3 > 800) return "MAINTENANCE_REQUIRED";
  }

  if (deviceType === "pc") {
    if (s1 > 95) return "MAINTENANCE_REQUIRED";
    if (s1 > 85 || s2 > 90) return "WARNING";
  }

  if (deviceType === "printer") {
    if (s1 < 20 || s2 > 10) return "MAINTENANCE_REQUIRED";
  }

  return "NORMAL";
}

export function getSensorLabels(deviceType: DeviceType): {
  sensor1: string;
  sensor2: string;
  sensor3: string;
} {
  switch (deviceType) {
    case "fan":
      return {
        sensor1: "Temperature (°C)",
        sensor2: "Vibration Level",
        sensor3: "Power Consumption (W)",
      };
    case "ac":
      return {
        sensor1: "Temperature (°C)",
        sensor2: "Humidity (%)",
        sensor3: "Power Consumption (W)",
      };
    case "pc":
      return {
        sensor1: "CPU Temperature (°C)",
        sensor2: "CPU Usage (%)",
        sensor3: "RAM Usage (%)",
      };
    case "printer":
      return {
        sensor1: "Paper Level (sheets)",
        sensor2: "Paper Jam Count",
        sensor3: "Print Queue Size",
      };
    default:
      return {
        sensor1: "Sensor 1",
        sensor2: "Sensor 2",
        sensor3: "Sensor 3",
      };
  }
}

export function getNormalBehavior(deviceType: DeviceType): {
  description: string;
  thresholds: string[];
} {
  switch (deviceType) {
    case "fan":
      return {
        description: "Normal fan operation parameters",
        thresholds: [
          "Temperature: Below 70°C",
          "Vibration Level: Below 6",
          "Power Consumption: Below 500W",
        ],
      };
    case "ac":
      return {
        description: "Normal AC operation parameters",
        thresholds: [
          "Temperature: Below 22°C",
          "Humidity: Below 85%",
          "Power Consumption: Below 800W",
        ],
      };
    case "pc":
      return {
        description: "Normal PC operation parameters",
        thresholds: [
          "CPU Temperature: Below 85°C (Warning at 85-95°C)",
          "CPU Usage: Below 90%",
          "RAM Usage: Below 90%",
        ],
      };
    case "printer":
      return {
        description: "Normal printer operation parameters",
        thresholds: [
          "Paper Level: Above 20 sheets",
          "Paper Jam Count: Below 10",
          "Print Queue: Monitored",
        ],
      };
    default:
      return {
        description: "Normal operation parameters",
        thresholds: [],
      };
  }
}
