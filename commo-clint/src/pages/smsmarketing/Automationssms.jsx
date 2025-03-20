// import React, { useState } from "react";
// import { Button, InputGroup, Dropdown, DropdownButton, FormControl } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Automationssms = () => {
//   // Separate state for each date and time field
//   const [immediatelyDate, setImmediatelyDate] = useState("");
//   const [scheduleDate, setScheduleDate] = useState("");
//   const [immediatelyTime, setImmediatelyTime] = useState("");
//   const [scheduleTime, setScheduleTime] = useState("");
//   const navigate = useNavigate();

//   const handleImmediatelyDateChange = (e) => setImmediatelyDate(e.target.value);
//   const handleScheduleDateChange = (e) => setScheduleDate(e.target.value);
  
//   // Handle time changes for both fields
//   const handleImmediatelyTimeChange = (time) => setImmediatelyTime(time);
//   const handleScheduleTimeChange = (time) => setScheduleTime(time);

//   // Save button click logic
//   const handleSave = () => {
//     if (scheduleDate && scheduleTime) {
//       navigate("/smsmarketing/SmsSender");
//     } else {
//       alert("Please select both date and time before saving.");
//     }
//   };

//   return (
//     <div style={{backgroundColor: '#EAF6FE',padding:5}}>
//     <div style={styles.container}>
//       <h2>Automations:</h2>

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         {/* Immediately input field */}
//         <div style={{ ...styles.inputGroup, marginRight: "30px" }}>
//           <h4>Immediately</h4>
//           <InputGroup className="mb-3" style={styles.inputWrapper}>
//             <FormControl
//               type="date"
//               value={immediatelyDate}
//               onChange={handleImmediatelyDateChange}
//             />
//             <DropdownButton
//               as={InputGroup.Append}
//               variant="outline-secondary"
//               title={immediatelyTime || "Select Time"}
//               id="input-group-dropdown-1"
//               style={styles.dropdownButton}
//             >
//               {["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"].map((time, index) => (
//                 <Dropdown.Item key={index} onClick={() => handleImmediatelyTimeChange(time)}>
//                   {time}
//                 </Dropdown.Item>
//               ))}
//             </DropdownButton>
//           </InputGroup>
//         </div>

//         {/* Schedule On input field */}
//         <div style={styles.inputGroup}>
//           <h4>Schedule Date</h4>
//           <InputGroup className="mb-3" style={styles.inputWrapper}>
//             <FormControl
//               type="date"
//               value={scheduleDate}
//               onChange={handleScheduleDateChange}
//             />
//             <DropdownButton
//               as={InputGroup.Append}
//               variant="outline-secondary"
//               title={scheduleTime || "Select Time"}
//               id="input-group-dropdown-2"
//               style={styles.dropdownButton}
//             >
//               {["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"].map((time, index) => (
//                 <Dropdown.Item key={index} onClick={() => handleScheduleTimeChange(time)}>
//                   {time}
//                 </Dropdown.Item>
//               ))}
//             </DropdownButton>
//           </InputGroup>
//         </div>
//       </div>

//       <div style={styles.infoText}>
//         <h4>Send message to contacts who opted-in for marketing</h4>
//         <p>When 'opt-in' is on, messages are sent only to those who agreed to marketing.</p>
//       </div>

//       <Button
//         style={styles.saveButton}
//         onClick={handleSave}
//         disabled={!scheduleDate || !scheduleTime}
//       >
//         Save
//       </Button>

//     </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: "white",
//     border: "2px solid #0070C0",
//     borderRadius: "10px",
//     padding: "20px",
//     width: "60%",
//     margin: "20px auto",
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//     width: "48%",
//   },
//   inputWrapper: {
//     border: "2px solid #0070C0",
//     borderRadius: "5px",

//   },
//   dropdownButton: {
//     // border: "none",
//     border:'none'
//   },
//   infoText: {
//     fontSize: "14px",
//     marginBottom: "20px",
//     color: "#555",
//     lineHeight: "1.5",
//   },
//   saveButton: {
//     width: 100,
//     backgroundColor: "#0070C0",
//     color: "white",
//     marginLeft: "0",
//     border:'none',
//   },
// };

// export default Automationssms;
