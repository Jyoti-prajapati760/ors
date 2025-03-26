import React, { useState } from 'react';
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

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async () => {
    console.log("handleSubmit", { loginId, password });

    try {
      const response = await fetch("https://manraj-ors-1.onrender.com/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ loginId, password })
      });
      const result = await response.json();
      console.log("Result :", result.message);

      if (result.message === 'No result found') {
        setMsg(result.message);
        console.log("If run");
      } else if (result.message === "Enter LoginId And Password") {
        setIsTrue(true);
        console.log(result.message);
      } else {
        localStorage.setItem("token", JSON.stringify(result));
        window.location.pathname = "/";
      }
    } catch (error) {
      console.log("This is a catch error :", error);
    }
  };

  return (
    <>
       <MDBContainer fluid>
           <MDBCard className='text-black m-5' style={{ borderRadius: '25px', backgroundColor: 'rgb(250, 248, 215)' }}>
             <MDBCardBody>
               <MDBRow>
                 <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                   <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" id="useredit">Login From</p>
     
                   {/* Login ID */}
                   <div className="d-flex flex-row align-items-center mb-4">
                     <MDBIcon fas icon="envelope me-3" size='lg' />
                     <MDBInput label='Login Id' id='loginId' type='email' value={loginId} onChange={(e) => setLoginId(e.target.value)} />
                   </div>
                   {(isTrue && !loginId) && <p style={{ color: 'red' }}>Login Id is required</p>}
     
     
                   {/* Password */}
                   <div className="d-flex flex-row align-items-center mb-4">
                     <MDBIcon fas icon="lock me-3" size='lg' />
                     <MDBInput label='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                   </div>
                   {(isTrue && !password) && <p style={{ color: 'red' }}>Password is required</p>}
     
     
                
     
     
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
    </>
  );
};

export default Login;
