import React, {Component} from 'react';
import {ListGroup, Row, Col, Image} from 'react-bootstrap';

class AchiCategory extends Component {
    render() {
        return (
            <ListGroup.Item 
                action key={this.props.cat.id}
                id={this.props.cat.id}
                onClick={() => this.props.changeCat(this.props.cat.id)}
                title={this.props.cat.name}
            >
                <Row className="h-100">
                    <Col md={12} lg={4} xl={3} className="my-auto text-center"><Image src={this.props.cat.icon} alt={this.props.cat.name} /></Col>
                    <Col lg={8} xl={9} className="my-auto d-none d-lg-block">
                        {this.props.cat.name}
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    }
}

export default AchiCategory;