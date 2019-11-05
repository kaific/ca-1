import React, {Component} from 'react';

import {Row, Col, ListGroup, Container, Image, Modal, Button} from 'react-bootstrap';

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.guildwars2.com/v2/achievements',
            error: null,
            isLoaded: false,
            categories: [],
            achievements: [],
            currentCat: 1,
            currentAchi: null,
            showModal: false,
        };
        this.changeCat = this.changeCat.bind(this);
        this.changeAchi = this.changeAchi.bind(this);
        this.getAchiIds = this.getAchiIds.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    // FUNCTION TO CHANGE CURRENT CAT ID
    // CALLED BY CLICKING ON CATEGORY
    // TRIGGERS UPDATE OF COMPONENT
    changeCat(id) {
        this.setState({
            currentCat: id
        });
        // console.log(this.state.currentCat);
    }

    changeAchi(id) {
        this.setState({
            currentAchi: id
        });
        // console.log(this.state.currentAchi);
    }
    
    // FUNCTION TO RETRIEVE ARRAY OF ACHI IDS OF CURRENT CAT
    // CALLED WITHIN FETCH() FOR CURRENT CATEGORY'S ACHIEVEMENTS
    getAchiIds() {
        let cat = this.state.categories.find(cat => cat.id === this.state.currentCat);
        let achis = cat.achievements;
        
        return achis;
    }

    setModalShow(bool) {
        this.setState({
            showModal: bool
        })
    }

    handleClose() {
        this.setModalShow(false);
    }

    handleShow() {
        this.setModalShow(true);
    }

    componentDidMount() {
        // GET CATEGORY IDS FROM API
        fetch(this.state.url + "/categories")
        .then(res => res.json())
        .then(
            (result) => {
                // GET CATEGORY OBJECTS
                fetch(this.state.url + "/categories?ids=" + result)
                .then(res => res.json())
                .then(
                    (result) => {
                        // SAVE CAT. OBJECTS TO STATE
                        this.setState({
                            categories: result,
                            isLoaded: true
                        })
                    }
                )
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentDidUpdate() {
        // GET CURRENT CATEGORY'S ACHIEVEMENTS' IDS
        fetch(this.state.url + "?ids=" + this.getAchiIds())
        .then(res => res.json())
        .then(
            (result) => {
                // SAVE ACHIEVEMENTS OF CURRENT CATEGORY IN STATE
                this.setState({
                    achievements: result,
                    isLoaded: true
                })
                
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
  
    render() {
        // GET ARRAYS FROM STATE
        const { error, isLoaded, achievements, categories, currentCat, currentAchi, showModal } = this.state;
        
        // DISPLAY ERROR IF THERE IS ANY
        if (error) {
            return <div className="row col-12">Error: {error.message}</div>;
        }
        // BEFORE DATA IS LOADED 
        else if (!isLoaded) {
            return <div className="row col-12">Loading...</div>;
        }
        // DISPLAY DATA IF ISLOADED IS SET TO TRUE
        else if(achievements.length > 0) {
            const catObj = categories.find(cat => cat.id === currentCat);
            // console.log(achievements)
            const achiObj = achievements.find(achi => achi.id === currentAchi);

            return (
                <Container className="my-3">
                    {achiObj !== undefined ?
                    <Modal centered show={showModal} onHide={this.handleClose} animation={false}>
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
                    <Row>
                        <Col md={4}>
                            <ListGroup className="d-flex flex-row flex-wrap">
                                {// MAP THROUGH CATEGORIES ARRAY AND DISPLAY DATA
                                categories.map(cat => (
                                    // DO NOT DISPLAY SEASONAL CATEGORIES
                                    // WITH NO ACHIEVEMENTS IN ARRAY (API CALL WILL HAVE NO ID REF)
                                    cat.achievements.length > 0 ?
                                    <ListGroup.Item action key={cat.id} id={cat.id} className="col-md-12" onClick={() => this.changeCat(cat.id)}>
                                        <Row className="h-100">
                                            <Col md={3} className="my-auto"><Image src={cat.icon} /></Col>
                                            <Col md={9} className="my-auto">
                                                <div>{cat.name}</div>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    : ""
                                ))
                                }
                            </ListGroup>
                        </Col>
                        <Col md={8}>
                            <ListGroup className="d-flex flex-row flex-wrap">
                                {achievements.map(achi => (
                                    <ListGroup.Item 
                                        action key={achi.id} 
                                        className="col-md-6" 
                                        onClick={(event) => { this.handleShow(); this.changeAchi(achi.id);}}
                                    >
                                        <Row className="h-100">
                                            <Col md={3} className="my-auto">
                                                {achi.hasOwnProperty('icon') ?
                                                <Image src={achi.icon} />
                                                :
                                                <Image src={catObj.icon} />
                                                }
                                            </Col>
                                            <Col md={9} className="my-auto">{achi.name}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            return <div className="row col-12">Loading...</div>;
        }
    }
}

export default Achievements;