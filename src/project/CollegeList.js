import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CollegeList() {
  const [data, setData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredData, setFilteredData] = useState([]); 

  // Fetch college list
  function collegeList() {
    fetch("https://manraj-ors-1.onrender.com/college")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setFilteredData(json); 
      })
      .catch((error) => console.error("Error fetching colleges:", error));
  }

  useEffect(() => {
    collegeList();
  }, []);

  // Delete college function
  const collegeDeleteBtn = (id) => {
    fetch(`https://manraj-ors-1.onrender.com/college/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`College with ID ${id} deleted`);
        collegeList(); 
      })
      .catch((error) => console.error("Error deleting college:", error));
  };

  // Function to handle search on button click
  const handleSearch = () => {
    const results = data.filter(
      (item) =>
        item.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  };

  return (
    <>
      <div className="list">
        <h3>College List</h3>

        {/* Search Input */}
        <div className='search'>
          <input className='search1'
            type="text"
            placeholder="Search by College Name, Address, or City"
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
              <th>College Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Mobile Number</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr className="list" key={item._id}>
                <td>{item.collegeName}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.mobileNo}</td>
                <td>
                  <Link
                    to={`/AddCollege/${item._id}`}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Link>
                  <button onClick={() => collegeDeleteBtn(item._id)}>
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
