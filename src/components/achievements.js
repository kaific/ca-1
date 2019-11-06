import React, {Component} from 'react';
import {Row, Col, ProgressBar, ListGroup, Modal, Button} from 'react-bootstrap';

import Achievement from './achievement';

class Achievements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "https://api.guildwars2.com/v2/achievements?ids=",
            achievements: [],
            error: null,
            currentAchi: null,
            category: null,
            showModal: false,
        };

        this.setCat = this.setCat.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    setCat(cat) {
        this.setState({
            category: cat
        });
        // console.log(this.state.currentCat);
    }

    setModalShow(bool) {
        this.setState({
            showModal: bool
        })
    }

    handleClose() {
        this.setModalShow(false);
    }

    handleShow(id) {
        this.setModalShow(true);
        this.setState({
            currentAchi: id
        });
    }

    componentDidMount() {
        if(this.props.category !== null) {
            fetch(this.state.url + this.props.category.achievements)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        achievements: result
                    });
                },
                (error) => {
                    this.setState({
                        error
                    })
                }
            )
            console.log(this.state.achievements);
        }
    }

    render() {
        // GET PROPERTIES FROM STATE
        let { achievements, category, currentAchi, showModal, error } = this.state;
        
        // DISPLAY ERROR IF THERE IS ANY
        if (error) {
            return (
                <>
                    <Row>
                        <Col md={12}>
                            Error: {error.message}
                        </Col>
                    </Row>
                </>
            );
        }
        else if (achievements.length === 0) {
            return (
                <>
                    <Row>
                        <Col>
                            <ProgressBar animated now={90} label={"Loading Achievements..."}/>
                        </Col>
                    </Row>
                </>
            );
        }
        else {

            // CURRENT ACHIEVEMENT OBJECT
            const achiObj = achievements.find(achi => achi.id === currentAchi);
            return (
                <>
                    {// CREATE MODAL ONLY IF ACHIOBJ IS DEFINED, OTHERWISE ERROR ON FIRST TIME COMPONENT MOUNTS
                    achiObj !== undefined ?
                    // DISPLAY ACHIEVEMENT INFO IN POP-UP
                    <Modal centered show={showModal} onHide={this.handleClose} animation={true}>
                        <Modal.Header closeButton>
                        <Modal.Title>{achiObj.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{achiObj.description}</Modal.Body>
                        <Modal.Footer>
                        <Button variant="outline-primary" onClick={this.handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    :
                    ""}
                    <ListGroup className="d-flex flex-row flex-wrap">
                        {achievements.map(achi => (
                            <Achievement 
                                key={achi.id}
                                category={this.props.category}
                                achi={achi}
                                handleClose={this.handleClose}
                                handleShow={this.handleShow}
                                // changeAchi={this.changeAchi}
                            />
                        ))}
                    </ListGroup>
                </>
            );
        }
    }
}

export default Achievements;