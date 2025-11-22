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
    <Box sx={{ p: 4, mx: 5 }}>
      <Typography
        variant="h4"
        sx={{ color: "teal", fontWeight: "bold", mb: 2 }}
      >
        Event Driven Synchronization
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Tab ID: {tabId}
      </Typography>

      <TextField
        sx={{
          mt: 3,

          "& .MuiInputLabel-root": {
            color: "teal",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "teal",
            borderColor: "teal",
            borderWidth: "3px",
          },

          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "teal",
              borderWidth: "3px",
            },
        }}
        fullWidth
        label="Type something"
        value={text}
        onChange={handleInputChange}
      />

      <Typography variant="h6" sx={{ mt: 4 }}>
        Server Label: {label}
      </Typography>
    </Box>
  );
}

export default App;
