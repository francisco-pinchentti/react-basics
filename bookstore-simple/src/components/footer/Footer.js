import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        return (
            <footer style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 10 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span>Storage was last updated on: XXXXX</span>
                </nav>
            </footer>
        )
    }
}


