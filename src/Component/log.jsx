// src/LogWatch.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "../style/log.module.css";

const socket = io("https://logger-service-lsjm.onrender.com"); // Make sure this matches your server's address

function LogWatch() {
  const [logLines, setLogLines] = useState([]);

  useEffect(() => {
    socket.on("update", (data) => {
      console.log(data);
      setLogLines((prevLines) => [...prevLines, ...data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Log Viewer</h1>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Index</th>
            <th>Timestamp</th>
            <th>Log</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {logLines.map((line, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{new Date().toLocaleTimeString()}</td>
              <td>{line}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogWatch;
