import React, {Component} from 'react';
import {Row, Col, Container, ProgressBar} from 'react-bootstrap';

import Achievements from './achievements';
import AchiCategories from './achi_categories';

class AchievementsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.guildwars2.com/v2/achievements',
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

    render() {
        // GET PROPERTIES FROM STATE
        let {category} = this.state;
        
        if(category === null) {
            return (
                <Container className="my-3">
                    <Row>
                        <Col xs={5} md={4} className="scrollable">
                            <AchiCategories 
                                changeCat={this.changeCat}
                                setCat={this.setCat}
                            />
                            
                        </Col>
                        <Col xs={7} md={8} className="text-center">
                            <h3>Select an achievement category.</h3>
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
                    <Row className="height-100">
                        <Col xs={5} md={4} className="scrollable">
                            <AchiCategories 
                                setCat={this.setCat}
                            />
                            
                        </Col>
                        <Col xs={7} md={8} className="scrollable">
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