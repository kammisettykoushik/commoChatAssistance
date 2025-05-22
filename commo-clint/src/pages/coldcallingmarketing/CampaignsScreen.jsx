import React, { useState, useRef } from "react";
import { Card, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaUpload, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const CampaignsScreen = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignFrom, setCampaignFrom] = useState("");
  const [contactList, setContactList] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

  const dateInputRef = useRef(null); // Date input ref

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setAudioFile(event.target.files[0]);
    }
  };

  const handleExcelUpload = (event) => {
    if (event.target.files.length > 0) {
      setExcelFile(event.target.files[0]);
    }
  };

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!campaignName || !campaignFrom || !sendDate || !excelFile || !audioFile) {
      alert("Please fill all fields before creating the campaign.");
      return;
    }
  
    const formData = new FormData();
    formData.append("campaignName", campaignName);
    formData.append("campaignFrom", campaignFrom);
    formData.append("sendDate", sendDate);
    formData.append("audioFile", audioFile);
    formData.append("contactListFile", excelFile);
  
    try {
      const response = await fetch("http://localhost:3001/api/coldcallingmarketing/campaignscreens", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) {
        // console.error("Error response from server:", data);
        alert(`Failed to create campaign: ${data.message || 'Unknown error'}`);
      } else {
        alert("Campaign created successfully!");
        console.log(data);
  
        // Reset form fields
        setCampaignName("");
        setCampaignFrom("");
        setContactList("");
        setSendDate("");
        setAudioFile(null);
        setExcelFile(null);
        navigate("/Coldcallingmarketing/History");
      }
    } catch (error) {
      console.error("Error in fetch:", error);
      alert("Error creating campaign: " + error.message);
    }
  };
  
  return (
    <div className="d-flex justify-content-center p-4">
      <Card className="w-50 p-4 shadow">
        <Card.Header>
          <h4>Campaign Information</h4>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={campaignName} 
                    onChange={(e) => setCampaignName(e.target.value)} 
                    placeholder="Enter campaign name" 
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Campaign From</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={campaignFrom} 
                    onChange={(e) => setCampaignFrom(e.target.value)} 
                    placeholder="Enter sender name" 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Contact List</Form.Label>
                  <InputGroup className="mt-2">
                    <InputGroup.Text>
                      <FaUpload />
                    </InputGroup.Text>
                    <Form.Control type="file" accept=".xls,.xlsx" onChange={handleExcelUpload} />
                  </InputGroup>
                  {excelFile && (
                    <div className="mt-2">
                      <a href={URL.createObjectURL(excelFile)} download={excelFile.name} className="btn btn-link">
                        <FaDownload /> Download File
                      </a>
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  onClick={() => {
                    if (dateInputRef.current) {
                      dateInputRef.current.showPicker?.();
                      dateInputRef.current.focus();
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Form.Label>Send Campaign On</Form.Label>
                  <Form.Control
                    type="date"
                    value={sendDate}
                    onChange={(e) => setSendDate(e.target.value)}
                    ref={dateInputRef}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Upload Audio File</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUpload />
                    </InputGroup.Text>
                    <Form.Control type="file" accept="audio/*" onChange={handleFileUpload} />
                  </InputGroup>
                  {audioFile && (
                    <div className="mt-2">
                      <a href={URL.createObjectURL(audioFile)} download={audioFile.name} className="btn btn-link">
                        <FaDownload /> Download File
                      </a>
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" className="me-2" onClick={() => alert("Campaign creation canceled.")}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                Create
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CampaignsScreen;
