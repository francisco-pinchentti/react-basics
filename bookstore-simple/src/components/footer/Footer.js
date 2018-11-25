import React, { Component } from 'react';

export default class Footer extends Component {

    render() {

        const date = (!!this.props.lastUpdateTime)
            ? this.props.lastUpdateTime.toISOString().replace(/T/, ' at ')
            : 'unknown';

        return (
            <footer style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 10 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <p>Storage was last updated on: <span className="badge badge-pill badge-info" style={{ fontSize: '110%' }}>{date}</span></p>
                </nav>
            </footer>
        )
    }
}


