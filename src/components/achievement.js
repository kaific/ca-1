import React, {Component} from 'react';
import {ListGroup, Image, Row, Col} from 'react-bootstrap';

class Achievement extends Component {
    render() {
        console.log(this.props.achi)
        return (
            <ListGroup.Item 
                action key={this.props.achi.id} 
                className="col-md-6" 
                onClick={(event) => { this.props.handleShow(this.props.achi.id);}}
            >
                <Row className="h-100">
                    <Col xs={5} xl={3} className="my-auto">
                        {this.props.achi.hasOwnProperty('icon') ?
                        <Image src={this.props.achi.icon} />
                        :
                        <Image src={this.props.category.icon} />
                        }
                    </Col>
                    <Col xs={7} xl={9} className="my-auto">
                        <Row>{this.props.achi.name}</Row>
                    </Col>
                </Row>
            </ListGroup.Item>
        )
    }
}

export default Achievement;