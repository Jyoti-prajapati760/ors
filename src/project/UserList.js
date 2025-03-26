import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function UserList() {
  const [data, setData] = useState([]);
  const param = useParams();

  // Fetch user list
  function userList() {
    fetch('https://manraj-ors-1.onrender.com/user')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }

  useEffect(() => {
    userList();
  }, []);

  // Delete user function
  const userDeleteBtn = (id) => {
    fetch(`https://manraj-ors-1.onrender.com/user/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        console.log(`User with ID ${id} deleted`);
        userList(); // Refresh the list after deletion
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <>
      <div className={'list'}>
        <h3>User List</h3>
        <table border={2}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Login Id</th>
              <th>Role ID</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className={'list'} key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.loginId}</td>
                <td>{item.roleId}</td>
                <td>
                  <Link to={`/AddUser/${item._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                  <button onClick={() =>userDeleteBtn (item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
