import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredData, setFilteredData] = useState([]); 

  // Fetch student list
  function studentList() {
    fetch("https://manraj-ors-1.onrender.com/student")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setFilteredData(json); 
      })
      .catch((error) => console.error("Error fetching students:", error));
  }

  useEffect(() => {
    studentList();
  }, []);

  // Delete student function
  const studentDeleteBtn = (id) => {
    fetch(`https://manraj-ors-1.onrender.com/student/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`Student with ID ${id} deleted`);
        studentList(); 
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  // Function to handle search on button click
  const handleSearch = () => {
    const results = data.filter(
      (item) =>
        item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.collegeId.toString().includes(searchTerm)
    );
    setFilteredData(results);
  };

  return (
    <>
      <div className="list">
        <h3>Student List</h3>

        {/* Search Input */}
        <div className='search' >
          <input  className='search1'
            type="text"
            placeholder="Search by Name, Email"
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>College ID</th>
              <th>Mobile No</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr className="list" key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.emailId}</td>
                <td>{item.collegeId}</td>
                <td>{item.mobileNo}</td>
                <td>
                  <Link
                    to={`/AddStudent/${item._id}`}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Link>
                  <button onClick={() => studentDeleteBtn(item._id)}>
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
