import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaperPlane, FaFile } from "react-icons/fa"; // Send and Document icons

const contactsData = [
  { id: 1, name: "Sneha", status: "Online", date: "2025-01-15", unreadMessages: 3, messages: ["Hello!", "How are you?"] },
  { id: 2, name: "John", status: "Offline", date: "2025-01-14", unreadMessages: 1, messages: ["Hi!", "What’s up?"] },
  { id: 3, name: "Alice", status: "Online", date: "2025-01-13", unreadMessages: 0, messages: ["Good morning!", "Let's meet later."] },
  { id: 4, name: "Vrushvuni", status: "Online", date: "2025-01-13", unreadMessages: 0, messages: ["Good morning!", "Let's meet later."] },
  { id: 5, name: "Hari", status: "Online", date: "2025-01-13", unreadMessages: 0, messages: ["Good morning!", "Let's meet later."] },
];

const TeamInbox = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setMessage("");
  };

  const handleSendMessage = () => {
    if (message) {
      const newMessages = [...selectedContact.messages, message];
      const updatedContact = { ...selectedContact, messages: newMessages };
      setSelectedContact(updatedContact);
      setMessage("");
    }
  };

  const filteredContacts = contactsData.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDocumentClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
      // You can add further handling logic, such as uploading the file.
    }
  };

  const handleNavigateToSavedPost = () => {
    navigate("/whatsappmarketing/Templates/SavedPreview");
  };

  return (
    <div className="d-flex" style={{ height: "100vh", marginBottom: 30 }}>
      <div className="col-3 bg-light p-3" style={{ height: "100vh", overflowY: "scroll", borderRight: "1px solid #ddd" }}>
        <h3>Contacts</h3>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul className="list-group">
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                selectedContact?.id === contact.id ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleContactClick(contact)}
              style={{ borderBottom: "1px solid #ddd", padding: "15px 10px" }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#39cc6b",
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h6>{contact.name}</h6>
                  <div className="d-flex align-items-center">
                    <small>{contact.date}</small>
                    {contact.unreadMessages > 0 && (
                      <div
                        className="rounded-circle text-white d-flex justify-content-center align-items-center"
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#12428a",
                          fontSize: "12px",
                          marginLeft: "10px",
                        }}
                      >
                        {contact.unreadMessages}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-9 p-0" style={{ backgroundColor: "#96f2b5", height: "100vh", display: "flex", flexDirection: "column" }}>
        {selectedContact ? (
          <>
            <div className="p-3 text-white" style={{ backgroundColor: "#12428a" }}>
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#39cc6b",
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <h5 className="mb-0">{selectedContact.name}</h5>
                  <small>{selectedContact.status}</small>
                </div>
              </div>
            </div>

            <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>
              {selectedContact.messages.length === 0 ? (
                <div className="text-center" style={{ color: "#aaa" }}>
                  <p>No messages yet.</p>
                </div>
              ) : (
                selectedContact.messages.map((msg, index) => (
                  <div key={index} className="p-2">
                    <p>{msg}</p>
                  </div>
                ))
              )}
            </div>

            <div className="d-flex align-items-center p-3" style={{ backgroundColor: "#fff" }}>
              <button
                className="btn btn-light"
                onClick={handleNavigateToSavedPost}
                style={{
                  marginRight: "10px",
                  backgroundColor: "skyblue",
                  color: "black",
                  borderRadius: "10px",
                  width: "20%",
                }}
              >
                Select Template
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="btn btn-secondary" onClick={handleDocumentClick} style={{ marginLeft: "10px" }}>
                <FaFile size={20} />
              </button>
              <button className="btn btn-primary" onClick={handleSendMessage} style={{ marginLeft: "10px" }}>
                <FaPaperPlane size={20} />
              </button>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </>
        ) : (
          <div className="text-center" style={{ color: "#aaa", paddingTop: "20%" }}>
            <p>Select a contact to start a chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamInbox;
