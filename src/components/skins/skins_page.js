import React, {Component} from 'react';
import {Container, Row, Col, ProgressBar} from 'react-bootstrap';

import SkinTypes from './skin_types';
import Skins from './skins';

class SkinsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.guildwars2.com/v2/skins',
            skins: [],
            types: [],
            currentType: null,
        };
        // BIND THIS (COMPONENT) TO FUNCTIONS
        this.setType = this.setType.bind(this);
    }

    // FUNCTION TO CHANGE CURRENT TYPE OF SKINS
    // CALLED WHEN TYPE IS CLICKED (ARMOR, GATHERING, WEAPON)
    // TRIGGERS COMPONENT UPDATE OF SKINS
    setType(type) {
        this.setState({
            currentType: type
        });
    }

    componentDidMount() {
        // FETCH IDS OF ALL EXISTENT SKINS
        fetch(this.state.url)
        // CONVERT RESPONSE TO JSON STRING
        .then(res => res.json())
        .then(
            (result) => {
                // CALCULATE NUMBER OF REQUIRED PAGES
                // FOR MULTIPLE API CALLS NEEDED TO FETCH
                // ALL SKIN OBJECTS; MAX 200 OBJECT PER CALL
                let pages = Math.ceil(result.length/200);

                // ARRAY TO STORE OBJECTS
                let skins = [];

                // LOOP TO GET ALL OBJECTS
                for(let i = 0; i < pages; i++) {
                    // ON FIRST ITERATION, SET ARRAY TO
                    // FIRST RESPONSE
                    if(i === 0) {
                        fetch(this.state.url + `?page_size=200&page=${i}`)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                skins = result;
                            }
                        );
                    }
                    // ON ALL SUBSEQUENT ITERATIONS CONCATENATE
                    // RESPONSE TO THE ARRAY
                    else {
                        fetch(this.state.url + `?page_size=200&page=${i}`)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                skins = skins.concat(result);

                                // VARIABLE FOR STORAGE OF ALL POSSIBLE
                                // SKIN TYPES
                                let types = [];

                                // ON THE LAST ITERATION MAP THROUGH
                                // THE SKINS ARRAY AND PUSH EACH NEW
                                // UNIQUE TYPE TO THE TYPES ARRAY
                                if(i === pages-1) {
                                    skins.map(
                                        skin => {
                                            if(!types.includes(skin.type)) {
                                                return types.push(skin.type)
                                            }
                                            else return null;
                                        }
                                    );
                                    // FINALLY, SET STATE ATTRIBUTES
                                    this.setState({
                                        skins, types
                                    });
                                }
                            }
                        );
                    }
                }
            },
        )
    }

    render() {
        // ARRAY FOR STORAGE OF SKINS ONLY
        // OF CURRENTLY SELECTED SKIN TYPE
        let skins = [];
        // GET CURRENT SELECTED TYPE FROM STATE
        let {currentType} = this.state;

        // LOOP THROUGH ALL SKIN OBJECTS SAVED
        // IN STATE AND PUSH ONLY THOSE OF
        // SELECTED TYPE INTO SKINS ARRAY
        this.state.skins.map(
            skin => {
                if(skin.type === currentType) {
                    return skins.push(skin);
                }
                else return null;
            }
        );

        // CHECK IF TYPES ARRAY IN STATE IS NOT
        // NULL TO PREVENT ERROR ON INITIAL MOUNT
        if(this.state.types !== null) {
            return (
                <Container className="my-3">
                    <Row className="height-100">
                        <Col xs={5} md={4}>
                            <SkinTypes
                                setType={this.setType}
                                types={this.state.types}
                            />
                            
                        </Col>
                        <Col xs={7} md={8} className="scrollable">
                            {this.state.currentType !== null ?
                            <Skins
                            skins={skins}
                            type={this.state.currentType}
                            />
                            :
                            <h3>Select a skin type.</h3>
                            }
                        </Col>
                    </Row>
                </Container>
            );
        }
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

export default SkinsPage;