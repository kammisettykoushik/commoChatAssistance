import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from 'xlsx'; // Import xlsx library

const DesignCampaign = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [Contact, setContact] = useState('');
    const [tags, setTags] = useState('');
    const [owners, setOwners] = useState('');
    const [headers, setHeaders] = useState('');
    const [footer, setFooter] = useState('');
    const [savedData, setSavedData] = useState(null);
    const [file, setFile] = useState(null);
    const [excelData, setExcelData] = useState([]); // New state for storing parsed Excel data

    const navigate = useNavigate();

    useEffect(() => {
        // Load saved data from localStorage on component mount
        const savedCampaignData = JSON.parse(localStorage.getItem('campaignData'));
        if (savedCampaignData) {
            setName(savedCampaignData.name || '');
            setContact(savedCampaignData.Contact || '');
            setTags(savedCampaignData.tags || '');
            setOwners(savedCampaignData.owners || '');
            setSubject(savedCampaignData.subject || '');
            setContent(savedCampaignData.content || '');
            setHeaders(savedCampaignData.headers || '');
            setFooter(savedCampaignData.footer || '');
        }
    }, []);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile); // Set the file to display the name

        if (uploadedFile) {
            // Check if the file is an Excel file
            if (uploadedFile.type === "application/vnd.ms-excel" || uploadedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                // Use FileReader to read the Excel file
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });

                    // Get the first sheet's name and data
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);

                    // Set the Excel data to state
                    setExcelData(json);
                };
                reader.readAsBinaryString(uploadedFile);
            } else {
                alert('Please upload a valid Excel file');
            }
        }
    };

    const handleSave = () => {
        const campaignData = {
            id: Date.now(),
            name,
            Contact,
            tags,
            owners,
            subject,
            content,
            headers,
            footer,
        };

        const savedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        savedCampaigns.push(campaignData);
        localStorage.setItem('campaigns', JSON.stringify(savedCampaigns));

        handleCancel();
        navigate('/EmailMarketing/Campaigns/DesignPreviewScreen', { state: campaignData });
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
        localStorage.removeItem('campaignData');
    };

    return (
        <div className="container mt-4">
            <h4 className="fw-bold mb-4">Design Your Campaign</h4>

            <div className="d-flex justify-content-between">
                <div className="card shadow-lg border mb-4" style={{ width: '48%', height: 'auto' }}>
                    <div className="card-body">
                        <h5 className="fw-bold mb-3">Email Template</h5>

                        {/* Form Inputs */}
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Campaign Name"
                            />
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div className="mb-3">
                                <label className="form-label">Owners</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={owners}
                                    onChange={(e) => setOwners(e.target.value)}
                                    placeholder="Enter Owners"
                                />
                            </div>
                            <div style={{ flex: 1, marginLeft: 3 }}>
                                <label className="form-label">Tags</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Enter Tags"
                                />
                            </div>
                        </div>
                        {/* More Inputs */}
                        <div className="mb-2">
                            <label htmlFor="Contacts">Contacts</label>
                            <div className="border p-2 rounded">
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept=".xls,.xlsx" // Only allows Excel files
                                    onChange={handleFileChange} // Add the file change handler here
                                />
                            </div>
                        </div>

                        {/* Content, Headers, Footer Inputs */}
                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <input
                                value={content || ''}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ fontSize: '1.2rem', width: '100%', padding: '5px' }}
                                type="text"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Headers</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={headers}
                                onChange={(e) => setHeaders(e.target.value)}
                                placeholder="Enter Headers"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Footer</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={footer}
                                onChange={(e) => setFooter(e.target.value)}
                                placeholder="Enter Footer"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="card shadow-lg border mb-2" style={{ width: '48%', height: 'auto' }}>
                    <div className="card-body">
                        <h5 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>Preview Email</h5>
                        <p><strong>Campaign Name:</strong> {name || 'No name entered'}</p>
                        <p><strong>From:</strong> {owners || 'No owners assigned'} | <strong>To:</strong> {tags || 'No tags added'}</p>
                        <h4 style={{ margin: '0', fontSize: '1.75rem' }}>{subject || 'Email Subject'}</h4>
                        <p>
                            {file && (
                                <div className="file-preview" style={{ marginTop: '30px' }}>
                                    <p><strong>Uploaded File:</strong> {file.name}</p>

                                    {/* Display Excel preview */}
                                    {excelData.length > 0 && (
                                        <div style={{ marginTop: '20px' }}>
                                            {/* <strong>Excel Preview:</strong>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        {Object.keys(excelData[0]).map((key) => (
                                                            <th key={key} style={{ border: '1px solid #ccc', padding: '5px' }}>
                                                                {key}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {excelData.slice(0, 3).map((row, index) => (
                                                        <tr key={index}>
                                                            {Object.values(row).map((value, i) => (
                                                                <td key={i} style={{ border: '1px solid #ccc', padding: '5px' }}>
                                                                    {value}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table> */}
                                        </div>
                                    )}
                                </div>
                            )}
                        </p>
                        <div className="email-body" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#F8F9FA' }}>
                            <p style={{ fontSize: '1.2rem' }}>{content || 'Email content preview will appear here.'}</p>
                        </div>
                        <div className="email-headers" style={{ marginTop: '20px', fontSize: '1rem', color: '#777' }}>
                            <strong>Headers:</strong> {headers || 'No headers'}
                        </div>
                        <div className="email-footer" style={{ marginTop: '30px', padding: '15px', fontSize: '1rem', color: '#777', borderTop: '1px solid #ddd' }}>
                            <p><strong>Footer:</strong> {footer || 'No footer'}</p>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            <button className="btn btn-success" onClick={handleSave}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignCampaign;
