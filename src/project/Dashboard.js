import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const logout = () => {
    console.log("logout");
    localStorage.clear();
    window.location.pathname = "/Login";
  };

  let auth = localStorage.getItem("token");
  auth = JSON.parse(auth);
  console.log(auth);

  return (
    <Navbar expand="lg" className='nav'>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!auth ? (
            <Nav className="me-auto">
              <Link className='nav-link' to="/Login">Login</Link>
              <Link className='nav-link' to="/Registration">Registration</Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Link className='nav-link' to="/">Home</Link>

              {/* User */}
              <NavDropdown title="User" id="basic-nav-dropdown">
                <Link className='nav-link' to="/AddUser">Add User</Link>
                <Link className='nav-link' to="/UserList">User List</Link>
              </NavDropdown>

              {/* College */}
              <NavDropdown title="College" id="basic-nav-dropdown">
                <Link className='nav-link' to="/AddCollege">Add College</Link>
                <Link className='nav-link' to="/CollegeList">College List</Link>
              </NavDropdown>

              {/* Student */}
              <NavDropdown title="Student" id="basic-nav-dropdown">
                <Link className='nav-link' to="/AddStudent">Add Student</Link>
                <Link className='nav-link' to="/StudentList">Student List</Link>
              </NavDropdown>

              {/* Marksheet */}
              <NavDropdown title="Marksheet" id="basic-nav-dropdown">
                <Link className='nav-link' to="/AddMarksheet">Add Marksheet</Link>
                <Link className='nav-link' to="/MarksheetList">Marksheet List</Link>
              </NavDropdown>

              {/* Role */}
              <NavDropdown title="Role" id="basic-nav-dropdown">
                <Link className='nav-link' to="/AddRole">Add Role</Link>
                <Link className='nav-link' to="/RoleList">Role List</Link>
              </NavDropdown>
              
              <span className='nav-link' style={{ cursor: "pointer" }} onClick={logout}>Logout</span>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Dashboard;