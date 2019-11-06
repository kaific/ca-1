import React, {Component} from 'react';
import {Row, Col, ListGroup, Container, Image, Modal, Button, ProgressBar} from 'react-bootstrap';

import Achievements from './achievements';
import AchiCategories from './achi_categories';

class AchievementsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.guildwars2.com/v2/achievements',
            error: null,
            category: null,
        };
        // this.changeCat = this.changeCat.bind(this);
        // this.changeAchi = this.changeAchi.bind(this);
        this.getAchiIds = this.getAchiIds.bind(this);
        this.setCat = this.setCat.bind(this);
    }

    // // FUNCTION TO CHANGE CURRENT CAT ID
    // // CALLED BY CLICKING ON CATEGORY
    // // TRIGGERS UPDATE OF COMPONENT
    // changeCat(id) {
    //     this.setState({
    //         currentCat: id
    //     });
    //     // console.log(this.state.currentCat);
    // }

    getAchiIds() {
        let cat = this.state.categories.find(cat => cat.id === this.state.currentCat);
        let achis = cat.achievements;
        
        return achis;
    }

    setCat(cat) {
        this.setState({
            category: cat
        });
    }

    componentDidUpdate() {
        console.log(this.state.category);
    }
  
    render() {
        // GET PROPERTIES FROM STATE
        const {error} = this.state;
        let {category} = this.state;
        
        // DISPLAY ERROR IF THERE IS ANY
        if (error) {
            return (
                <Container>
                    <Row>
                        <Col md={12}>
                            Error: {error.message}
                        </Col>
                    </Row>
                </Container>
            );
        }
        if(category === null) {
            return (
                <Container className="my-3">
                    <Row>
                        <Col md={4}>
                            <AchiCategories 
                                changeCat={this.changeCat}
                                setCat={this.setCat}
                            />
                            
                        </Col>
                        <Col md={8}>
                        </Col>
                    </Row>
                </Container>
            );
        }  

        // DISPLAY DATA IF LOADED
        else if(this.state.category !== null) {
            category = this.state.category;
            return (
                <Container className="my-3">
                    <Row>
                        <Col md={4}>
                            <AchiCategories 
                                changeCat={this.changeCat}
                                setCat={this.setCat}
                            />
                            
                        </Col>
                        <Col md={8}>
                            <Achievements
                                category={this.state.category}
                            />
                        </Col>
                    </Row>
                </Container>
            );
        }
        // IF DATA NOT LOADED
        else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <ProgressBar animated now={90} label={"Loading..."}/>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default AchievementsPage;