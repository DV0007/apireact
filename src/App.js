import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function App() {
  const [datos, setDatos] = useState(null);
  const [puntaje, setPuntaje] = useState(10);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/image');
      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mezclarOpciones = () => {
    const opciones = [...datos.razas_incorrectas, datos.raza_correcta];
    opciones.sort(() => Math.random() - 0.5);
    return opciones;
  };

  const handleClick = (raza) => {
    if (raza === datos.raza_correcta) {
      setPuntaje(prevPuntaje => prevPuntaje + 2);
      obtenerDatos();
      alert('¡Correcto!');
    } else {
      setPuntaje(prevPuntaje => prevPuntaje - 2);
      if (puntaje <= 0) {
        setPuntaje(prevPuntaje => prevPuntaje + 12)
      }
      alert('Incorrecto');
    }
  };

  if (!datos) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
          </Col>
          <Col md="auto"><Image src={datos.imagen_perro} rounded width="400" height="400" /></Col>
          <Col xs lg="2">
          </Col>

          <ButtonGroup aria-label="Basic example">
            {mezclarOpciones().map((raza, index) => (
              <Button key={index} onClick={() => handleClick(raza)} className="m-2">
                {raza}
              </Button>
            ))}
          </ButtonGroup>
        </Row>
        <Row className="justify-content-md-center mt-3">
          <Col>
            <h3>Puntaje: {puntaje}</h3>
          </Col>
        </Row>
      </Container>
    </div >

  );
}

export default App;
