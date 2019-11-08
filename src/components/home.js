import React, {Component} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <Container className="h-100 py-5 my-5">
                <Row className="text-center">
                    <Col>
                        <Link to="/achievements" className="nav-link">
                            <Card>
                                <Card.Body>
                                    Achievements
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/skins" className="nav-link">
                            <Card>
                                <Card.Body>
                                    Skins
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;