import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function RoleList() {
  const [data, setData] = useState([]);
  const param = useParams();

  // Fetch Role list
  function roleList() {
    fetch('https://manraj-ors-1.onrender.com/role')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => console.error('Error fetching roles:', error));
  }

  useEffect(() => {
    roleList();
  }, []);

  // Delete role function
  const roleDeleteBtn = (id) => {
    fetch(`https://manraj-ors-1.onrender.com/role/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        console.log(`Role with ID ${id} deleted`);
        roleList(); // Refresh the list after deletion
      })
      .catch((error) => console.error('Error deleting role:', error));
  };

  return (
    <>
      <div className={'list'}>
        <h3>Role List</h3>
        <table border={2}>
          <thead>
            <tr>
              <th>Name</th>
              <th>discription</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className={'list'} key={item._id}>
                <td>{item.name}</td>
                <td>{item.discription}</td>
                <td>
                  <Link to={`/AddRole/${item._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                  <button onClick={() =>roleDeleteBtn (item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
