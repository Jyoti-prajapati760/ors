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

function AddRole() {
  const [name, setname] = useState('');
  const [discription, setdiscription] = useState('');;
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();
  let navigate = useNavigate();

  // Edit role logic when id is passed as a URL param
  useEffect(() => {
    if (id) {
      editRole(id);
      document.querySelector("#roleedit").innerHTML = 'Edit Role';
    }
  }, [id]);

  // Submit button logic
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmpty(true);

    // Validate that all fields are filled
    if (!name || !discription) {
      return;
    }

    if (id) {
      updateRole(id);
    } else {
      addRole();
    }
  };

  // Function to add new role (POST request)
  const addRole = () => {
    fetch('https://manraj-ors-1.onrender.com/role', {
      method: 'POST',
      body: JSON.stringify({ name, discription}),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        navigate('/RoleList');
      })
      .catch((error) => console.error('Error:', error));
  };

  // Function to update role (PUT request)
  const updateRole = (id) => {
    fetch('https://manraj-ors-1.onrender.com/role/' + id, {
      method: 'PUT',
      body: JSON.stringify({ name, discription}),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => {
        if (json.acknowledged) {
          navigate('/RoleList');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // Fetch role data for editing (use correct API endpoint for role data)
  const editRole = (id) => {
    fetch('https://manraj-ors-1.onrender.com/role/' + id)
      .then(response => response.json())
      .then(result => {
        setname(result.name);
        setdiscription(result.discription);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px', backgroundColor: 'rgb(250, 248, 215)' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" id="roleedit">Add Role</p>

              {/* First Name */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='First Name' id='name' type='text' value={name} onChange={(e) => setname(e.target.value)} />
              </div>
              {(isEmpty && !name) && <p style={{ color: 'red' }}> Name is required</p>}

              {/* Last Name */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Last Name' id='discription' type='text' value={discription} onChange={(e) => setdiscription(e.target.value)} />
              </div>
              {(isEmpty && !discription) && <p style={{ color: 'red' }}>discription is required</p>}

              {/* Submit Button */}
              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Submit</MDBBtn>

            </MDBCol>

            {/* Image */}
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage style={{ width: "300px" }} src='https://thumbs.dreamstime.com/b/developer-programmer-woman-coding-software-computer-developer-programmer-woman-coding-software-231060005.jpg'fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default AddRole;

