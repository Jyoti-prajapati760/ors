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

function AddMarksheet() {
  const [name, setname] = useState('');
  const [studentId, setstudentId] = useState('');
  const [rollNo, setrollNo] = useState('');
  const [physics, setphysics] = useState('');
  const [roleId, setroleId] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();
  let navigate = useNavigate();

  // Edit Marksheet logic when id is passed as a URL param
  useEffect(() => {
    if (id) {
      editMarksheet(id);
      document.querySelector("#useredit").innerHTML = 'Edit Marksheet';
    }
  }, [id]);

  // Submit button logic
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmpty(true);

    // Validate that all fields are filled
    if (!name || !studentId || !rollNo || !physics || !roleId) {
      return;
    }

    if (id) {
      updateMarksheet(id);
    } else {
      addMarksheet();
    }
  };

  // Function to add new Marksheet (POST request)
  const addMarksheet = () => {
    fetch('https://manraj-ors-1.onrender.com/user', {
      method: 'POST',
      body: JSON.stringify({ name, studentId, rollNo, physics, roleId }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        navigate('/MarksheetList');
      })
      .catch((error) => console.error('Error:', error));
  };

  // Function to update Marksheet (PUT request)
  const updateMarksheet = (id) => {
    fetch('https://manraj-ors-1.onrender.com/user/' + id, {
      method: 'PUT',
      body: JSON.stringify({ name, studentId, rollNo, physics, roleId }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => {
        if (json.acknowledged) {
          navigate('/MarksheetList');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // Fetch Marksheet data for editing (use correct API endpoint for Marksheet data)
  const editMarksheet = (id) => {
    fetch('https://manraj-ors-1.onrender.com/user/' + id)
      .then(response => response.json())
      .then(result => {
        setname(result.name);
        setstudentId(result.studentId);
        setrollNo(result.rollNo);
        setphysics(result.physics);
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
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" id="useredit">Add Marksheet</p>

              {/* First Name */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='First Name' id='name' type='text' value={name} onChange={(e) => setname(e.target.value)} />
              </div>
              {(isEmpty && !name) && <p style={{ color: 'red' }}> Name is required</p>}

              {/* student id */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Last Name' id='studentId' type='text' value={studentId} onChange={(e) => setstudentId(e.target.value)} />
              </div>
              {(isEmpty && !studentId) && <p style={{ color: 'red' }}>Student Id is required</p>}


              {/* roll no */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Login Id' id='rollNo' type='email' value={rollNo} onChange={(e) => setrollNo(e.target.value)} />
              </div>
              {(isEmpty && !rollNo) && <p style={{ color: 'red' }}>roll no required</p>}


              {/* physics */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='physics' id='physics' type='physics' value={physics} onChange={(e) => setphysics(e.target.value)} />
              </div>
              {(isEmpty && !physics) && <p style={{ color: 'red' }}>physics is required</p>}


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
              <MDBCardImage style={{ width: "300px" }} src="https://t3.ftcdn.net/jpg/11/32/87/00/360_F_1132870081_JecZfNKm8o9TY5SrmICHRVLLHJmXSndO.jpg"fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default AddMarksheet;

