import React, {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Logo from "../Resources/Image/Logo";

const sizeBootstrap = "md";

function HeaderApp() {
  return (
    <Navbar
      style={styles.container}
      key={sizeBootstrap}
      expand={sizeBootstrap}
      className="mb-3"
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-sizeBootstrap-${sizeBootstrap}`}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-sizeBootstrap-${sizeBootstrap}`}
          aria-labelledby={`offcanvasNavbarLabel-sizeBootstrap-${sizeBootstrap}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-sizeBootstrap-${sizeBootstrap}`}
            >
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown
                title="Dropdown"
                id={`offcanvasNavbarDropdown-sizeBootstrap-${sizeBootstrap}`}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Поиск"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

const styles = {
  container: {
    fontFamily: "ProximaNovaRegular",
    backgroundColor: "rgb(14, 44, 110)",
  },
  logo: {
    fontSize: 28,
    fontFamily: "ProximaNovaRegular",
    color: "rgb(251, 230, 72)",
  },
};

export default HeaderApp;
