import React, { useState, useEffect } from "react";
import { Button, InputGroup, Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AutomationsScreen = () => {
  // States to hold dates and times
  const [immediatelyDate, setImmediatelyDate] = useState(""); // Default should be today's date
  const [scheduleDate, setScheduleDate] = useState(""); // Schedule date will be inputted
  const [immediatelyTime, setImmediatelyTime] = useState(""); // Immediately time
  const [scheduleTime, setScheduleTime] = useState(""); // Scheduled time
  const [isImmediately, setIsImmediately] = useState(false); // Track if 'Immediately' is selected
  const [isSchedule, setIsSchedule] = useState(false); // Track if 'Schedule Date' is selected
  const navigate = useNavigate();

  // Defaulting to today's date when "Immediately" is clicked
  useEffect(() => {
    if (isImmediately) {
      const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
      setImmediatelyDate(today);
    }
  }, [isImmediately]);

  const handleImmediatelyTimeChange = (time) => setImmediatelyTime(time);
  const handleScheduleDateChange = (e) => setScheduleDate(e.target.value);
  const handleScheduleTimeChange = (time) => setScheduleTime(time);

  // Save button click logic
  const handleSave = () => {
    if (isImmediately || (scheduleDate && scheduleTime)) {
      navigate("/emailmarketing/Campaigns");
    } else {
      alert("Please select a date and time before saving.");
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF8EF', padding: 5 }}>
      <div style={styles.container}>
        <h2>Automations:</h2>

        <div style={styles.row}>
          {/* Immediately field */}
          <div style={styles.inputGroup}>
            <h4 style={styles.label}>Immediately</h4>
            <div style={styles.flexRow}>
              {isImmediately ? (
                <div style={styles.immediatelyText}>
                  <h5 style={{color:'green',border:'1px solid #FDEE96',padding:10,borderRadius:10}}>{immediatelyDate}</h5> {/* Show today's date */}
                </div>
              ) : (
                <Button 
                  onClick={() => {
                    setIsImmediately(true);
                    setIsSchedule(false); // Disable 'Schedule' if 'Immediately' is selected
                  }} 
                  style={styles.switchButton}
                  disabled={isSchedule} // Disable if 'Schedule Date' is selected
                >
                  Set Immediately
                </Button>
              )}
            </div>
          </div>

          {/* Schedule Date field */}
          <div style={styles.inputGroup}>
            <h4 style={styles.label}>Schedule Date</h4>
            <div style={styles.flexRow}>
              {isSchedule ? (
                <div style={styles.scheduleWrapper}>
                  <InputGroup className="mb-3" style={styles.inputWrapper}>
                    <FormControl
                      type="date"
                      value={scheduleDate}
                      onChange={handleScheduleDateChange}
                    />
                    <DropdownButton
                      as={InputGroup.Append}
                      variant="outline-secondary"
                      title={scheduleTime || "Select Time"}
                      id="input-group-dropdown-2"
                      style={styles.dropdownButton}
                    >
                      {["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"].map((time, index) => (
                        <Dropdown.Item key={index} onClick={() => handleScheduleTimeChange(time)}>
                          {time}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </InputGroup>
                </div>
              ) : (
                <Button 
                  onClick={() => {
                    setIsSchedule(true);
                    setIsImmediately(false); // Disable 'Immediately' if 'Schedule Date' is selected
                  }} 
                  style={styles.switchButton}
                  disabled={isImmediately} // Disable if 'Immediately' is selected
                >
                  Set Schedule
                </Button>
              )}
            </div>
          </div>
        </div>

        <div style={styles.infoText}>
          <h4>Send message to contacts who opted-in for marketing</h4>
          <p>When 'opt-in' is on, messages are sent only to those who agreed to marketing.</p>
        </div>

        <Button
          style={styles.saveButton}
          onClick={handleSave}
          disabled={!(isImmediately || (scheduleDate && scheduleTime))}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "white",
    border: "2px solid #FDEE96",
    borderRadius: "10px",
    padding: "20px",
    width: "60%",
    margin: "20px auto",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    marginTop: 20
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
  inputWrapper: {
    border: "2px solid green",
    borderRadius: "5px",
  },
  dropdownButton: {
    border: 'none',
  },
  immediatelyText: {
    fontSize: "16px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  switchButton: {
    backgroundColor: "#FDEE96",
    width: 200,
    color: "black",
    border: "none",
    padding: "10px",
    marginLeft: "10px", // Ensures the button is next to the label
  },
  flexRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: "10px", // Adds some space between the label and button
  },
  label: {
    marginBottom: "0", // Removes extra space between label and button
    lineHeight: "1.5", // Adjust line height for better readability
    marginBottom: "10px", // Add margin-bottom to space out the button and label
  },
  scheduleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: "14px",
    marginBottom: "20px",
    marginTop: 20,
    color: "#555",
    lineHeight: "1.5", // Adjusted line height for text block
  },
  saveButton: {
    width: 100,
    backgroundColor: "green",
    color: "white",
    marginLeft: "0",
    border: 'none',
    lineHeight: "1.5", // Ensure button text is well-aligned
    marginTop: "20px", // Ensures the button is spaced from the info text
  },
};

export default AutomationsScreen;
