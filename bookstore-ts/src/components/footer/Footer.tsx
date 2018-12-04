import * as React from 'react';

interface FooterProps {
    lastUpdateTime?: Date
}

export default class Footer extends React.Component<FooterProps> {

    public render() {

        const date = (!!this.props.lastUpdateTime)
            ? this.props.lastUpdateTime.toISOString().replace(/T/, ' at ')
            : 'unknown';

        return (
            <footer style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 10 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <p>State was last updated on: <span className="badge badge-pill badge-info" style={{ fontSize: '110%' }}>{date}</span></p>
                </nav>
            </footer>
        )
    }
}
