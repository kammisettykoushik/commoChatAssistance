import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

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


    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0]; // Get the first file uploaded
        setFile(uploadedFile); // Save file to the state
    };

    const handleSave = () => {
        const campaignData = {
            id: Date.now(), // Unique identifier for each campaign
            name,
            Contact,
            tags,
            owners,
            subject,
            content,
            headers,
            footer,
        };
    
        // Get existing campaigns from localStorage or initialize empty array
        const savedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        
        // Add the new campaign to the list
        savedCampaigns.push(campaignData);
    
        // Save updated campaigns list to localStorage
        localStorage.setItem('campaigns', JSON.stringify(savedCampaigns));
    
        // Optionally reset form fields
        handleCancel();
    
        // Navigate to preview screen
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
        
        // Optionally, clear the localStorage if needed
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
                            <div style={{ flex: 1,marginLeft:3}}>
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
                        <div style={{ marginTop: -20 }}>
                            <label htmlFor="Contacts">Contacts</label>
                            <div className="border p-2 rounded">
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*, application/pdf"
                                    onChange={handleFileChange} // Add the file change handler here
                                />
                            </div>
                        </div>
                   


                        <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter Subject"
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

                <div className="card shadow-lg border" style={{ width: '48%', height: '600px' }}>
                    <div className="card-body">
                        <h5 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>Preview Email</h5>
                        <p><strong>Campaign Name:</strong> {name || 'No name entered'}</p>
                        <p>
                             {file && (
                            <div className="file-preview" style={{ marginTop: '30px' }}>
                                <p><strong>Uploaded File:</strong> {file.name}</p>
                                {/* Optionally, you can display the file's preview if it's an image */}
                                {file.type.startsWith("image") && (
                                    <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                                )}
                            </div>
                        )}
                         {/* {Contact || 'No Contact assigned'} */}
                            </p>

                        <p><strong>From:</strong> {owners || 'No owners assigned'} | <strong>To:</strong> {tags || 'No tags added'}</p>
                        <h4 style={{ margin: '0', fontSize: '1.75rem' }}>{subject || 'Email Subject'}</h4>
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
