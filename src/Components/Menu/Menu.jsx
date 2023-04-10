import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./main.css"
import img from "../../images/1200.png"
import { Link } from 'react-router-dom';
 

function Menu() {
  return (
    <Navbar  expand="lg"  fixed="top" className='navbar'>
      <Container>
      <Link to='/transparencia/'>
          <img src={img}
                  width="200"
                  className="d-inline-block align-top"
                  alt="intervencao logo"
                  />
      </Link>
      
      
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
   
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
  );
}

export default Menu;