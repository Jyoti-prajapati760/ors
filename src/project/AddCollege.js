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

function AddCollege() {
  const [collegeName, setcollegeName] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const { id } = useParams();
  let navigate = useNavigate();

  // Edit college logic when id is passed as a URL param
  useEffect(() => {
    if (id) {
      editCollege(id);
      
      const collegeEditElement = document.querySelector("#collegeedit");
      if (collegeEditElement) {
        collegeEditElement.innerHTML = "Edit college";
      }
    }
  }, [id]);

  // Submit button logic
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmpty(true);

    // Validate that all fields are filled
    if(!collegeName || !address || !city || !mobileNo) {
      return;
    }

    if (id) {
      updateCollege(id);
    } else {
      addCollege();
    }
  };

  // Function to add new college (POST request)
  const addCollege = () => {
    fetch('https://manraj-ors-1.onrender.com/college', {
      method: 'POST',
      body: JSON.stringify({collegeName, address, city, mobileNo}),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        navigate('/CollegeList');
      })
      .catch((error) => console.error('Error:', error));
  };

  // Function to update college (PUT request)
  const updateCollege = (id) => {
    fetch('https://manraj-ors-1.onrender.com/college/' + id, {
      method: 'PUT',
      body: JSON.stringify({ collegeName, address, city, mobileNo }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(json => {
        if (json.acknowledged) {
          navigate('/CollegeList');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // Fetch college data for editing (use correct API endpoint for college data)
  const editCollege = (id) => {
    fetch('https://manraj-ors-1.onrender.com/college/' + id)
      .then(response => response.json())
      .then(result => {
        setcollegeName(result.colllegeName);
        setaddress(result.address);
        setcity(result.city);
        setmobileNo(result.mobileNo);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px', backgroundColor: 'rgb(250, 248, 215)' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" id="collegeedit">Add College</p>

              {/* college Name */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="college me-3" size='lg' />
                <MDBInput label='College Name' id='collegeName' type='text' value={collegeName} onChange={(e) => setcollegeName(e.target.value)} />
              </div>
              {(isEmpty && !collegeName) && <p style={{ color: 'red' }}>College Name is required</p>}

              {/* address */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="college me-3" size='lg' />
                <MDBInput label='Address' id='address' type='text' value={address} onChange={(e) => setaddress(e.target.value)} />
              </div>
              {(isEmpty && !address) && <p style={{ color: 'red' }}>Address is required</p>}


              {/* city */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='City' id='city' type='text' value={city} onChange={(e) => setcity(e.target.value)} />
              </div>
              {(isEmpty && !city) && <p style={{ color: 'red' }}>city is required</p>}


              {/* mobile number */}
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Mobile Number' id='mobileNo' type='number' value={mobileNo} onChange={(e) => setmobileNo(e.target.value)} />
              </div>
              {(isEmpty && !mobileNo) && <p style={{ color: 'red' }}>Mobile Number is required</p>}



              {/* Submit Button */}
              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Submit</MDBBtn>

            </MDBCol>

            {/* Image */}
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>

              <MDBCardImage style={{ width: "300px" }} src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?cs=srgb&dl=pexels-olly-3762800.jpg&fm=jpg" fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default AddCollege;

