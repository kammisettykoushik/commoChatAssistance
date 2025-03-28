import React, { useState } from "react";
import { Table, Form, Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

const BusinessProfile = () => {
  const [data, setData] = useState([
    { id: 1, templateName: "Template 1", slug: "slug1", header: "Header 1", mediaType: "Image", visible: true, category: "Category 1", date: "2025-03-28" },
    { id: 2, templateName: "Template 2", slug: "slug2", header: "Header 2", mediaType: "Video", visible: false, category: "Category 2", date: "2025-03-21" },
    { id: 3, templateName: "Template 3", slug: "slug3", header: "Header 3", mediaType: "Image", visible: true, category: "Category 1", date: "2025-03-22" },
    { id: 4, templateName: "Template 4", slug: "slug4", header: "Header 4", mediaType: "Video", visible: false, category: "Category 2", date: "2025-03-20" },
    { id: 5, templateName: "Template 5", slug: "slug5", header: "Header 5", mediaType: "Image", visible: true, category: "Category 1", date: "2025-03-25" },
    { id: 6, templateName: "Template 6", slug: "slug6", header: "Header 6", mediaType: "Video", visible: false, category: "Category 2", date: "2025-03-15" },
    { id: 7, templateName: "Template 7", slug: "slug7", header: "Header 7", mediaType: "Image", visible: true, category: "Category 1", date: "2025-03-12" },
    { id: 8, templateName: "Template 8", slug: "slug8", header: "Header 8", mediaType: "Video", visible: false, category: "Category 2", date: "2025-03-18" },
    { id: 9, templateName: "Template 9", slug: "slug9", header: "Header 9", mediaType: "Image", visible: true, category: "Category 1", date: "2025-03-05" },
    { id: 10, templateName: "Template 10", slug: "slug10", header: "Header 10", mediaType: "Video", visible: false, category: "Category 2", date: "2025-03-10" },
    { id: 11, templateName: "Template 11", slug: "slug11", header: "Header 11", mediaType: "Image", visible: true, category: "Category 1", date: "2025-02-25" },
    { id: 12, templateName: "Template 12", slug: "slug12", header: "Header 12", mediaType: "Video", visible: false, category: "Category 2", date: "2025-02-28" },
    { id: 13, templateName: "Template 13", slug: "slug13", header: "Header 13", mediaType: "Image", visible: true, category: "Category 1", date: "2025-02-15" },
    { id: 14, templateName: "Template 14", slug: "slug14", header: "Header 14", mediaType: "Video", visible: false, category: "Category 2", date: "2025-02-12" },
    { id: 15, templateName: "Template 15", slug: "slug15", header: "Header 15", mediaType: "Image", visible: true, category: "Category 1", date: "2025-01-30" },
    { id: 16, templateName: "Template 16", slug: "slug16", header: "Header 16", mediaType: "Video", visible: false, category: "Category 2", date: "2025-01-25" },
    { id: 17, templateName: "Template 17", slug: "slug17", header: "Header 17", mediaType: "Image", visible: true, category: "Category 1", date: "2025-01-20" },
    { id: 18, templateName: "Template 18", slug: "slug18", header: "Header 18", mediaType: "Video", visible: false, category: "Category 2", date: "2025-01-18" },
    { id: 19, templateName: "Template 19", slug: "slug19", header: "Header 19", mediaType: "Image", visible: true, category: "Category 1", date: "2025-01-15" },
    { id: 20, templateName: "Template 20", slug: "slug20", header: "Header 20", mediaType: "Video", visible: false, category: "Category 2", date: "2025-01-12" },
  ]);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", mediaType: "", dateFilter: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [headerIndex, setHeaderIndex] = useState(0); // Track header set index (0-based)

  const handleSearch = (e) => setSearch(e.target.value);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (id) => {
    setData(data.map(item => item.id === id ? { ...item, visible: !item.visible } : item));
  };

  const deleteItem = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  // Get the index for the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter the data based on search, category, and media type
  const filteredData = data
    .filter(item => item.templateName.toLowerCase().includes(search.toLowerCase()))
    .filter(item => (filters.category ? item.category === filters.category : true))
    .filter(item => (filters.mediaType ? item.mediaType === filters.mediaType : true))
    .filter(item => (filters.dateFilter === "monthly" ? new Date(item.date).getMonth() === new Date().getMonth() : true))
    .filter(item => (filters.dateFilter === "weekly" ? new Date(item.date).getWeek() === new Date().getWeek() : true));

  // Get the subset of data based on the current page
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Column sets with headers and data
  const columnSets = [
    {
      headers: ['Id', 'Template Name', 'Slug', 'Category', 'Header', 'Media Type'],
      data: currentItems.map(item => [item.id, item.templateName, item.slug, item.category, item.header, item.mediaType]),
    },
    {
      headers: ['Id', 'Template Name', 'Slug', 'Category', 'Date', 'Visible'],
      data: currentItems.map(item => [item.id, item.templateName, item.slug, item.category, item.date, item.visible ? 'Visible' : 'Not Visible']),
    },
    // Add more sets of columns if needed
  ];

  const nextHeader = () => {
    if (headerIndex < columnSets.length - 1) {
      setHeaderIndex(headerIndex + 1);
    }
  };

  const prevHeader = () => {
    if (headerIndex > 0) {
      setHeaderIndex(headerIndex - 1);
    }
  };

  // Helper function to get the week number of a given date
  Date.prototype.getWeek = function() {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const dayNum = date.getDay() || 7;
    date.setDate(date.getDate() + 4 - dayNum);
    const yearStart = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#E3EFFF", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{
        width: "250px", backgroundColor: "#032D60", color: "white", padding: "20px", position: "fixed", top: "0", left: "0", height: "100vh"
      }}>
        {/* <h4 style={{ fontSize: "1.5rem" }}>Admin Panel</h4> */}
        <ul style={{lineHeight:3,listStyle:"none"}}>
          <li style={{ fontSize: "1.2rem" }}>Business Profile</li>
        
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "250px", width: "100%", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          {/* Search Bar */}
          <InputGroup style={{ maxWidth: "300px" }}>
            <FormControl
              placeholder="Search Templates..."
              value={search}
              onChange={handleSearch}
            />
            <InputGroup.Text><FaSearch /></InputGroup.Text>
          </InputGroup>

          {/* Filter Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="filter-dropdown">
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilters({ ...filters, dateFilter: 'monthly' })}>Monthly</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilters({ ...filters, dateFilter: 'weekly' })}>Weekly</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Table with Scrollable Columns */}
        <div style={{ overflowX: "auto", marginBottom: "20px", maxHeight: "400px", overflowY: "auto" }}>
          <Table striped bordered hover style={{ minWidth: "100%", transition: "transform 0.5s ease-in-out" }}>
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#E3EFFF" }}>
              <tr>
                {columnSets[headerIndex].headers.map((header, index) => (
                  <th key={index} style={{ transition: "transform 0.5s ease-in-out" }}>
                    {header}
                  </th>
                ))}
                <th>
                  <ArrowLeft2 size="20" color="black" onClick={prevHeader} style={{ cursor: "pointer", marginRight: "10px" }} />
                  <ArrowRight2 size="20" color="black" onClick={nextHeader} style={{ cursor: "pointer", marginLeft: "10px" }} />
                </th>
              </tr>
            </thead>
            <tbody>
              {columnSets[headerIndex].data.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ transition: "transform 0.5s ease-in-out" }}>
                      {cell}
                    </td>
                  ))}
                  <td>
                    <FaEdit style={{ cursor: "pointer", marginRight: "10px" }} />
                    <FaTrashAlt
                      style={{ cursor: "pointer", color: "red", marginRight: "10px" }}
                      onClick={() => deleteItem(currentItems[index].id)}
                    />
                    {currentItems[index].visible ? (
                      <FaEye onClick={() => toggleVisibility(currentItems[index].id)} style={{ cursor: "pointer", color: "green" }} />
                    ) : (
                      <FaEyeSlash onClick={() => toggleVisibility(currentItems[index].id)} style={{ cursor: "pointer", color: "gray" }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
          </span>
          <Button disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
