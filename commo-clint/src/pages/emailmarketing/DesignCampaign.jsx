import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Papa from 'papaparse';
import { read, utils } from 'xlsx';

// Error Message Component that supports HTML content
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
      <div className="d-flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 1 0 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  );
};

const DesignCampaign = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [tags, setTags] = useState('');
  const [owners, setOwners] = useState('');
  const [headers, setHeaders] = useState('');
  const [footer, setFooter] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Custom styles for the component
  const styles = {
    errorAlert: {
      backgroundColor: '#fff0f0',
      borderLeft: '4px solid #dc3545',
      color: '#6a0000',
      padding: '12px 15px',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    card: {
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff',
    },
    previewCard: {
      backgroundColor: '#fcfcfc',
    },
    previewSection: {
      border: '1px solid #e0e0e0',
      padding: '15px',
      borderRadius: '4px',
      backgroundColor: '#f8f9fa',
    }
  };

  useEffect(() => {
    const savedCampaignData = JSON.parse(localStorage.getItem('savedCampaignData'));
    if (savedCampaignData) {
      setName(savedCampaignData.campaignName || '');
      setContact(savedCampaignData.Contact || '');
      setTags(savedCampaignData.tags || '');
      setOwners(savedCampaignData.owners || '');
      setSubject(savedCampaignData.subject || '');
      setContent(savedCampaignData.content || '');
      setHeaders(savedCampaignData.header || '');
      setFooter(savedCampaignData.footer || '');
    }
  }, []);

  const handleImageChange = (event) => {
    const uploadedImage = event.target.files[0];
    if (!uploadedImage) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (uploadedImage.size > maxSize) {
      setErrorMessage('Image file size <strong>exceeds 5MB limit</strong>');
      setImage(null);
      return;
    }

    if (!validImageTypes.includes(uploadedImage.type)) {
      setErrorMessage('Please upload a <strong>valid image file</strong> (JPEG, PNG)');
      setImage(null);
      return;
    }

    setErrorMessage('');
    setImage(uploadedImage);
  };

  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const maxSize = 10 * 1024 * 1024; // 10MB
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (uploadedFile.size > maxSize) {
      setErrorMessage('Contacts file size <strong>exceeds 10MB limit</strong>');
      setFile(null);
      setExcelData([]);
      return;
    }

    if (!validTypes.includes(uploadedFile.type)) {
      setErrorMessage('Please upload a <strong>valid Excel</strong> (.xls, .xlsx) or <strong>CSV file</strong>');
      setFile(null);
      setExcelData([]);
      return;
    }

    try {
      const requiredColumns = ['id', 'firstname', 'lastname', 'email'];
      let headers = [];
      let fullData = [];

      if (uploadedFile.type === 'text/csv') {
        const text = await uploadedFile.text();
        const result = Papa.parse(text, { preview: 1, header: true });
        headers = Object.keys(result.data[0] || {}).map((h) => h.trim());
        fullData = Papa.parse(text, { header: true }).data;
      } else {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const workbook = read(arrayBuffer, { type: 'array' }); // Define workbook here
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        headers = (utils.sheet_to_json(worksheet, { header: 1 })[0] || []).map((h) => String(h).trim());
        fullData = utils.sheet_to_json(worksheet);
      }

      const isValid = requiredColumns.every((col) => headers.includes(col));
      if (!isValid) {
        setErrorMessage(
          `Contacts File is <strong>Invalid</strong>.<br>Required Columns are: <strong>${requiredColumns.join(
            ', '
          )}</strong>.<br>But Instead Found: <strong>${headers.join(', ')}</strong>`
        );
        setFile(null);
        setExcelData([]);
        return;
      }

      setErrorMessage('');
      setFile(uploadedFile);
      setExcelData(fullData);
    } catch (err) {
      setErrorMessage(`<strong>Error reading contacts file:</strong> ${err.message}`);
      setFile(null);
      setExcelData([]);
    }
  };

  const handleSave = async () => {
    if (!name || !subject || !content) {
      setErrorMessage('<strong>Required fields missing:</strong> Campaign name, subject, and content are required');
      return;
    }

    if ((image || file) && errorMessage) {
      setErrorMessage('<strong>Please fix file errors</strong> before saving');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('Contact', contact);
    formData.append('tags', tags);
    formData.append('owners', owners);
    formData.append('subject', subject);
    formData.append('content', content);
    formData.append('headers', headers);
    formData.append('footer', footer);
    if (file) formData.append('file', file);
    if (image) formData.append('image', image);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/emailmarketing/campaigns`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
      localStorage.removeItem('savedCampaignData');
      navigate('/EmailMarketing/Campaigns/DesignPreviewScreen');
    } catch (error) {
      console.error('Error saving campaign:', error);
      setErrorMessage(`<strong>Failed to save campaign:</strong> ${error.response?.data?.error || error.message}`);
    }
  };

  const handleCancel = () => {
    setName('');
    setContact('');
    setTags('');
    setOwners('');
    setSubject('');
    setContent('');
    setHeaders('');
    setFooter('');
    setFile(null);
    setImage(null);
    setExcelData([]);
    setErrorMessage('');
    localStorage.removeItem('savedCampaignData');
  };

  return (
    <div className='container mt-4'>
      <h4 className='fw-bold mb-4'>Design Your Campaign</h4>
      
      {/* Error message at the top level */}
      <ErrorMessage message={errorMessage} />

      <div className='d-flex justify-content-between'>
        <div className='card shadow-lg border mb-4' style={{ width: '48%', height: 'auto', ...styles.card }}>
          <div className='card-body'>
            <h5 className='fw-bold mb-3'>Email Template</h5>

            <div className='mb-3'>
              <label className='form-label'>Company Name:</label>
              <input
                type='text'
                className='form-control'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter Campaign Name'
              />
            </div>
              <div className='mb-3'>
                <label className='form-label'>From:</label>
                <input
                  type='text'
                  className='form-control'
                  value={owners}
                  onChange={(e) => setOwners(e.target.value)}
                  placeholder='Enter From Address'
                />
              </div>
            <div className='mb-3'>
              <label className='form-label'>Subject:</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className='form-control'
                type='text'
                placeholder='Enter Email Subject'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Upload Image:</label>
              <input
                type='file'
                className='form-control'
                accept='image/jpeg,image/png'
                onChange={handleImageChange}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor='fileInput' className='form-label'>New Contacts:</label>
              <div className='border p-2 rounded'>
                <input
                  type='file'
                  id='fileInput'
                  className='form-control'
                  accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Headers:</label>
              <textarea
                className='form-control'
                rows='3'
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder='Enter Headers'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Content:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='form-control'
                rows='3'
                placeholder='Enter Email Content'
              />
            </div>

            
            <div className='mb-3'>
              <label className='form-label'>Footer:</label>
              <textarea
                className='form-control'
                rows='3'
                value={footer}
                onChange={(e) => setFooter(e.target.value)}
                placeholder='Enter Footer'
              />
            </div>
          </div>
        </div>

        <div className='card shadow-lg border mb-2' style={{ width: '48%', height: 'auto', ...styles.card, ...styles.previewCard }}>
          <div className='card-body'>
            <h5 className='fw-bold mb-3' style={{ fontSize: '1.5rem' }}>Preview Email :-</h5>
            <p>
              <strong>Campaign Name:</strong> {name || 'No name entered'}
            </p>
            <p>
              <strong>From:</strong> {owners || 'No owners assigned'}
            </p>
             <strong>Subject:</strong> {subject || 'Email Subject'}
            

            <div className='email-headers' style={{ marginTop: '20px', fontSize: '1rem' }}>
              <strong>Headers:</strong> {headers || 'No headers'}
            </div>

            <div className='email-body' style={{ marginTop: '20px', padding: '15px', backgroundColor: '#F8F9FA' }}>
              <p style={{ fontSize: '1.2rem' }}>{content || 'Email content preview will appear here.'}</p>
            </div>
            {image && (
              <div className='mb-3'>
                <p>Uploaded Image Preview:</p>
                <img src={URL.createObjectURL(image)} alt='Preview' style={{ maxWidth: '100%', height: '20%' }} />
              </div>
            )}
            {file && (
              <div className='file-preview' style={{ marginTop: '30px' }}>
                <p>
                  <strong>Uploaded File:</strong> {file.name}
                </p>
              </div>
            )}
            
            <div className='email-footer' style={{ marginTop: '30px', padding: '15px', fontSize: '1rem' }}>
              <strong>Footer:</strong> {footer || 'No footer content'}
            </div>

            <div className='d-flex justify-content-end mt-4'>
              <button className='btn btn-danger me-2' onClick={handleCancel}>
                Cancel
              </button>
              <button className='btn btn-success' onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCampaign;