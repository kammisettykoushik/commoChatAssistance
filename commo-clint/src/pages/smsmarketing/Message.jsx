import React, { useState } from "react";
import { FaPaperPlane, FaFile, FaInfoCircle } from "react-icons/fa";
import { TagCross } from "iconsax-react";
// Helper function to calculate the time difference
const timeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const contactsData = [
  { id: 1, name: "Sneha", status: "Online", date: "2025-01-15", unreadMessages: 3, messages: [{ text: "Hello!", date: "2025-03-20T08:00:00" }], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" },
  { id: 2, name: "Suresh", status: "Offline", date: "2025-01-14", unreadMessages: 1, messages: [{ text: "Hey there!", date: "2025-03-20T09:00:00" }], image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg" },
  { id: 3, name: "Meghana", status: "Online", date: "2025-01-13", unreadMessages: 0, messages: [{ text: "Good morning!", date: "2025-03-19T07:00:00" }], image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=" },
  { id: 4, name: "John", status: "Offline", date: "2025-01-12", unreadMessages: 2, messages: [{ text: "Meeting at 10?", date: "2025-03-18T08:30:00" }], image: "https://images.unsplash.com/photo-1524504381405-cc35f6c1d935" },
  { id: 5, name: "Ravi", status: "Online", date: "2025-01-11", unreadMessages: 0, messages: [{ text: "What’s up?", date: "2025-03-20T08:10:00" }], image: "https://images.unsplash.com/photo-1548094384-e529f8265c6d" },
  { id: 6, name: "Priya", status: "Offline", date: "2025-01-10", unreadMessages: 1, messages: [{ text: "Let’s talk later", date: "2025-03-20T09:30:00" }], image: "https://images.unsplash.com/photo-1599780767804-d87b29021138" },
  { id: 7, name: "Ashok", status: "Online", date: "2025-01-09", unreadMessages: 5, messages: [{ text: "I’ll call you back", date: "2025-03-20T09:40:00" }], image: "https://images.unsplash.com/photo-1516912984124-5359d8b7278b" },
];

const Message = () => {
  const [selectedContact, setSelectedContact] = useState(null); // Initially no contact selected
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // For showing profile details in the modal
  const [searchTerm, setSearchTerm] = useState("");

  const handleContactClick = (contact) => {
    setSelectedContact(contact); // Select the contact and show their chat
    setMessage("");
    setShowDetails(false); // Reset profile details view when switching contacts
  };

  const handleSendMessage = () => {
    if (message || selectedFiles.length > 0) {
      const newMessages = [
        ...selectedContact.messages,
        { text: message, sender: "me", files: selectedFiles, date: new Date() },
      ];
      setSelectedContact({ ...selectedContact, messages: newMessages });
      setMessage("");
      setSelectedFiles([]);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const filteredContacts = contactsData.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex" style={{ height: "100vh", backgroundColor: "#EAF6FE",padding:30,margin:20}}>
      {/* Contact List */}
      <div className="col-3 p-3" style={{ overflowY: "auto", borderRight: "1px solid #ddd",backgroundColor:'white' ,borderRadius:28}}>
        <h3>Contacts</h3>
        {/* Search Bar */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search Contacts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="list-group">
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className="list-group-item d-flex align-items-center"
              style={selectedContact?.id === contact.id ? { backgroundColor: "#29377d", color: "white" } : {}}
              onClick={() => handleContactClick(contact)}
            >
              <img
                src={contact.image}
                alt={contact.name}
                className="rounded-circle me-2"
                style={{ width: "40px", height: "40px" }}
              />
              <div className="d-flex flex-column">
                <span>{contact.name}</span>
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  {contact.messages.length > 0
                    ? `Last message: ${contact.messages[contact.messages.length - 1].text} - ${timeAgo(contact.messages[contact.messages.length - 1].date)}`
                    : "No messages yet"}
                </span>
              </div>
              {contact.unreadMessages > 0 && (
                <span className="badge bg-danger ms-auto">{contact.unreadMessages}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box */}
      <div className="col-9 p-0 d-flex flex-column" style={{ backgroundColor: "#f8f9fa" }}>
        {selectedContact ? (
          <>
            <div className="p-3 text-white d-flex align-items-center" style={{ backgroundColor: '#6fed6d' }}>
              <img
                src={selectedContact.image}
                alt={selectedContact.name}
                className="rounded-circle me-2"
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <h5 className="mb-0">{selectedContact.name}</h5>
                <small className="ms-2">{timeAgo(selectedContact.messages[selectedContact.messages.length - 1]?.date)}</small>
              </div>
              {/* Profile Details Button */}
              <button
                className="btn btn-outline-light ms-auto"
                onClick={() => setShowDetails(!showDetails)}
              >
                <FaInfoCircle />
              </button>
            </div>

            <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>
              {selectedContact.messages.length === 0 ? (
                <div className="text-center text-muted">No messages yet.</div>
              ) : (
                selectedContact.messages.map((msg, index) => (
                  <div key={index}>
                    {msg.text && (
                      <p className="text-end bg-success text-white p-2 rounded w-50 ms-auto">{msg.text}</p>
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
              <button className="btn btn-light me-2" onClick={() => document.getElementById("fileInput").click()}>
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
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
            <p className="text-muted">Select a contact to start chatting</p>
          </div>
        )}
      </div>

      {/* Hidden File Input for Importing Documents */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />

      {/* Profile Details Modal */}
      {showDetails && selectedContact && (
        <div className="modal show" style={{ display: "block", position: "absolute", top: "0", left: "0", right: "0", bottom: "0", zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={() => setShowDetails(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()} style={{marginLeft:'70%',width:350}}>
            <div className="modal-content" >
              <div className="modal-header">
                <h5 className="modal-title">Profile Details</h5>
                {/* <button type="button" className="close" onClick={() => setShowDetails(false)} style={{marginLeft:'60%'}}>&times;</button> */}
                <TagCross size="32" color="#FF8A65" className="close" onClick={() => setShowDetails(false)} style={{marginLeft:'50%'}}/>
              </div>
              <div className="modal-body">
                <img
                  src={selectedContact.image}
                  alt={selectedContact.name}
                  className="rounded-circle me-2 mb-3"
                  style={{ width: "80px", height: "80px" }}
                />
                <h5>{selectedContact.name}</h5>
                <p><strong>Location:</strong> Not available</p>
                <p><strong>Status:</strong> {selectedContact.status}</p>
                <button className="btn btn-sm btn-primary">Request Location</button>
                <button className="btn btn-sm btn-secondary ms-2">Share Location</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;


