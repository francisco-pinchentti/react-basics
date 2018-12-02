import React, { Component } from "react";

export default class Home extends Component {
    render() {
        return (
            <article>
                <h2>React demo 2: Redux + Thunk</h2>

                <h4>Summary</h4>

                <ul className="list-group">

                    <li className="list-group-item">
                        <p> .... </p>
                    </li>

                    <li className="list-group-item">
                        <p><strong>App.js</strong> ...</p>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span></span>
                            </li>
                        </ul>
                    </li>

                    <li className="list-group-item">
                        <p>An async service is still used to simulate interaction with an external application</p>
                    </li>
                    
                </ul>

            </article>
        );
    }
}