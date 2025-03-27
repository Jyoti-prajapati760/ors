import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RoleList() {
  const [data, setData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredData, setFilteredData] = useState([]); 

  // Fetch Role list
  function roleList() {
    fetch("https://manraj-ors-1.onrender.com/role")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setFilteredData(json); 
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }

  useEffect(() => {
    roleList();
  }, []);

  // Delete role function
  const roleDeleteBtn = (id) => {
    fetch(`https://manraj-ors-1.onrender.com/role/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`Role with ID ${id} deleted`);
        roleList(); 
      })
      .catch((error) => console.error("Error deleting role:", error));
  };

  // Function to handle search on button click
  const handleSearch = () => {
    const results = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.discription.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  };

  return (
    <>
      <div className="list">
        <h3>Role List</h3>

        {/* Search Input */}
        <div className='search'>
          <input className='search1'
            type="text"
            placeholder="Search by Name or Description"
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
              <th>Description</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr className="list" key={item._id}>
                <td>{item.name}</td>
                <td>{item.discription}</td>
                <td>
                  <Link
                    to={`/AddRole/${item._id}`}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Link>
                  <button onClick={() => roleDeleteBtn(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
