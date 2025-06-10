import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';
import { read, utils } from 'xlsx';
import { Modal, Button, InputGroup, Dropdown, DropdownButton, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Preview = () => {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('');
  const [category, setCategory] = useState(''); // Optional
  const [header, setHeader] = useState('');
  const [mediaType, setMediaType] = useState('Image');
  const [mediaFile, setMediaFile] = useState(null);
  const [body, setBody] = useState('');
  const [footer, setFooter] = useState('');
  const [mediaShape, setMediaShape] = useState('Square');
  const [contactsFile, setContactsFile] = useState(null);
  const [contactsData, setContactsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAutomations, setShowAutomations] = useState(false);
  const [isImmediately, setIsImmediately] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [immediatelyDate, setImmediatelyDate] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [immediatelyTime, setImmediatelyTime] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isImmediately) {
      const today = new Date().toISOString().split('T')[0];
      setImmediatelyDate(today);
    }
  }, [isImmediately]);

  const handleMediaFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const validVideoTypes = ['video/mp4'];

    if (file.size > maxSize) {
      setErrorMessage('Media file size exceeds 5MB limit');
      setMediaFile(null);
      return;
    }

    if (mediaType === 'Image' && !validImageTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (JPEG, PNG)');
      setMediaFile(null);
      return;
    }

    if (mediaType === 'Video' && !validVideoTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid video file (MP4)');
      setMediaFile(null);
      return;
    }

    setErrorMessage('');
    setMediaFile(file);
  };

  const handleContactsFileChange = async (e) => {
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
        headers = Object.keys(result.data[0] || {}).map((h) => h.trim());
        fullData = Papa.parse(text, { header: true }).data;
      } else {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = read(arrayBuffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        headers = (utils.sheet_to_json(sheet, { header: 1 })[0] || []).map((h) => String(h).trim());
        fullData = utils.sheet_to_json(sheet);
      }

      const isValid = requiredColumns.every((col) => headers.includes(col));
      if (!isValid) {
        setErrorMessage(
          `Invalid contacts file format. Required columns: ${requiredColumns.join(', ')}. Found: ${headers.join(', ')}`
        );
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

  const handleSave = () => {
    if (!templateName || !body) {
      setErrorMessage('Template name and body are required');
      return;
    }

    if ((mediaFile || contactsFile) && errorMessage) {
      setErrorMessage('Please fix file errors before saving');
      return;
    }

    setShowAutomations(true);
  };

  const handleAutomationSave = async () => {
    if (!isImmediately && (!scheduleDate || !scheduleTime)) {
      alert('Please select a date and time before saving.');
      return;
    }

    const formData = new FormData();
    formData.append('templateName', templateName);
    formData.append('category', category);
    formData.append('header', header);
    formData.append('mediaType', mediaType);
    if (mediaFile) formData.append('mediaFile', mediaFile);
    formData.append('body', body);
    formData.append('footer', footer);
    formData.append('mediaShape', mediaShape);
    if (contactsFile) formData.append('contactsFile', contactsFile);
    formData.append('automation', JSON.stringify({
      isImmediately,
      immediatelyDate: isImmediately ? immediatelyDate : null,
      immediatelyTime: isImmediately ? immediatelyTime : null,
      scheduleDate: isSchedule ? scheduleDate : null,
      scheduleTime: isSchedule ? scheduleTime : null,
    }));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates`, formData,
        {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowAutomations(false);
      navigate('/whatsappmarketing/Templates/SavedPreview');
    } catch (error) {
      console.error('Error saving template with automation:', error);
      alert('Failed to save template: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleImmediatelyTimeChange = (time) => setImmediatelyTime(time);
  const handleScheduleDateChange = (e) => setScheduleDate(e.target.value);
  const handleScheduleTimeChange = (time) => setScheduleTime(time);

  const getMediaShapeStyle = () => {
    switch (mediaShape) {
      case 'Round': return { borderRadius: '50%' };
      case 'Oval': return { borderRadius: '50% / 25%' };
      case 'Rounded': return { borderRadius: '15px' };
      case 'Semi-border': return { borderRadius: '0 50% 50% 0' };
      case 'Diamond': return { transform: 'rotate(45deg)', borderRadius: '10px' };
      default: return { borderRadius: '0' };
    }
  };

  return (
    <div className="container mt-4" style={{backgroundColor:'#FFF8EF'}}>
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6 d-flex flex-column justify-content-between border p-4" style={{ height: '100%' }}>
          <h2>Create Template</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: 10, marginTop: 30 }}>
            <div className="mb-3 d-flex flex-column w-100">
              <label className="form-label">Template Name</label>
              <input
                type="text"
                className="form-control"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
              />
            </div>
            <div className="mb-3 d-flex flex-column w-100">
              <label className="form-label">Category (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </div>
          </div>

          <div className="mb-3 d-flex flex-column w-100">
            <label className="form-label">Header (Optional)</label>
            <textarea
              className="form-control"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              placeholder="Enter header content"
            />
          </div>

          <div className="mb-3 d-flex flex-column w-100">
            <label className="form-label">Media</label>
            <select
              className="form-select"
              value={mediaType}
              onChange={(e) => {
                setMediaType(e.target.value);
                setMediaFile(null);
                setErrorMessage('');
                document.getElementById('mediaFileInput').value = '';
              }}
            >
              <option value="Image">Image</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <div className="mb-3 d-flex flex-column w-100">
            <label className="form-label">Upload Media</label>
            <input
              type="file"
              id="mediaFileInput"
              className="form-control"
              accept={mediaType === 'Image' ? 'image/jpeg,image/png' : 'video/mp4'}
              onChange={handleMediaFileChange}
            />
          </div>

          <div className="mb-3 d-flex flex-column w-100">
            <label className="form-label">Select Media Shape</label>
            <select
              className="form-select"
              value={mediaShape}
              onChange={(e) => setMediaShape(e.target.value)}
            >
              <option value="Square">Square</option>
              <option value="Round">Round</option>
              <option value="Oval">Oval</option>
              <option value="Rounded">Rounded</option>
              <option value="Semi-border">Semi-border</option>
              <option value="Diamond">Diamond</option>
            </select>
          </div>

          <div className="mb-3 d-flex flex-column w-100">
            <label htmlFor="contactsFile" className="form-label">Contacts (CSV or Excel)</label>
            <div className="border p-2 rounded">
              <input
                type="file"
                id="contactsFile"
                className="form-control"
                accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleContactsFileChange}
              />
            </div>
          </div>

          <div className="mb-3 d-flex flex-column w-100">
            <label className="form-label">Body</label>
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter body content"
            />
          </div>

          <div className="mb-3 d-flex flex-column w-100">
            <label className="form-label">Footer</label>
            <textarea
              className="form-control"
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
              placeholder="Enter footer content"
            />
          </div>

          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        </div>

        {/* Preview Section */}
        <div className="col-md-6 d-flex flex-column justify-content-between border p-4" style={{ height: '100%' }}>
          <h2>Preview</h2>
          <div className="card">
            <div className="card-header text-white" style={{ backgroundColor: '#388E3C' }}>
              <h4>{templateName || 'Template Name'}</h4>
              <p>{category || 'Category'}</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">{header || 'Header Content'}</h5>
              <div className="mb-3 text-center">
                {mediaFile && (
                  <div
                    style={{
                      width: '300px',
                      height: '300px',
                      overflow: 'hidden',
                      margin: '0 auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #ccc',
                      backgroundColor: 'gray',
                      ...getMediaShapeStyle(),
                    }}
                  >
                    {mediaType === 'Image' ? (
                      <img
                        src={URL.createObjectURL(mediaFile)}
                        alt="Preview"
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(mediaFile)}
                        controls
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    )}
                  </div>
                )}
              </div>
              {contactsFile && (
                <div className="mb-3">
                  <p>
                    <strong>Contacts File:</strong> {contactsFile.name} (
                    {contactsFile.type === 'text/csv' ? 'CSV' : 'Excel'})
                  </p>
                  {contactsData.length > 0 && (
                    <p>
                      <strong>Preview (First 3):</strong>{' '}
                      {contactsData.slice(0, 3).map((row, idx) => (
                        <span key={idx}>
                          {row['phone number']} {idx < 2 && contactsData.length > 1 ? ', ' : ''}
                        </span>
                      ))}
                      {contactsData.length > 3 && '...'}
                    </p>
                  )}
                </div>
              )}
              <p className="card-text">{body || 'Body Content'}</p>
            </div>
            <div className="card-footer text-muted">{footer || 'Footer Content'}</div>
          </div>
        </div>
      </div>

      {/* Automations Modal */}
      <Modal show={showAutomations} onHide={() => setShowAutomations(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Automations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ backgroundColor: '#FFF8EF', padding: 5 }}>
            <div style={styles.container}>
              <h2>Automations:</h2>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <h4 style={styles.label}>Choose Option</h4>
                  <div style={styles.flexRow}>
                    <label style={{ fontSize: 22, fontFamily: 'bold', gap: 5 }}>
                      <input
                        type="radio"
                        name="timingOption"
                        style={{ height: 20, width: 20, marginRight: 10, marginBottom: 10 }}
                        checked={isImmediately}
                        onChange={() => {
                          setIsImmediately(true);
                          setIsSchedule(false);
                          setScheduleDate('');
                          setScheduleTime('');
                        }}
                      />
                      Set Immediately
                    </label>
                    <label style={{ fontSize: 22, fontFamily: 'bold' }}>
                      <input
                        type="radio"
                        name="timingOption"
                        checked={isSchedule}
                        style={{ height: 20, width: 20, marginRight: 10, marginBottom: 10 }}
                        onChange={() => {
                          setIsSchedule(true);
                          setIsImmediately(false);
                          setImmediatelyDate('');
                          setImmediatelyTime('');
                        }}
                      />
                      Set Schedule
                    </label>
                  </div>
                </div>
              </div>

              {isImmediately && (
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <h4 style={styles.label}>Immediately Date</h4>
                    <div style={styles.immediatelyText}>
                      <h4 style={{ color: 'green' }}>{immediatelyDate}</h4>
                    </div>
                  </div>
                </div>
              )}

              {isSchedule && (
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <h4 style={styles.label}>Schedule Date</h4>
                    <div style={styles.scheduleWrapper}>
                      <InputGroup className="mb-3" style={styles.inputWrapper}>
                        <FormControl
                          type="date"
                          value={scheduleDate}
                          onChange={handleScheduleDateChange}
                          min={new Date().toISOString().split('T')[0]} // Restrict past dates
                        />
                        <DropdownButton
                          as={InputGroup.Append}
                          variant="outline-secondary"
                          title={scheduleTime || 'Select Time'}
                          id="input-group-dropdown-2"
                          style={styles.dropdownButton}
                        >
                          {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'].map((time, index) => (
                            <Dropdown.Item key={index} onClick={() => handleScheduleTimeChange(time)}>
                              {time}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </InputGroup>
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.infoText}>
                <h4>Send message to contacts who opted-in for marketing</h4>
                <p>When 'opt-in' is on, messages are sent only to those who agreed to marketing.</p>
              </div>

              <Button
                style={styles.saveButton}
                onClick={handleAutomationSave}
                disabled={!(isImmediately || (scheduleDate && scheduleTime))}
              >
                Done
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    border: '2px solid green',
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
    margin: '20px auto',
  },
  row: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'space-between',
    gap: '30px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  inputWrapper: {
    border: '2px solid green',
    borderRadius: '5px',
  },
  dropdownButton: {
    border: 'none',
  },
  immediatelyText: {
    fontSize: '16px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
  },
  label: {
    marginBottom: '0',
    lineHeight: '1.5',
    marginBottom: '10px',
  },
  scheduleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: '14px',
    marginBottom: '20px',
    marginTop: 20,
    color: '#555',
    lineHeight: '1.5',
  },
  saveButton: {
    width: 100,
    backgroundColor: '#28a745',
    color: 'white',
    marginLeft: '0',
    border: 'none',
    lineHeight: '1.5',
    marginTop: '20px',
  },
};

export default Preview;