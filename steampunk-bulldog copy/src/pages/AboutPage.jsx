import { Col, Container, Row } from 'reactstrap';

export default function AboutPage() {
    return (
        <Container className="page-content">
            <section className="content-panel">
                <p className="eyebrow">Our story</p>
                <h1>Built for the Busy City</h1>

                <p>
                    Steampunk Bulldog Bento Bar began as a small meal station near the
                    central airship docks. Our goal was simple: serve reliable,
                    flavorful food to travelers who never have enough time.
                </p>

                <p>
                    Today, our kitchen serves humans, bulldogs, and anthropomorphic
                    animals from every district. Every meal is prepared with fresh
                    ingredients, efficient techniques, and a little mechanical
                    ingenuity.
                </p>

                <Row className="g-4 mt-3">
                    <Col md="4">
                        <h2 className="h4">
                            <i className="fa-solid fa-gears me-2" aria-hidden="true" />
                            Efficient
                        </h2>
                        <p>Our steam-powered kitchen keeps every order moving.</p>
                    </Col>

                    <Col md="4">
                        <h2 className="h4">
                            <i className="fa-solid fa-heart me-2" aria-hidden="true" />
                            Welcoming
                        </h2>
                        <p>Every customer deserves a comfortable place to recharge.</p>
                    </Col>

                    <Col md="4">
                        <h2 className="h4">
                            <i className="fa-solid fa-leaf me-2" aria-hidden="true" />
                            Fresh
                        </h2>
                        <p>Our menu uses seasonal ingredients from local sky-farms.</p>
                    </Col>
                </Row>
            </section>
        </Container>
    );
};

