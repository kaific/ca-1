import React, {Component} from 'react';
import {Container, Row, Col, Image, ProgressBar, ListGroup, Modal, Button} from 'react-bootstrap';

import Achievement from './achievement';
import equal from 'fast-deep-equal';

class Achievements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "https://api.guildwars2.com/v2/achievements?ids=",
            achievements: [],
            error: null,
            currentAchi: null,
            showModal: false,
        };

        this.setModalShow = this.setModalShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    
    // CONTROL SHOW STATE OF ACHIEVEMENT INFO WINDOW
    setModalShow(bool) {
        this.setState({
            showModal: bool
        })
    }

    // CLOSE ACHIEVEMENT INFO WINDOW
    handleClose() {
        this.setModalShow(false);
    }

    // SHOW ACHIEVEMENT INFO WINDOW
    handleShow(id) {
        this.setModalShow(true);
        this.setState({
            currentAchi: id
        });
    }

    fetchAchievements(){
        fetch(this.state.url + this.props.category.achievements)
        // CONVERT RESPONSE TO JSON STRING
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
    }

    componentDidMount() {
        if(this.props.category !== null) {
            this.fetchAchievements();
        }
    }

    componentDidUpdate(prevProps) {
        // CHECK FOR CHANGE IN CATEGORY PROP
        if(this.props.category !== null) {
            // IF PROP CHANGED, RE-FETCH ACHIEVEMENTS
            // USES fast-deep-equal to compare objects
            // SOURCE: https://stackoverflow.com/questions/37009328/re-render-react-component-when-prop-changes
            if(!equal(this.props.category, prevProps.category)) {
                this.fetchAchievements();
            }
        }
    }

    render() {
        // GET PROPERTIES FROM STATE
        let { achievements, currentAchi, showModal, error } = this.state;
        
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
                    {// CREATE MODAL ONLY IF ACHIOBJ IS DEFINED, OTHERWISE ERROR ON FIRST TIME COMPONENT RENDERS
                    achiObj !== undefined ?
                    // DISPLAY ACHIEVEMENT INFO IN POP-UP
                    <Modal centered show={showModal} onHide={this.handleClose} animation={true}>
                        <Modal.Header closeButton>
                        <Modal.Title>{achiObj.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className="show-grid">
                                    <Col xs={2}>
                                        <Image src={achiObj.hasOwnProperty('icon') ? achiObj.icon : this.props.category.icon}/>
                                    </Col>
                                    <Col xs={10}>
                                        {achiObj.description !== "" ?
                                        <Row>
                                            <Col xs={4}>Description:</Col>
                                            <Col xs={8}>{achiObj.description}</Col>
                                        </Row>
                                        : ""}
                                        <Row>
                                            <Col xs={4}>Requirement:</Col>
                                            <Col xs={8}>{achiObj.requirement}</Col>
                                        </Row>
                                        {achiObj.tiers.length > 1 ?
                                        <Row>
                                            <Col xs={4}>Tiers:</Col>
                                            <Col xs={8}>
                                                {achiObj.tiers.map((tier, index) =>
                                                    <Row key={"tier"+(index+1)}>
                                                        <Col>{"Tier " + (index+1) + ": " + tier.count}</Col>
                                                        <Col>{"Points: " + tier.points}</Col>
                                                    </Row>
                                                )}
                                            </Col>
                                        </Row>
                                        : ""}
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
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
                            />
                        ))}
                    </ListGroup>
                </>
            );
        }
    }
}

export default Achievements;