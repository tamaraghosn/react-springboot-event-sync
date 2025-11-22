import { useState, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [tabId, setTabId] = useState("");

  useEffect(() => {
    let storedTabId = sessionStorage.getItem("tabId");
    // if its empty
    if (!storedTabId) {
      storedTabId = crypto.randomUUID();
      sessionStorage.setItem("tabId", storedTabId);
    }
    setTabId(storedTabId);

    const savedText = sessionStorage.getItem("savedText") || "";
    const savedLabel = sessionStorage.getItem("savedLabel") || "";

    setText(savedText);
    setLabel(savedLabel);

    const interval = setInterval(() => {
      fetchLabel(storedTabId);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sendText = async (newText) => {
    // if tabdId is empty
    if (!tabId) return;

    try {
      await axios.post("http://localhost:8080/events/text", {
        tabId: tabId,
        text: newText,
      });
    } catch (e) {
      console.error("Error sending text:", e);
    }
  };

  const fetchLabel = async (currentTabId) => {
    try {
      const res = await axios.get("http://localhost:8080/events/label", {
        params: { tabId: currentTabId },
      });

      const newLabel = res.data.label;
      setLabel(newLabel);
      sessionStorage.setItem("savedLabel", newLabel);
    } catch (e) {
      console.error("Error fetching label:", e);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);

    sessionStorage.setItem("savedText", value);

    sendText(value);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Event Sync UI</Typography>

      <Typography variant="h8">Tab ID: {tabId}</Typography>

      <TextField
        fullWidth
        label="Type something"
        value={text}
        onChange={handleInputChange}
        sx={{ mt: 3 }}
      />

      <Typography variant="h6" sx={{ mt: 4 }}>
        Server Label: {label}
      </Typography>
    </Box>
  );
}

export default App;
