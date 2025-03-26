import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function StudentList() {
  const [data, setData] = useState([]);
  const param = useParams();

  // Fetch student list
  function studentList() {
    fetch('https://manraj-ors-1.onrender.com/student')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }

  useEffect(() => {
    studentList();
  }, []);

  // Delete student function
  const studentDeleteBtn = (id) => {
    fetch(`https://manraj-ors-1.onrender.com/student/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        console.log(`Student with ID ${id} deleted`);
        studentList(); // Refresh the list after deletion
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <>
      <div className={'list'}>
        <h3>Student List</h3>
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
            {data.map((item) => (
              <tr className={'list'} key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.emailId}</td>
                <td>{item.collegeId}</td>
                <td>{item.mobileNo}</td>
                <td>
                  <Link to={`/AddStudent/${item._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                  <button onClick={() =>studentDeleteBtn (item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
