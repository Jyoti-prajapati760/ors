import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

function AddUser() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [loginId, setloginId] = useState('');
  const [password, setpassword] = useState('');
  const [roleId, setroleId] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();
  let navigate = useNavigate();

  // Edit user logic when id is passed as a URL param
  useEffect(() => {
    if (id) {
      editUser(id);
      document.querySelector("#useredit").innerHTML = 'Edit User';
    }
  }, [id]);

  // Submit button logic
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmpty(true);

    // Validate that all fields are filled
    if (!firstName || !lastName || !loginId || !password || !roleId) {
      return;
    }

    if (id) {
      updateUser(id);
    } else {
      addUser();
    }
  };

  // Function to add new user (POST request)
  const addUser = () => {
    fetch('https://manraj-ors-1.onrender.com/user', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, loginId, password, roleId }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        navigate('/UserList');
      })
      .catch((error) => console.error('Error:', error));
  };

  // Function to update user (PUT request)
  const updateUser = (id) => {
    fetch('https://manraj-ors-1.onrender.com/user/' + id, {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, loginId, password, roleId }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => {
        if (json.acknowledged) {
          navigate('/UserList');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // Fetch user data for editing (use correct API endpoint for user data)
  const editUser = (id) => {
    fetch('https://manraj-ors-1.onrender.com/user/' + id)
      .then(response => response.json())
      .then(result => {
        setfirstName(result.firstName);
        setlastName(result.lastName);
        setloginId(result.loginId);
        setpassword(result.password);
        setroleId(result.roleId);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px', backgroundColor: 'rgb(250, 248, 215)' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" id="useredit">Add User</p>

              {/* First Name */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='First Name' id='firstName' type='text' value={firstName} onChange={(e) => setfirstName(e.target.value)} />
              </div>
              {(isEmpty && !firstName) && <p style={{ color: 'red' }}>First Name is required</p>}

              {/* Last Name */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Last Name' id='lastName' type='text' value={lastName} onChange={(e) => setlastName(e.target.value)} />
              </div>
              {(isEmpty && !lastName) && <p style={{ color: 'red' }}>Last Name is required</p>}


              {/* Login ID */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Login Id' id='loginId' type='email' value={loginId} onChange={(e) => setloginId(e.target.value)} />
              </div>
              {(isEmpty && !loginId) && <p style={{ color: 'red' }}>Login Id is required</p>}


              {/* Password */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' id='password' type='password' value={password} onChange={(e) => setpassword(e.target.value)} />
              </div>
              {(isEmpty && !password) && <p style={{ color: 'red' }}>Password is required</p>}


              {/* Role ID */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user-tag me-3" size='lg' />
                <MDBInput label='Role ID' id='roleId' type='text' value={roleId} onChange={(e) => setroleId(e.target.value)} />
              </div>
              {(isEmpty && !roleId) && <p style={{ color: 'red' }}> Roll Id is most be impotanat</p>}


              {/* Submit Button */}
              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Submit</MDBBtn>

            </MDBCol>

            {/* Image */}
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage style={{ width: "300px" }} src='https://www.shareicon.net/data/256x256/2016/06/30/788859_add_512x512.png' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default AddUser;

