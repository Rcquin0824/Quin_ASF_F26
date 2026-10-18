import {Container, Button, Col, Row, Card} from "reactstrap";
import { Link } from "react-router-dom";

const HomePage = () => (
    <Container className="py-5">
        <Row className="align-items-center">
            <Col lg={6}>
                <p className="text-uppercase text-primary fw-bold mb-1">Airship crews welcome</p>
                <h1 className="display-4 fw-bold">Fuel Your Next Adventure</h1>
                <p className="lead text-muted my-4">
                    Fast, flavorful bento boxes prepared for bulldogs, humans, and every traveler between the clouds and the city streets.
                </p>
                <div className="d-flex gap-2">
                    <Button color="primary" size="lg" tag={Link} to="/menu">
                        <i className="fa-solid fa-utensils me-2"></i> View Menu
                    </Button>
                    <Button color="outline-dark" size="lg" tag={Link} to="/reservations">Reserve a Table</Button>
                </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" alt="Interior" className="img-fluid rounded-4 shadow" />
            </Col>
        </Row>
        <Row className="mt-5 g-4">
            {['Efficient Service', 'Trusted Quality', 'Friendly Crew'].map((title, i) => (
                <Col md={4} key={i}>
                    <Card className="h-100 border-0 shadow-sm p-3">
                        <h2 className="h5">{title}</h2>
                        <p className="text-muted small">Carefully prepared meals with clear descriptions and honest prices for every traveler.</p>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
);

export default HomePage;