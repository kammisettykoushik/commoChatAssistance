import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Add this import for useNavigate
import { FaPaperPlane, FaFile, FaShareAlt, FaUpload, FaDownload, FaTimes, FaSearch } from "react-icons/fa";

const contactsData = [
  { id: 1, name: "Sneha", status: "Online", date: "2025-01-15", unreadMessages: 3, messages: [], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" },
  { id: 2, name: "John", status: "Offline", date: "2025-01-14", unreadMessages: 1, messages: [], image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg" },
  { id: 3, name: "Alice", status: "Online", date: "2025-01-13", unreadMessages: 0, messages: [], image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=" },
];

const TeamInbox = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const navigate = useNavigate();  // useNavigate is now defined

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setMessage("");
    setShowProfile(false);
    setShowDocuments(false);
  };

  const handleSendMessage = () => {
    if (message || selectedFiles.length > 0) {
      const newMessages = [
        ...selectedContact.messages,
        { text: message, sender: "me", files: selectedFiles },
      ];
      setSelectedContact({ ...selectedContact, messages: newMessages });
      setMessage("");
      setSelectedFiles([]);
      setFileUrls([]);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    // Generate object URLs for each selected file to display them in the chat
    const urls = files.map((file) => URL.createObjectURL(file));
    setFileUrls(urls);
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh", backgroundColor: "#f0f0f0" }}>
      <div className="d-flex justify-content-between p-3" style={{ backgroundColor: '#29377d' }}>
        <div className="input-group w-50">
          <span className="input-group-text"><FaSearch /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-light me-2" onClick={() => document.getElementById("fileInput").click()}><FaUpload /> Import</button>
          <button className="btn btn-light"><FaDownload /> Export</button>
        </div>
      </div>

      {/* Hidden File Input for Import and Uploading Documents */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />

      {selectedContact ? (
        <div className="d-flex" style={{ height: "90vh" }}>
          <div className="col-3 bg-light p-3" style={{ overflowY: "scroll", borderRight: "1px solid #ddd" }}>
            <h3>Contacts</h3>
            <ul className="list-group">
              {contactsData.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase())).map((contact) => (
                <li
                  key={contact.id}
                  className="list-group-item d-flex align-items-center"
                  style={selectedContact?.id === contact.id ? { backgroundColor: "#29377d", color: "white" } : {}}
                  onClick={() => handleContactClick(contact)}
                >
                  <img src={contact.image} alt={contact.name} className="rounded-circle me-2" style={{ width: "40px", height: "40px" }} />
                  <div className="d-flex flex-column">
                    <span>{contact.name}</span>
                    <span className={`text-${contact.status === "Online" ? "success" : "success"}`} style={{ fontSize: "12px" }}>
                      {contact.status} | {contact.date}
                    </span>
                  </div>
                  {contact.unreadMessages > 0 && (
                    <span className="badge bg-danger ms-auto">{contact.unreadMessages}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={`col-${showProfile ? "6" : "9"} p-0 d-flex flex-column`} style={{ backgroundColor: "#f8f9fa" }}>
            <div className="p-3 text-white d-flex align-items-center" style={{ backgroundColor: '#6fed6d' }}>
              <img src={selectedContact.image} alt={selectedContact.name} className="rounded-circle me-2" style={{ width: "50px", height: "50px" }} onClick={() => setShowProfile(!showProfile)} />
              <div>
                <h5 className="mb-0">{selectedContact.name}</h5>
                <small className="ms-2">{selectedContact.status}</small>
              </div>
            </div>

            <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>
              {selectedContact.messages.length === 0 ? (
                <div className="text-center text-muted">No messages yet.</div>
              ) : (
                selectedContact.messages.map((msg, index) => (
                  <div key={index}>
                    {msg.text && (
                      <p className="text-end bg-success text-white p-2 rounded w-50 ms-auto">
                        {msg.text}
                      </p>
                    )}
                    {msg.files && msg.files.length > 0 && (
                      <div className="text-end">
                        {msg.files.map((file, i) => (
                          <span key={i} className="d-block text-white">
                            <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                              {file.name}
                            </a>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="d-flex align-items-center p-3 bg-white">
              <button
                className="btn btn-light me-2"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <FaFile />
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="btn btn-primary ms-2" onClick={handleSendMessage}>
                <FaPaperPlane />
              </button>
              {/* <button className="btn btn-secondary ms-2"><FaShareAlt /></button> */}
            </div>
          </div>

          {showProfile && (
            <div className="col-3 bg-white p-3 border-start" style={{ overflowY: "auto" }}>
              <button className="btn btn-light mb-2" onClick={() => setShowProfile(false)}><FaTimes /></button>
              <img src={selectedContact.image} alt={selectedContact.name} className="rounded-circle mb-3" style={{ width: "100px", height: "100px" }} />
              <h5>{selectedContact.name}</h5>
              <p>Status: {selectedContact.status}</p>
              <p>Last seen: {selectedContact.date}</p>
            </div>
          )}
        </div>
      ) : (
        <div
          className="col-12 d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "85vh",
            // width: "100vw",
            marginTop:10,
            backgroundColor:'#FFF8EF',
            padding:10,
            backgroundImage: "url('https://img.freepik.com/free-vector/chat-concept-illustration_114360-129.jpg?t=st=1738320425~exp=1738324025~hmac=d9e82fc2f47710b8f3ff074a40be363c89cacf44ed6d2114282fafff8d382ad4&w=740')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center"
          }}
        >
          <button className="btn btn-success p-3" onClick={() => handleContactClick(contactsData[0])}>
            Select a Contact to Start
          </button>
        </div>

      )}
    </div>
  );
};

export default TeamInbox;
