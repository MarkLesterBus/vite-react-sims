import { Navbar, Container } from "react-bootstrap"
const Footer = () => {
    return (
        <Navbar fixed="bottom" className="mt-10" expand="lg" variant="light" bg="light">
            <Container>
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Footer