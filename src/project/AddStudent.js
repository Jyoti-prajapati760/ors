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

function AddStudent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [title, setTitle] = useState('Add Student');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setTitle('Edit Student');
      fetchStudent(id);
    }
  }, [id]);

  
  const fetchStudent = async (id) => {
    try {
      const response = await fetch(`https://manraj-ors-1.onrender.com/student/${id}`);
      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmailId(data.emailId);
      setCollegeId(data.collegeId);
      setMobileNo(data.mobileNo);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmpty(true);

    if (!firstName || !lastName || !emailId || !collegeId || !mobileNo) {
      return;
    }

    id ? updateStudent(id) : addStudent();
  };

 
  const addStudent = async () => {
    try {
      const response = await fetch('https://manraj-ors-1.onrender.com/student', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, emailId, collegeId, mobileNo }),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      console.log('Student Added:', result);
      navigate('/StudentList');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };


  const updateStudent = async (id) => {
    try {
      const response = await fetch(`https://manraj-ors-1.onrender.com/student/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName, emailId, collegeId, mobileNo }),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      if (result.acknowledged) {
        console.log('Student Updated:', result);
        navigate('/StudentList');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px', backgroundColor: 'rgb(250, 248, 215)' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{title}</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='First Name' id='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              {isEmpty && !firstName && <p style={{ color: 'red' }}>First Name is required</p>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Last Name' id='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              {isEmpty && !lastName && <p style={{ color: 'red' }}>Last Name is required</p>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Login Id' id='emailId' type='email' value={emailId} onChange={(e) => setEmailId(e.target.value)} />
              </div>
              {isEmpty && !emailId && <p style={{ color: 'red' }}>Login Id is required</p>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="school me-3" size='lg' />
                <MDBInput label='College ID' id='collegeId' type='text' value={collegeId} onChange={(e) => setCollegeId(e.target.value)} />
              </div>
              {isEmpty && !collegeId && <p style={{ color: 'red' }}>College ID is required</p>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="phone me-3" size='lg' />
                <MDBInput label='Mobile No' id='mobileNo' type='text' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
              </div>
              {isEmpty && !mobileNo && <p style={{ color: 'red' }}>Mobile No is required</p>}

              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Submit</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage style={{ width: "300px" }} src="https://www.shutterstock.com/image-photo/group-happy-diverse-students-sitting-260nw-2507996197.jpg" fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default AddStudent;
