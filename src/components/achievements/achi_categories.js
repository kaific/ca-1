import React, {Component} from 'react';
import {ListGroup, Row, Col, ProgressBar} from 'react-bootstrap';

import AchiCategory from './achi_category';

class AchiCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.guildwars2.com/v2/achievements',
            groups: [],
            categories: [],
            error: null,
            activeGroups: {},
        }
        // ALLOW FUNCTIONS ACCESS TO (THIS) OF COMPONENT
        this.changeCat = this.changeCat.bind(this);
        this.changeGroupStatus = this.changeGroupStatus.bind(this);

    }
    // CHANGE CURRENT CATEGORY IN PARENT COMPONENT "ACHIEVEMENTSPAGE"
    changeCat(id) {
        this.props.setCat(
            this.state.categories.find(
                cat => cat.id === id
            )
        );
    }

    // SORT JSON ARRAY BY OBJECT ATTRIBUTE
    // SOURCE: https://stackoverflow.com/questions/21131224/sorting-json-object-based-on-attribute
    sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    // FUNCTION TO REVERSE VISIBILITY STATUS OF GROUP'S CATEGORIES
    changeGroupStatus(key) {
        let ag = this.state.activeGroups;
        ag[key] = !ag[key];
        this.setState({
            activeGroups: ag
        });
    }

    componentDidMount() {
        // GET CATEGORY IDS FROM API
        fetch(this.state.url + "/categories")
        // CONVERT RESPONSE TO JSON STRING
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
                        });
                    }
                )
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )
        // FETCH CATEGORY GROUP IDS
        fetch(this.state.url + "/groups")
        // CONVERT RESPONSE TO JSON STRING
        .then(res => res.json())
        .then(
            (result) => {
                // GET GROUP OBJECTS
                fetch(this.state.url + "/groups?ids=" + result)
                .then(res => res.json())
                .then(
                    (result) => {
                        let g = {};
                        result.map(group => {
                            let name = group.name;
                            return g[name] = false;
                        });
                        this.setState({
                            // UPDATE STATE AND SORT GROUPS BY 'ORDER' PROPERTY (AS THEY APPEAR IN THE GAME THIS API BELONGS TO)
                            groups: this.sortByKey(result, 'order'),
                            activeGroups: g
                        })
                    }
                )
            }
        )
    }

    render() {
        let {groups, categories, error, activeGroups} = this.state;
        if(error) {
            return (
                <Row>
                    <Col md={12}>
                        Error: {error.message}
                    </Col>
                </Row>
            );
        }
        else if(categories.length > 0 && groups.length > 0) {

            // this.setActiveGroups(g);

            // MAP EACH GROUP AND CREATE NEW ARRAY ATTRIBUTE "categoriesObjs"
            groups.map(group => {
                group.categoryObjs = [];
                // MAP EACH CATEGORY, CHECK IF ITS ID IS FOUND IN CATEGORIES ARRAY
                // OF GROUP, IF IT IS, ADD THE CATEGORY OBJECT TO "categoriesObj" ARRAY
                return categories.map(category => {
                    if(group.categories.includes(category.id)) {
                        return group.categoryObjs.push(category)
                    }
                    else return null;
                })
            });

            return (
                <ListGroup className="d-flex flex-row flex-wrap">
                    {
                    // MAP EACH GROUP TO DISPLAY DATA
                    groups.map(group => (
                        <React.Fragment key={group.id}>
                            <ListGroup.Item 
                            action key={group.name}
                            id={group.name}
                            className="col-lg-12"
                            onClick={() => this.changeGroupStatus(group.name)}
                            >
                                {group.name}
                            </ListGroup.Item>
                            
                            <ListGroup className={"flex-row flex-wrap offset-1" + (!activeGroups[group.name] ? " d-none" : "")}>
                                {
                                // MAP THROUGH CATEGORIES ARRAY INSIDE EACH GROUP
                                // AND DISPLAY DATA
                                group.categoryObjs.map(cat => (
                                    // DO NOT DISPLAY SEASONAL CATEGORIES
                                    // WITH NO ACHIEVEMENTS IN ARRAY (API CALL WILL HAVE NO ID REF)
                                    cat.achievements.length > 0 ?
                                    <AchiCategory
                                        key={cat.id}
                                        cat={cat}
                                        changeCat={this.changeCat}
                                    />
                                    : ""
                                ))
                                }
                            </ListGroup>
                        </React.Fragment>
                    ))
                    }
                </ListGroup>
            );
        }
        else {
            return (
                <Row>
                    <Col>
                        <ProgressBar animated now={90} label={"Loading Categories..."}/>
                    </Col>
                </Row>
            );
        }
    }
}

export default AchiCategories;