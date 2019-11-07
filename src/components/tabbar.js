import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, Image} from 'react-bootstrap';

// import Achievements from './achievements';

class TabBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Link to="/">
                    <Navbar.Brand>
                        <Image src="https://wiki.guildwars2.com/images/d/df/GW2Logo_new.png" style={{width: 2.5 + 'rem'}} /> Guild Wars 2 API
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/achievements" className="nav-link">Achievements</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default TabBar;