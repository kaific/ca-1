import React, {Component} from 'react';
import {ListGroup, Row, Col, Image} from 'react-bootstrap';

class AchiCategory extends Component {
    render() {
        return (
            <ListGroup.Item 
                action key={this.props.cat.id}
                id={this.props.cat.id}
                className="col-md-12"
                onClick={() => this.props.changeCat(this.props.cat.id)}
            >
                <Row className="h-100">
                    <Col md={3} className="my-auto"><Image src={this.props.cat.icon} /></Col>
                    <Col md={9} className="my-auto">
                        {this.props.cat.name}
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    }
}



export default AchiCategory;