import React, { useState } from "react";
const Automations = () => {
  const [workingHours, setWorkingHours] = useState("9:00 AM - 5:00 PM");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Do you want to enable auto-replies during non-working hours?",
      options: [
        "Text",
        "Image",
        "Chat Box",
        "Template",
        "Sticker"
      ],
      answer: "",
      isChecked: false,
    },
    {
      id: 2,
      question: "Should notifications be turned off during working hours?",
      options: [
        "Text",
        "Image",
        "Chat Box",
        "Template",
        "Sticker"
      ],
      answer: "",
      isChecked: false,
    },
    {
      id: 3,
      question: "Do you want to enable custom greetings on your website?",
      options: [
        "Text",
        "Image",
        "Chat Box",
        "Template",
        "Sticker"
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
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleSubmit = () => {
    console.log("Form Submitted!");
    console.log(questions);
  };

  return (
    <div style={{ padding: "20px",backgroundColor:'#FFF8EF'}}>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="working-hours" style={{ marginLeft: 10 }}>
          <b>Current Working Hours:</b>
        </label>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button onClick={toggleDropdown} style={{ backgroundColor: '#4b8bf2', padding: 5, color: 'white', border: 'none', borderRadius: 5, marginLeft: 10 }}>Set Working Hours</button>
          {isDropdownVisible && (
            <div
              style={{
                position: 'absolute',
                backgroundColor: '#f9f9f9',
                minWidth: '160px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                zIndex: 1,
                marginTop: '10px',
              }}
            >
              <div style={{ padding: 10 }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <label htmlFor="day" style={{ marginRight: '10px' }}><b>Day:</b></label>
                  <input type="text" id="day" />
                </div>

                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <label htmlFor="time" style={{ marginRight: '10px' }}><b>Time:</b></label>
                  <input type="text" id="time" />
                </div>
              </div>

            </div>
          )}
        </div>
      </div>


      <div>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
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
                maxWidth: "300px",
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


      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#549149",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: '80%'
          }}
        >
          Save chnages
        </button>
      </div>
    </div>
  );
};

export default Automations;




