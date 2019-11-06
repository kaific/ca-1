import React, {Component} from 'react';
import {ListGroup, Row, Col, ProgressBar} from 'react-bootstrap';

import AchiCategory from './achi_category';

class AchiCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.guildwars2.com/v2/achievements/categories',
            categories: [],
            error: null,
            currentCat: 1,
        }
        this.changeCat = this.changeCat.bind(this);
    }

    changeCat(id) {
        this.setState({
            currentCat: id
        });

        this.props.setCat(
            this.state.categories.find(
                cat => cat.id === id
            )
        );
    }

    componentDidMount() {
        // GET CATEGORY IDS FROM API
        fetch(this.state.url)
        .then(res => res.json())
        .then(
            (result) => {
                // GET CATEGORY OBJECTS
                fetch(this.state.url + "?ids=" + result)
                .then(res => res.json())
                .then(
                    (result) => {
                        // SAVE CAT. OBJECTS TO STATE
                        this.setState({
                            categories: result,
                        });
                        this.props.setCat(this.state.categories[0]);
                    }
                )
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )
    }

    render() {
        const {categories, error} = this.state;
        if(error) {
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
        else if(categories.length > 0) {
            return (
            <>
                <ListGroup className="d-flex flex-row flex-wrap">
                    {// MAP THROUGH CATEGORIES ARRAY AND DISPLAY DATA
                    categories.map(cat => (
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
            </>
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