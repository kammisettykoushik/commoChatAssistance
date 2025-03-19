import React, { useState } from "react";
import { Card, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaUpload, FaDownload } from "react-icons/fa";

const CampaignsScreen = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignFrom, setCampaignFrom] = useState("");
  const [contactList, setContactList] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

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

  const handleCreate = () => {
    if (!campaignName || !campaignFrom || !contactList || !sendDate) {
      alert("Please fill all fields before creating the campaign.");
      return;
    }
    console.log("Campaign Created:", {
      campaignName,
      campaignFrom,
      contactList,
      sendDate,
      audioFile,
      excelFile,
    });
  };

  return (
    <div className="d-flex justify-content-center p-4">
      <Card className="w-50 p-4 shadow" style={{backgroundColor:'#CECEFF'}}>
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
                  {/* <Form.Control 
                    type="text" 
                    value={contactList} 
                    onChange={(e) => setContactList(e.target.value)} 
                    placeholder="Enter contact list" 
                  /> */}
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
                <Form.Group>
                  <Form.Label>Send Campaign On</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={sendDate} 
                    onChange={(e) => setSendDate(e.target.value)} 
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
              <Button variant="secondary" className="me-2" onClick={() => alert("Campaign creation canceled.")}>Cancel</Button>
              <Button variant="primary" onClick={handleCreate}>Create</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CampaignsScreen;
