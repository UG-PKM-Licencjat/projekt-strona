import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("/api/logs"); // Replace "/api/logs" with your API endpoint for querying logs from MongoDB
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <div>
      <h1>Logs</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>{log.message}</li> // Replace "log.id" and "log.message" with the appropriate properties from your log object
        ))}
      </ul>
    </div>
  );
}
