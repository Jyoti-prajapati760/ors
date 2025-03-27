import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MarksheetList() {
  const [data, setData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredData, setFilteredData] = useState([]); 

  // Fetch marksheet list
  function marksheetList() {
    fetch("https://manraj-ors-1.onrender.com/marksheet")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setFilteredData(json); 
      })
      .catch((error) => console.error("Error fetching users:", error));
  }

  useEffect(() => {
    marksheetList();
  }, []);

  // Delete marksheet function
  const marksheetDeleteBtn = (id) => {
    fetch(`https://manraj-ors-1.onrender.com/marksheet/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`Marksheet with ID ${id} deleted`);
        marksheetList(); 
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Function to handle search on button click
  const handleSearch = () => {
    const results = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toString().includes(searchTerm) ||
        item.rollNo.toString().includes(searchTerm)
    );
    setFilteredData(results);
  };

  return (
    <>
      <div className="list">
        <h3>Marksheet List</h3>

        {/* Search Input */}
        <div  className='search'>
          <input className='search1'
            type="text"
            placeholder="Search by Name, Student ID, Roll No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "5px", marginRight: "5px" }}
          />
          <button onClick={handleSearch} style={{ padding: "5px 10px" }}>
            Search
          </button>
        </div>

        <table border={2}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Student Id</th>
              <th>RollNo</th>
              <th>Physics</th>
              <th>Chemistry</th>
              <th>Maths</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr className="list" key={item._id}>
                <td>{item.name}</td>
                <td>{item.studentId}</td>
                <td>{item.rollNo}</td>
                <td>{item.physics}</td>
                <td>{item.chemistry}</td>
                <td>{item.maths}</td>
                <td>
                  <Link
                    to={`/AddMarksheet/${item._id}`}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Link>
                  <button onClick={() => marksheetDeleteBtn(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
