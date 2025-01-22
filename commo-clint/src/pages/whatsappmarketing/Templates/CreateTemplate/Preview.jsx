import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const [templateName, setTemplateName] = useState("");
  const [category, setCategory] = useState("");
  const [header, setHeader] = useState("");
  const [mediaType, setMediaType] = useState("Image");
  const [mediaFile, setMediaFile] = useState(null);
  const [body, setBody] = useState("");
  const [footer, setFooter] = useState("");
  const [mediaShape, setMediaShape] = useState("Square");
  const navigate = useNavigate();

  const handleSave = () => {
    const savedData = {
      templateName,
      category,
      header,
      mediaType,
      mediaFile: mediaFile ? URL.createObjectURL(mediaFile) : null,
      body,
      footer,
      mediaShape,
      timestamp: new Date().toLocaleString(),
    };

    const existingTemplates = JSON.parse(localStorage.getItem("SavedPreviews")) || [];
    const updatedTemplates = [...existingTemplates, savedData];
    localStorage.setItem("SavedPreviews", JSON.stringify(updatedTemplates));

    navigate("/whatsappmarketing/Templates/SavedPreview");
  };

  const getMediaShapeStyle = () => {
    switch (mediaShape) {
      case "Round":
        return { borderRadius: "50%" };
      case "Oval":
        return { borderRadius: "50% / 25%" };
      case "Rounded":
        return { borderRadius: "15px" };
      case "Semi-border":
        return { borderRadius: "0 50% 50% 0" };
      case "Diamond":
        return { transform: "rotate(45deg)", borderRadius: "10px" };
      default:
        return { borderRadius: "0" };
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6 d-flex flex-column justify-content-between border p-4" style={{ height: '100%' }}>
          <h2>Create Template</h2>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: 10,marginTop:30 }}>
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
              <label className="form-label">Category</label>
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
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="Image">Image</option>
              <option value="Video">Video</option>
            </select>
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
            <label className="form-label">Upload Media</label>
            <input
              type="file"
              className="form-control"
              accept={mediaType === "Image" ? "image/*" : "video/*"}
              onChange={(e) => setMediaFile(e.target.files[0])}
            />
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
              <h4>{templateName || "Template Name"}</h4>
              <p>{category || "Category"}</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">{header || "Header Content"}</h5>
              <div className="mb-3 text-center">
                {mediaFile && (
                  <div
                    style={{
                      width: "300px",
                      height: "300px",
                      overflow: "hidden",
                      margin: "0 auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      backgroundColor: "gray",
                      ...getMediaShapeStyle(),
                    }}
                  >
                    {mediaType === "Image" ? (
                      <img
                        src={URL.createObjectURL(mediaFile)}
                        alt="Preview"
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(mediaFile)}
                        controls
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
              <p className="card-text">{body || "Body Content"}</p>
            </div>
            <div className="card-footer text-muted">
              {footer || "Footer Content"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
