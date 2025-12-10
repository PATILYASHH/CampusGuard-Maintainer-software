import React, { useState, useEffect, FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { Device, NewDeviceLog, DeviceStatus } from "../types/database.types";
import { evaluateStatus, getSensorLabels } from "../utils/prediction";
import "../styles/AddLog.css";

const AddLog: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [formData, setFormData] = useState({
    device_id: "",
    sensor_1: "",
    sensor_2: "",
    sensor_3: "",
    sensor_4: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
    status?: DeviceStatus;
  } | null>(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .order("device_name", { ascending: true });

      if (error) throw error;
      setDevices(data || []);
    } catch (error: any) {
      console.error("Error fetching devices:", error);
    } finally {
      setLoadingDevices(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Fetch selected device
      const { data: device, error: fetchError } = await supabase
        .from("devices")
        .select("*")
        .eq("id", formData.device_id)
        .single();

      if (fetchError) throw fetchError;
      if (!device) throw new Error("Device not found");

      // Convert sensor values to numbers for evaluation
      const sensor1 = parseFloat(formData.sensor_1) || 0;
      const sensor2 = parseFloat(formData.sensor_2) || 0;
      const sensor3 = parseFloat(formData.sensor_3) || 0;
      const sensor4 = parseFloat(formData.sensor_4) || 0;

      // Evaluate status
      const computedStatus = evaluateStatus(
        device.device_type,
        sensor1,
        sensor2,
        sensor3,
        sensor4,
        device.max_temp,
        device.max_vibration,
        device.max_power,
        device.max_usage
      );

      // Insert log
      const newLog: NewDeviceLog = {
        device_id: formData.device_id,
        sensor_1: sensor1,
        sensor_2: sensor2,
        sensor_3: sensor3,
        sensor_4: sensor4,
        status: computedStatus,
      };

      const { error: insertError } = await supabase
        .from("sensor_logs")
        .insert([newLog]);

      if (insertError) throw insertError;

      // Update device status
      const { error: updateError } = await supabase
        .from("devices")
        .update({ status: computedStatus })
        .eq("id", formData.device_id);

      if (updateError) throw updateError;

      setMessage({
        type: "success",
        text: `Sensor log added successfully for ${device.device_name}`,
        status: computedStatus,
      });

      // Reset form
      setFormData({
        device_id: "",
        sensor_1: "",
        sensor_2: "",
        sensor_3: "",
        sensor_4: "",
      });
      setSelectedDevice(null);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to add sensor log",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "device_id") {
      const device = devices.find((d) => d.id === value) || null;
      setSelectedDevice(device);
      setFormData((prev) => ({
        ...prev,
        device_id: value,
      }));
    } else if (name.startsWith("sensor_")) {
      // Keep sensor values as strings for display, convert to number only when needed
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    }
  };

  const sensorLabels = selectedDevice
    ? getSensorLabels(selectedDevice.device_type)
    : { sensor1: "Sensor 1", sensor2: "Sensor 2", sensor3: "Sensor 3", sensor4: "Sensor 4" };

  const getStatusClass = (status: DeviceStatus) => {
    switch (status) {
      case "NORMAL":
        return "status-normal";
      case "NEEDS_ATTENTION":
        return "status-warning";
      case "MAINTENANCE_REQUIRED":
        return "status-maintenance";
      default:
        return "";
    }
  };

  if (loadingDevices) {
    return (
      <div className="add-log-container">
        <p>Loading devices...</p>
      </div>
    );
  }

  return (
    <div className="add-log-container">
      <h1>Add Sensor Log</h1>

      {devices.length === 0 ? (
        <div className="no-devices">
          <p>No devices found. Please add a device first.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="log-form">
          <div className="form-group">
            <label htmlFor="device_id">Select Device</label>
            <select
              id="device_id"
              name="device_id"
              value={formData.device_id}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select a device --</option>
              {devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.device_name} ({device.device_type.toUpperCase()}) - {device.location}
                </option>
              ))}
            </select>
          </div>

          {selectedDevice && (
            <div className="device-info-card">
              <h4>📊 Current Machine Data Required:</h4>
              <div className="sensor-info">
                <div className="sensor-item">
                  <span className="sensor-icon">🌡️</span>
                  <span>{sensorLabels.sensor1}</span>
                </div>
                <div className="sensor-item">
                  <span className="sensor-icon">📈</span>
                  <span>{sensorLabels.sensor2}</span>
                </div>
                <div className="sensor-item">
                  <span className="sensor-icon">⚡</span>
                  <span>{sensorLabels.sensor3}</span>
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="sensor_1">{sensorLabels.sensor1}</label>
            <input
              type="number"
              id="sensor_1"
              name="sensor_1"
              value={formData.sensor_1}
              onChange={handleInputChange}
              placeholder={`Enter ${sensorLabels.sensor1.toLowerCase()}`}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sensor_2">{sensorLabels.sensor2}</label>
            <input
              type="number"
              id="sensor_2"
              name="sensor_2"
              value={formData.sensor_2}
              onChange={handleInputChange}
              placeholder={`Enter ${sensorLabels.sensor2.toLowerCase()}`}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sensor_3">{sensorLabels.sensor3}</label>
            <input
              type="number"
              id="sensor_3"
              name="sensor_3"
              value={formData.sensor_3}
              onChange={handleInputChange}
              placeholder={`Enter ${sensorLabels.sensor3.toLowerCase()}`}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sensor_4">{sensorLabels.sensor4}</label>
            <input
              type="number"
              id="sensor_4"
              name="sensor_4"
              value={formData.sensor_4}
              onChange={handleInputChange}
              placeholder={`Enter ${sensorLabels.sensor4.toLowerCase()}`}
              min="0"
              required
            />
          </div>

          <button type="submit" disabled={loading || !selectedDevice} className="submit-btn">
            {loading ? "Analyzing Data..." : "Submit & Check Status"}
          </button>
        </form>
      )}

      {message && (
        <div className={`message ${message.type}`}>
          <p>{message.text}</p>
          {message.status && (
            <div className={`status-badge ${getStatusClass(message.status)}`}>
              Status: {message.status}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddLog;
