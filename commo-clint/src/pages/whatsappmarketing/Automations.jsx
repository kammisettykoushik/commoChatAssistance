// import React, { useState } from "react";
// const Automations = () => {
//   const [workingHours, setWorkingHours] = useState("9:00 AM - 5:00 PM");
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       question: "Do you want to enable auto-replies during non-working hours?",
//       options: [
//         "Text",
//         "Image",
//         "Chat Box",
//         "Template",
//         "Sticker"
//       ],
//       answer: "",
//       isChecked: false,
//     },
//     {
//       id: 2,
//       question: "Should notifications be turned off during working hours?",
//       options: [
//         "Text",
//         "Image",
//         "Chat Box",
//         "Template",
//         "Sticker"
//       ],
//       answer: "",
//       isChecked: false,
//     },
//     {
//       id: 3,
//       question: "Do you want to enable custom greetings on your website?",
//       options: [
//         "Text",
//         "Image",
//         "Chat Box",
//         "Template",
//         "Sticker"
//       ],
//       answer: "",
//       isChecked: false,
//     },
//   ]);

//   const handleDropdownChange = (id, selectedOption) => {
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((q) =>
//         q.id === id ? { ...q, answer: selectedOption } : q
//       )
//     );
//   };
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };
//   const handleSubmit = () => {
//     console.log("Form Submitted!");
//     console.log(questions);
//   };

//   return (
//     <div style={{ padding: "20px",backgroundColor:'#FFF8EF'}}>
//       <div style={{ marginBottom: "20px" }}>
//         <label htmlFor="working-hours" style={{ marginLeft: 10 }}>
//           <b>Current Working Hours:</b>
//         </label>
//         <div style={{ position: 'relative', display: 'inline-block' }}>
//           <button onClick={toggleDropdown} style={{ backgroundColor: '#4b8bf2', padding: 5, color: 'white', border: 'none', borderRadius: 5, marginLeft: 10 }}>Set Working Hours</button>
//           {isDropdownVisible && (
//             <div
//               style={{
//                 position: 'absolute',
//                 backgroundColor: '#f9f9f9',
//                 minWidth: '160px',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 zIndex: 1,
//                 marginTop: '10px',
//               }}
//             >
//               <div style={{ padding: 10 }}>
//                 <div style={{ display: 'flex', marginBottom: '10px' }}>
//                   <label htmlFor="day" style={{ marginRight: '10px' }}><b>Day:</b></label>
//                   <input type="text" id="day" />
//                 </div>

//                 <div style={{ display: 'flex', marginBottom: '10px' }}>
//                   <label htmlFor="time" style={{ marginRight: '10px' }}><b>Time:</b></label>
//                   <input type="text" id="time" />
//                 </div>
//               </div>

//             </div>
//           )}
//         </div>
//       </div>


//       <div>
//         {questions.map((q) => (
//           <div
//             key={q.id}
//             style={{
//               marginBottom: "15px",
//               padding: "10px",
//               borderRadius: "5px",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <input
//                 type="checkbox"
//                 id={`checkbox-${q.id}`}
//                 checked={q.isChecked}
//                 onChange={() => {
//                   setQuestions((prevQuestions) =>
//                     prevQuestions.map((question) =>
//                       question.id === q.id
//                         ? { ...question, isChecked: !question.isChecked }
//                         : question
//                     )
//                   );
//                 }}
//                 style={{ marginRight: "10px" }}
//               />
//               <label htmlFor={`checkbox-${q.id}`} style={{ fontWeight: "bold" }}>
//                 {q.question}
//               </label>
//             </div>
//             <select
//               value={q.answer}
//               onChange={(e) => handleDropdownChange(q.id, e.target.value)}
//               style={{
//                 marginTop: "10px",
//                 width: "100%",
//                 padding: "5px",
//                 maxWidth: "300px",
//               }}
//             >
//               <option value="">Select an option</option>
//               {q.options.map((option, index) => (
//                 <option key={index} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ))}
//       </div>


//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <button
//           onClick={handleSubmit}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#549149",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             marginLeft: '80%'
//           }}
//         >
//           Save chnages
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Automations;



import React, { useState } from "react";
import { Button, InputGroup, Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Automations = () => {
  // Separate state for each date and time field
  const [immediatelyDate, setImmediatelyDate] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [immediatelyTime, setImmediatelyTime] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const navigate = useNavigate();

  const handleImmediatelyDateChange = (e) => setImmediatelyDate(e.target.value);
  const handleScheduleDateChange = (e) => setScheduleDate(e.target.value);
  
  // Handle time changes for both fields
  const handleImmediatelyTimeChange = (time) => setImmediatelyTime(time);
  const handleScheduleTimeChange = (time) => setScheduleTime(time);

  // Save button click logic
  const handleSave = () => {
    if (scheduleDate && scheduleTime) {
      navigate("/smsmarketing/SmsSender");
    } else {
      alert("Please select both date and time before saving.");
    }
  };

  return (
    <div style={{backgroundColor: '#FFF8EF',padding:5}}>
   <div style={styles.container}>
      <h2>Automations:</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Immediately input field */}
        <div style={{ ...styles.inputGroup, marginRight: "30px" }}>
          <h4>Immediately</h4>
          <InputGroup className="mb-3" style={styles.inputWrapper}>
            <FormControl
              type="date"
              value={immediatelyDate}
              onChange={handleImmediatelyDateChange}
            />
            <DropdownButton
              as={InputGroup.Append}
              variant="outline-secondary"
              title={immediatelyTime || "Select Time"}
              id="input-group-dropdown-1"
              style={styles.dropdownButton}
            >
              {["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"].map((time, index) => (
                <Dropdown.Item key={index} onClick={() => handleImmediatelyTimeChange(time)}>
                  {time}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </div>

        {/* Schedule On input field */}
        <div style={styles.inputGroup}>
          <h4>Schedule Date</h4>
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
      </div>

      <div style={styles.infoText}>
        <h4>Send message to contacts who opted-in for marketing</h4>
        <p>When 'opt-in' is on, messages are sent only to those who agreed to marketing.</p>
      </div>

      <Button
        style={styles.saveButton}
        onClick={handleSave}
        disabled={!scheduleDate || !scheduleTime}
      >
        Save
      </Button>

    </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "white",
    border: "2px solid green",
    borderRadius: "10px",
    padding: "20px",
    width: "60%",
    margin: "20px auto",
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
    // border: "none",
    border:'none'
  },
  infoText: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#555",
    lineHeight: "1.5",
  },
  saveButton: {
    width: 100,
    backgroundColor: "#28a745",
    color: "white",
    marginLeft: "0",
    border:'none',
  },
};

export default Automations;










