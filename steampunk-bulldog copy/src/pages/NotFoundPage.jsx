import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

export default function NotFoundPage() {
    return (
        <Container className="page-content text-center">
            <section className="content-panel">
                <p className="eyebrow">Wrong landing dock</p>
                <h1 className="display-1 fw-bold">404</h1>
                <h2>Page Not Found</h2>
                <p>
                    The page you are looking for may have drifted away on an airship.
                </p>
                <Button color="primary" tag={Link} to="/">
                    Return Home
                </Button>
            </section>
        </Container>
    );
}
