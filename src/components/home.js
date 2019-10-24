import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import TabBar from './tabbar';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>This is the home page.</h2>
            </div>
        );
    }
}

export default Home;