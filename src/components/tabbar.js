import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// import Achievements from './achievements';

class TabBar extends Component {
    render() {
        return (
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/achievements">Achievements</Link></li>
                    </ul>

                    <hr/>
                </div>
        );
    }
}

export default TabBar;