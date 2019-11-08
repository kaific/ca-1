import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';

class SkinTypes extends Component {
    render() {
        return (
            <ListGroup className="d-flex flex-row flex-wrap">
            {
            this.props.types.map(type =>
                type !== "Back" ?
                <ListGroup.Item 
                    action key={type}
                    id={type}
                    className="col-lg-12"
                    onClick={() => this.props.setType(type)}
                    >
                        {type}
                    </ListGroup.Item>
                : ""
            )
            }
            </ListGroup>
        )
    }
}

export default SkinTypes;