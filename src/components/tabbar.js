import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Navbar, Nav, Image} from 'react-bootstrap';

// import Achievements from './achievements';

class TabBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Link to="/">
                    <Navbar.Brand>
                        <Image src="https://wiki.guildwars2.com/images/d/df/GW2Logo_new.png" style={{width: 2.5 + 'rem'}} />
                        {'Guild Wars 2 API'}
                    </Navbar.Brand>
                </Link>
                {this.props.location.pathname !== "/" ?
                <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" className="nav-link">{'Home'}</Link>
                        <Link to="/achievements" className={this.props.location.pathname === "/achievements" ? "nav-link active" : "nav-link"}>{'Achievements'}</Link>
                        <Link to="/skins" className={this.props.location.pathname === "/skins" ? "nav-link active" : "nav-link"}>{'Skins'}</Link>
                    </Nav>
                </Navbar.Collapse> 
                </>
                : ""}
            </Navbar>
        );
    }
}

// EXPORT USING WITHROUTER TO ACCESS LOCATION PATH
export default withRouter(TabBar);