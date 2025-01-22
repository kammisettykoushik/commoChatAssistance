import React, { useState } from "react";
// import "./Automations.css"; // Optional for additional styling

const Automations = () => {
  const [workingHours, setWorkingHours] = useState("9:00 AM - 5:00 PM");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Do you want to enable auto-replies during non-working hours?",
      options: [
        "Always enabled",
        "Enabled on holidays",
        "Disabled during holidays",
        "Never enabled",
      ],
      answer: "",
      isChecked: false,
    },
    {
      id: 2,
      question: "Should notifications be turned off during working hours?",
      options: [
        "Yes, all notifications off",
        "Only critical notifications",
        "No, keep all notifications",
      ],
      answer: "",
      isChecked: false,
    },
    {
      id: 3,
      question: "Do you want to enable custom greetings on your website?",
      options: [
        "Greeting for all users",
        "Greeting for new users only",
        "Greeting for premium users only",
        "No custom greetings",
      ],
      answer: "",
      isChecked: false,
    },
  ]);

  const handleDropdownChange = (id, selectedOption) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, answer: selectedOption } : q
      )
    );
  };

  const handleSubmit = () => {
    console.log("Form Submitted!");
    console.log(questions); // Log all selected answers for debugging or processing
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <h2>Automations</h2> */}

      {/* Dropdown for working hours */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="working-hours" style={{marginLeft:10}}><b>Set Working Hours:</b> </label>
        <select
          id="working-hours"
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          style={{ width: "200px", padding: "5px" }}
        >
          <option value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</option>
          <option value="10:00 AM - 6:00 PM">10:00 AM - 6:00 PM</option>
          <option value="11:00 AM - 7:00 PM">11:00 AM - 7:00 PM</option>
          <option value="12:00 PM - 8:00 PM">12:00 PM - 8:00 PM</option>
        </select>
      </div>

      {/* Questions with answers as dropdowns */}
      <div>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
            //   border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id={`checkbox-${q.id}`}
                checked={q.isChecked}
                onChange={() => {
                  setQuestions((prevQuestions) =>
                    prevQuestions.map((question) =>
                      question.id === q.id
                        ? { ...question, isChecked: !question.isChecked }
                        : question
                    )
                  );
                }}
                style={{ marginRight: "10px" }}
              />
              <label htmlFor={`checkbox-${q.id}`} style={{ fontWeight: "bold" }}>
                {q.question}
              </label>
            </div>
            <select
              value={q.answer}
              onChange={(e) => handleDropdownChange(q.id, e.target.value)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "5px",
                maxWidth: "300px", // Reduced width for dropdown
              }}
            >
              <option value="">Select an option</option>
              {q.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft:'80%'
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Automations;
