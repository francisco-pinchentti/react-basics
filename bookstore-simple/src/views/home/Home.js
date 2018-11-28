import React, { Component } from "react";

export default class Home extends Component {
    render() {
        return (
            <article>
                <h2>React demo 1: BookStore</h2>

                <h4>Summary</h4>

                <ul className="list-group">

                    <li className="list-group-item">
                        <p>A basic react + react-router-dom sample application</p>
                    </li>

                    <li className="list-group-item">
                        <p><strong>App.js</strong> takes the heavy load</p>
                        <p>Application state and behaviour is mostly managed at &lt;App&gt; component level (a sort of "main")</p>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span>state is passed among it's childrens via props</span>
                            </li>
                            <li className="list-group-item">
                                <span>along with "onChange()" style callbacks -which child components use to notify when something "interesting" happens-</span>
                            </li>
                        </ul>
                    </li>

                    <li className="list-group-item">
                        <p>An async service is used to simulate interaction with an external application</p>
                    </li>
                    
                </ul>

            </article>
        );
    }
}