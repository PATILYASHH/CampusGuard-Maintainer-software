import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Device, DeviceStatus } from "../types/database.types";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("devices")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setDevices(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: DeviceStatus): string => {
    switch (status) {
      case "NORMAL":
        return "status-normal";
      case "WARNING":
        return "status-warning";
      case "MAINTENANCE_REQUIRED":
        return "status-maintenance";
      default:
        return "";
    }
  };

  const getStatusCounts = () => {
    const counts = {
      NORMAL: 0,
      WARNING: 0,
      MAINTENANCE_REQUIRED: 0,
    };

    devices.forEach((device) => {
      counts[device.status]++;
    });

    return counts;
  };

  const handleDelete = async (device: Device) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${device.device_name}"?\n\nThis will also delete all associated sensor logs.`
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("devices")
        .delete()
        .eq("id", device.id);

      if (error) throw error;

      // Update local state
      setDevices(devices.filter((d) => d.id !== device.id));
      
      alert(`Device "${device.device_name}" deleted successfully!`);
    } catch (err: any) {
      alert(`Failed to delete device: ${err.message}`);
    }
  };

  const handleMarkAsMaintained = async (device: Device) => {
    const confirmed = window.confirm(
      `Mark "${device.device_name}" as maintained?\n\nThis will reset the device status to NORMAL.`
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("devices")
        .update({ status: "NORMAL" })
        .eq("id", device.id);

      if (error) throw error;

      // Update local state
      setDevices(
        devices.map((d) =>
          d.id === device.id ? { ...d, status: "NORMAL" as DeviceStatus } : d
        )
      );

      alert(`Device "${device.device_name}" marked as maintained!`);
    } catch (err: any) {
      alert(`Failed to update device: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchDevices} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statusCounts = getStatusCounts();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Device Dashboard</h1>
        <button onClick={fetchDevices} className="refresh-btn">
          Refresh
        </button>
      </div>

      <div className="status-summary">
        <div className="summary-card normal">
          <div className="card-number">{statusCounts.NORMAL}</div>
          <div className="card-label">Normal</div>
        </div>
        <div className="summary-card warning">
          <div className="card-number">{statusCounts.WARNING}</div>
          <div className="card-label">Warning</div>
        </div>
        <div className="summary-card maintenance">
          <div className="card-number">{statusCounts.MAINTENANCE_REQUIRED}</div>
          <div className="card-label">Maintenance Required</div>
        </div>
      </div>

      {devices.length === 0 ? (
        <div className="no-data">
          <p>No devices found. Add a device to get started.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="device-table">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Device Type</th>
                <th>Location</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td className="device-name">{device.device_name}</td>
                  <td className="device-type">
                    {device.device_type.toUpperCase()}
                  </td>
                  <td>{device.location}</td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        device.status
                      )}`}
                    >
                      {device.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {device.status === "MAINTENANCE_REQUIRED" && (
                        <button
                          onClick={() => handleMarkAsMaintained(device)}
                          className="maintain-btn"
                          title="Mark as maintained"
                        >
                          ✅ Maintained
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(device)}
                        className="delete-btn"
                        title="Delete device"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
