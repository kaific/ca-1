import React, {Component} from 'react';
import {ListGroup, Image, Row, Col} from 'react-bootstrap';

class Achievement extends Component {
    render() {
        return (
            <ListGroup.Item 
                action key={this.props.achi.id} 
                className="col-md-6" 
                onClick={(event) => { this.props.handleShow(this.props.achi.id);}}
            >
                <Row className="h-100">
                    <Col md={3} className="my-auto">
                        {this.props.achi.hasOwnProperty('icon') ?
                        <Image src={this.props.achi.icon} />
                        :
                        <Image src={this.props.category.icon} />
                        }
                    </Col>
                    <Col md={9} className="my-auto">{this.props.achi.name}</Col>
                </Row>
            </ListGroup.Item>
        )
    }
}

export default Achievement;