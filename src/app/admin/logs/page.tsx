import React, { useState, useEffect } from "react";

export default function Page() {
  const [logs, setLogs] = useState<Array<{ id: string; message: string }>>([]);

  useEffect(() => {
    void fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/logs"); // Replace "/api/logs" with your API endpoint for querying logs from MongoDB
      const parsed = (await response.json()) as Array<{
        id: string;
        message: string;
      }>;
      setLogs(parsed);
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
