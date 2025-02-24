import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const NewCampaign = () => {
    const navigate = useNavigate();

    const handleDesignClick = () => {
        // navigate('/DesignCampaign');
        navigate('/EmailMarketing/Campaigns/DesignCampaign');
      };

      const DesignedTemplates =()=>{
        navigate('/EmailMarketing/Campaigns/DesignPreviewScreen')
      }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">Select Type of Campaign</h5>
                <button className="btn btn-success" onClick={DesignedTemplates}>Designed Templates</button>
            </div>
            <div className="d-flex justify-content-evenly p-5 m-3 rounded" style={{backgroundColor:'#EBF1FD'}}>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="card shadow-lg border text-center" style={{ width: '25%' }}>
                        <div className="p-3" style={{backgroundColor:'#EBF1FD'}}>
                            <img  src="https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=" style={{ height: 100, width: 100, margin: '0 auto',backgroundColor:'lightgray' }}/>
                        </div>
                        <div className="card-body">
                            <p className="fw-semibold text-dark">Regular Email</p>
                            <p className="text-muted small">Use our email builder to launch a campaign</p>
                            <button className="btn btn-primary" onClick={handleDesignClick}>Design</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewCampaign;
