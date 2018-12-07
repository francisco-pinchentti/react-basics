import React, { Component } from "react";

export default class Home extends Component {
    render() {
        return (
            <article>
                <h2>React demo 2: Redux + Thunk</h2>

                <h4>Summary</h4>

                <ul className="list-group">

                    <li className="list-group-item">
                        <span>Redux now manages application state</span>
                    </li>

                    <li className="list-group-item">
                        <div>
                            <span>This allowed us to</span>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span><strong>decrease the amount of function and props</strong> passed from "parent" components to "child" components</span>
                                </li>
                                <li className="list-group-item">
                                    <span><strong>Decouple component and services</strong></span>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <span>Now component dispatch actions</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>and reducers make the last call on what happens to application state</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>An async service is still used to simulate interaction with an external application, but now it's used by redux actions thanks to <strong>redux-thunk</strong></span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>

            </article>
        );
    }
}