import React, {Component} from 'react';
import {Row, Col, ProgressBar, ListGroup, Image} from 'react-bootstrap';
import equal from 'fast-deep-equal';

class Skins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: null,
            active: {},
        }
        this.setDetails = this.setDetails.bind(this);
        this.setActivity = this.setActivity.bind(this);
    }

    // FUNCTION FOR CHANGING VISIBILITY OF
    // SKIN SUBTYPES, CALLED ON CLICK OF SUBTYPE
    setActivity(key) {
        let active = this.state.active;
        // REVERSE BOOLEAN VALUE
        active[key] = !active[key];
        this.setState({
            active
        });
    }

    // FUNCTION FOR INITIAL SETUP OF COMPONENT'S
    // STATE ATTRIBUTES OF SUBTYPES AND VISIBILITY STATUS
    // OF EACH SUBTYPE; FOR USE ON MOUNT AND UPDATE
    // (CALLED WHEN A TYPE IS CLICKED IN TYPE COMPONENT)
    setDetails() {
        let types = [];
        let active = {};
        let skins = this.props.skins;

        skins.map(skin => {
            if(!types.includes(skin.details.type)) {
                return types.push(skin.details.type);
            }
            else return null;
        });

        types.map(type => {
            let name = type;
            return active[name] = false;
        });

        this.setState({
            types, active
        });
    }

    componentDidMount() {
        this.setDetails();
    }
    
    componentDidUpdate(prevProps) {
        // CHECK IF TYPE PASSED TO PROPS CHANGED
        // TO AVOID INFINITE LOOP
        if(!equal(this.props.type, prevProps.type)) {
            this.setDetails();
        }
    }

    render() {
        if(this.state.types !== null) {
            return (
                <>
                <ListGroup className="d-flex flex-row flex-wrap">
                {
                this.state.types.map(type =>
                    type !== "SmallBundle" &&
                    type !== "LargeBundle"
                    ?
                    <React.Fragment key={type}>
                    <ListGroup.Item 
                        action
                        id={type}
                        className="col-lg-12"
                        onClick={() => this.setActivity(type)}
                    >
                        {type}
                    </ListGroup.Item>
                    {/* 
                        CHECK VISIBILITY STATUS OF SUBTYPE
                        IF TRUE, MAP SKINS ONLY OF VISIBLE SUBTYPE TO
                        ICON OF THE SKIN, ONLY IF THE ICON IS NOT OF
                        A PLACEHOLDER FOR DEVELOPMENT (HARDCODED URLS)
                    */}
                    {this.state.active[type] ? 
                        this.props.skins.map(skin => 
                            skin.details.type === type &&
                            skin.details.icon !== "https://render.guildwars2.com/file/216B62605406DA976965A880F426F03ED6AFC178/61771.png" &&
                            skin.details.icon !== "https://render.guildwars2.com/file/4AECE5EA59CA057F4C53E1EDFE95E0E3E61DE37F/60980.png" &&
                            skin.details.icon !== "https://render.guildwars2.com/file/BF7AF3A619956A11E50AE7CDCCA93F19B6F19DD4/960304.png"
                            ?
                            <Image
                                key={skin.id}
                                src={skin.icon}
                                title={skin.name}
                                style={{maxWidth: "64px"}}
                            />
                            : ""
                        )
                    : ""}
                    </React.Fragment>
                    : ""
                )
                }
                </ListGroup>
                </>
            );
        }
        else return (
            <Row>
                <Col>
                    <ProgressBar animated now={90} label={"Loading..."}/>
                </Col>
            </Row>
        );
    }
}

export default Skins;