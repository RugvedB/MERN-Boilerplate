import React from "react";
import { Navbar ,Nav ,NavDropdown } from "react-bootstrap"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function NavbarComponent() {

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.info('Logging out...')
    setTimeout(() => {
      window.location.href = "http://localhost:3000/login"
    },1000)
  }

  return (
    <div>
      <ToastContainer />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">ReactBoilerplate</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/OpenPage">OpenPage</Nav.Link>
            <Nav.Link href="/SecuredPage">SecuredPage</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/register">Sign Up</Nav.Link>
            <Nav.Link href="/login">
              Log In
            </Nav.Link>
            <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
