import React, { useState, useRef } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import { read, utils } from "xlsx";

const Campaignsms = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    displayName: "",
    address: "",
    countryName: "",
    companyName: "",
  });

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      displayName: "",
      address: "",
      countryName: "",
      companyName: "",
      campaignName: "",
      campaignFrom: "",
      sendDate: "",
      description: "",
    });
    setContactsFile(null);
    setContactsData([]);
    setErrorMessage("");
    setErrors({});
  };
  

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

// Missing state declarations added
  const [contactsFile, setContactsFile] = useState(null);
  const [contactsData, setContactsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dateInputRef = useRef(null);
  const handleClick = () => {
    if (dateInputRef.current?.showPicker) {
      dateInputRef.current.showPicker();
    } else {
      dateInputRef.current.focus();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, sendDate: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (file.size > maxSize) {
      setErrorMessage('Contacts file size exceeds 10MB limit');
      setContactsFile(null);
      setContactsData([]);
      return;
    }

    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid CSV or Excel (.xlsx) file');
      setContactsFile(null);
      setContactsData([]);
      return;
    }

    try {
      const requiredColumns = ['id', 'name', 'phone number'];
      let headers = [];
      let fullData = [];

      if (file.type === 'text/csv') {
        const text = await file.text();
        const result = Papa.parse(text, { preview: 1, header: true });
        headers = Object.keys(result.data[0] || {}).map(h => h.trim());
        fullData = Papa.parse(text, { header: true }).data;
      } else {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = read(arrayBuffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        headers = (utils.sheet_to_json(sheet, { header: 1 })[0] || []).map(h => String(h).trim());
        fullData = utils.sheet_to_json(sheet);
      }

      const isValid = requiredColumns.every(col => headers.includes(col));
      if (!isValid) {
        setErrorMessage(`Invalid contacts file format. Required columns: ${requiredColumns.join(', ')}. Found: ${headers.join(', ')}`);
        setContactsFile(null);
        setContactsData([]);
        return;
      }

      setErrorMessage('');
      setContactsFile(file);
      setContactsData(fullData);
    } catch (err) {
      setErrorMessage('Error reading contacts file: ' + err.message);
      setContactsFile(null);
      setContactsData([]);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    } else if (
      ["firstName", "lastName", "displayName", "address", "countryName", "companyName"].includes(name)
    ) {
      if (!/^[a-zA-Z ]*$/.test(value)) return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaves = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("campaignName", formData.campaignName);
    formDataToSend.append("campaignFrom", formData.campaignFrom);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("sendDate", formData.sendDate);
    formDataToSend.append("contactsFile", contactsFile); 
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/smsmarketing/contactsms`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 201) {
        alert("Campaign saved successfully!");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Failed to save campaign:", error);
      alert("Error saving campaign");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/smsmarketing/Automationssms");
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/smsmarketing/Campaignsms");
  };

  const handleSave = async () => {
    let newErrors = {};

    if (formData.firstName.length < 2) newErrors.firstName = "First Name must be at least 2 characters.";
    if (formData.lastName.length < 2) newErrors.lastName = "Last Name must be at least 2 characters.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (formData.phoneNumber.length !== 10) newErrors.phoneNumber = "Phone Number must be exactly 10 digits.";
    if (formData.displayName.length < 2) newErrors.displayName = "Display Name must be at least 2 characters.";
    if (formData.address.length < 2) newErrors.address = "Address must be at least 2 characters.";
    if (formData.countryName.length < 2) newErrors.countryName = "Country Name must be at least 2 characters.";
    if (formData.companyName.length < 2) newErrors.companyName = "Company Name must be at least 2 characters.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/smsmarketing/campaignsms`, formData);
        console.log("Saved successfully:", res.data);
        setIsSubmitted(true);
      } catch (err) {
        console.error("Error saving campaign:", err);
        alert("Failed to save campaign. Please check console.");
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#EAF6FE', padding: 5 }}>
      <div className="container mt-4">
        {isSubmitted ? (
          <>
            <h2>Create a Campaign</h2>
            <div className="container-fluid p-5" style={{ borderRadius: '8px', backgroundColor: 'white' }}>
              <h2>Campaign Information</h2>
              <div className="row mt-4">
                <div className="col-md-8">
                  <div className="d-flex flex-wrap gap-4">
                    {/* Campaign Name */}
                    <div className="d-flex flex-column col-4">
                      <Form.Group>
                        <Form.Label>CAMPAIGN PAGE NAME</Form.Label>
                        <Form.Control
                          type="text"
                          name="campaignName"
                          value={formData.campaignName}
                          onChange={handleInputChange}
                          placeholder="Enter campaign page name"
                          style={{ backgroundColor: '#B7E0FF' }}
                        />
                      </Form.Group>
                    </div>

                    {/* Campaign From */}
                    <div className="d-flex flex-column col-4">
                      <Form.Group>
                        <Form.Label>CAMPAIGN FROM</Form.Label>
                        <Form.Control
                          type="text"
                          name="campaignFrom"
                          value={formData.campaignFrom}
                          onChange={handleInputChange}
                          placeholder="Enter campaign from"
                          style={{ backgroundColor: '#B7E0FF' }}
                        />
                      </Form.Group>
                    </div>

                    {/* Contact List */}
                    <div className="d-flex flex-column col-4">
                    <Form.Group>
                      <Form.Label>CONTACT LIST</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".csv, .xlsx"
                        onChange={handleFileChange}
                        style={{ backgroundColor: "#B7E0FF" }}
                      />
                      {errorMessage && <small className="text-danger">{errorMessage}</small>}
                    </Form.Group>
                    </div>

                    {/* Send Date */}
                    <div className="d-flex flex-column col-6" onClick={handleClick} style={{ cursor: "pointer" }}>
                    <Form.Group>
                      <Form.Label>SEND CAMPAIGN ON</Form.Label>
                      <Form.Control
                        type="date"
                        name="sendDate"
                        value={formData.sendDate}
                        onChange={handleChange}
                        ref={dateInputRef}
                        style={{ backgroundColor: "#B7E0FF", width: 230, pointerEvents: "none" }}
                      />
                    </Form.Group>
                    </div>

                    {/* Description */}
                    <Form.Group>
                      <Form.Label>DESCRIPTION VIEW</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter description"
                        rows={3}
                        style={{ backgroundColor: '#B7E0FF', width: 480 }}
                      />
                    </Form.Group>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex justify-content-start mt-4 gap-3">
                <Button
                  variant="secondary border-dark"
                  onClick={handleCancel}
                  style={{ backgroundColor: 'white', color: 'black', width: 100 }}
                >
                  Cancel
                </Button>
                    <Button
                      variant="primary"
                      onClick={handleSaves}
                      style={{ backgroundColor: '#0070C0', color: 'white', width: 100 }}
                    >
                      Save
                    </Button>
                  </div>
                </div>

                {/* Modal */}
                <Modal show={showModal}  centered>
                  <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Trishoka Connect</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Your campaign has been successfully launched.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Done
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Preview Section */}
                <div
                  className="col-md-4"
                  style={{
                    padding: '20px',
                    backgroundColor: '#B7E0FF',
                    borderRadius: '8px',
                    color: 'black',
                    height: '400px',
                    overflowY: 'auto'
                  }}
                >
                  <h2>Preview</h2>
                  <p><strong>Campaign Name:</strong> {formData.campaignName}</p>
                  <p><strong>Campaign From:</strong> {formData.campaignFrom}</p>
                  <p><strong>Contact List:</strong> {contactsFile ? contactsFile.name : "No file uploaded"}</p>
                  <p><strong>Send Date:</strong> {formData.sendDate}</p>

                  <div
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                      width: '100%'
                    }}
                  >
                    <p style={{ backgroundColor: '#0070C0', padding: 10, borderRadius: 19, color: 'white' }}>
                      {formData.description}
                    </p>
                    {/* {contactsData.length > 0 && (
    <>
      <hr />
      <h5>Contacts Preview</h5>
      <div style={{ maxHeight: "150px", overflowY: "auto" }}>
        <table className="table table-sm table-bordered bg-white">
          <thead>
            <tr>
              {Object.keys(contactsData[0]).map((key, index) => (
                <th key={index} style={{ fontSize: "0.8rem" }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contactsData.slice(0, 5).map((contact, index) => (
              <tr key={index}>
                {Object.values(contact).map((value, i) => (
                  <td key={i} style={{ fontSize: "0.8rem" }}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: "0.8rem" }}><em>Showing first 5 contacts</em></p>
      </div>
    </>
  )} */}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-between">
            <div
              className="d-flex"
              style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "100%" }}
            >
              <div style={{ flex: 1, marginRight: "10px" }}>
                <h2>Contact Information</h2>
                <Form>
                  <Row className="mb-3">
                    {[
                      { label: "First Name", name: "firstName" },
                      { label: "Last Name", name: "lastName" },
                      { label: "Email", name: "email", type: "email" },
                      { label: "Phone Number", name: "phoneNumber" },
                    ].map(({ label, name, type = "text" }) => (
                      <Col sm={12} className="mb-2" key={name}>
                        <Form.Group>
                          <Form.Label>{label}</Form.Label>
                          <Form.Control
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            style={{ backgroundColor: "#B7E0FF" }}
                          />
                          {errors[name] && <small className="text-danger">{errors[name]}</small>}
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                </Form>
                <div className="d-flex justify-content-start mt-4 gap-3">
                  <Button variant="secondary border-dark" style={{ backgroundColor: 'white', color: 'black', width: 100 }}>Cancel</Button>
                  <Button variant="primary" onClick={handleSave} style={{ backgroundColor: '#0070C0', color: 'white', width: 100 }}>Save</Button>
                </div>
              </div>

              <div style={{ flex: 1, marginRight: "10px", marginTop: 45 }}>
                <Form>
                  <Row className="mb-3">
                    {[
                      { label: "Display Name", name: "displayName" },
                      { label: "Address", name: "address" },
                      { label: "Country Name", name: "countryName" },
                      { label: "Company Name", name: "companyName" },
                    ].map(({ label, name }) => (
                      <Col sm={12} className="mb-2" key={name}>
                        <Form.Group>
                          <Form.Label>{label}</Form.Label>
                          <Form.Control
                            type="text"
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            style={{ backgroundColor: "#B7E0FF" }}
                          />
                          {errors[name] && <small className="text-danger">{errors[name]}</small>}
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                </Form>
              </div>

              <div style={{ flex: 1, padding: "20px", backgroundColor: "#B7E0FF", borderRadius: "8px", color: "black" }}>
                <h5>Description Information</h5>
                {Object.entries(formData).map(([key, value]) => (
                  <p key={key}><strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaignsms;