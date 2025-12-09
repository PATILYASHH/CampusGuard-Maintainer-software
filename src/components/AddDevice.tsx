import React, { useState, useEffect, FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { DeviceType, NewDevice } from "../types/database.types";
import { getNormalBehavior } from "../utils/prediction";
import "../styles/AddDevice.css";

const AddDevice: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    device_type: "fan" as DeviceType,
    device_name: "",
    location: "",
    max_temp: 0,
    max_vibration: 0,
    max_power: 0,
    max_usage: 0,
  });

  const normalBehavior = getNormalBehavior(formData.device_type);
  const [existingDevices, setExistingDevices] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchExistingDeviceNames();
  }, []);

  const fetchExistingDeviceNames = async () => {
    try {
      const { data, error } = await supabase
        .from("devices")
        .select("device_name");

      if (error) throw error;
      setExistingDevices(data?.map((d) => d.device_name.toLowerCase()) || []);
    } catch (error: any) {
      console.error("Error fetching device names:", error);
    } finally {
      setLoadingDevices(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Check for duplicate device name
    if (existingDevices.includes(formData.device_name.toLowerCase())) {
      setMessage({
        type: "error",
        text: `Device name "${formData.device_name}" already exists. Please use a different name.`,
      });
      setLoading(false);
      return;
    }

    // Validate no negative values
    if (
      formData.max_temp < 0 ||
      formData.max_vibration < 0 ||
      formData.max_power < 0 ||
      formData.max_usage < 0
    ) {
      setMessage({
        type: "error",
        text: "All threshold values must be positive numbers.",
      });
      setLoading(false);
      return;
    }

    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const newDevice: NewDevice = {
        user_id: user.id,
        ...formData,
        status: "NORMAL",
      };

      const { error } = await supabase.from("devices").insert([newDevice]);

      if (error) throw error;

      setMessage({
        type: "success",
        text: `Device "${formData.device_name}" added successfully!`,
      });

      // Add to existing devices list
      setExistingDevices([...existingDevices, formData.device_name.toLowerCase()]);

      // Reset form
      setFormData({
        device_type: "fan",
        device_name: "",
        location: "",
        max_temp: 0,
        max_vibration: 0,
        max_power: 0,
        max_usage: 0,
      });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to add device",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "device_type"
          ? value
          : name === "device_name" || name === "location"
          ? value
          : Number(value),
    }));
  };

  return (
    <div className="add-device-container">
      <h1>Add New Device</h1>

      <div className="normal-behavior-info">
        <h3>📋 {normalBehavior.description}</h3>
        <ul>
          {normalBehavior.thresholds.map((threshold, index) => (
            <li key={index}>{threshold}</li>
          ))}
        </ul>
        <p className="info-note">
          ℹ️ These values represent normal operating conditions. Exceeding these
          thresholds will trigger maintenance alerts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="device-form">
        <div className="form-group">
          <label htmlFor="device_type">Device Type</label>
          <select
            id="device_type"
            name="device_type"
            value={formData.device_type}
            onChange={handleInputChange}
            required
          >
            <option value="fan">Fan</option>
            <option value="ac">AC</option>
            <option value="pc">PC</option>
            <option value="printer">Printer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="device_name">Device Name</label>
          <input
            type="text"
            id="device_name"
            name="device_name"
            value={formData.device_name}
            onChange={handleInputChange}
            placeholder="e.g., FAN-101"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., Lab-1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="max_temp">Max Temperature</label>
          <input
            type="number"
            id="max_temp"
            name="max_temp"
            value={formData.max_temp}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="max_vibration">Max Vibration</label>
          <input
            type="number"
            id="max_vibration"
            name="max_vibration"
            value={formData.max_vibration}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="max_power">Max Power</label>
          <input
            type="number"
            id="max_power"
            name="max_power"
            value={formData.max_power}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="max_usage">Max Usage</label>
          <input
            type="number"
            id="max_usage"
            name="max_usage"
            value={formData.max_usage}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Adding Device..." : "Add Device"}
        </button>
      </form>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
};

export default AddDevice;
