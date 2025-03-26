import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function CollegeList() {
  const [data, setData] = useState([]);
  const param = useParams();

  // Fetch college list
  function collegeList() {
    fetch('https://manraj-ors-1.onrender.com/college')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => console.error('Error fetching colleges:', error));
  }

  useEffect(() => {
    collegeList();
  }, []);

  // Delete college function
  const collegeDeleteBtn = (id) => {
    fetch(`https://manraj-ors-1.onrender.com/college/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        console.log(`college with ID ${id} deleted`);
        collegeList(); // Refresh the list after deletion
      })
      .catch((error) => console.error('Error deleting college:', error));
  };

  return (
    <>
      <div className={'list'}>
        <h3>college List</h3>
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
            {data.map((item) => (
              <tr className={'list'} key={item._id}>
                <td>{item.collegeName}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.mobileNo}</td>
                <td>
                  <Link to={`/AddCollege/${item._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                  <button onClick={() => collegeDeleteBtn(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

