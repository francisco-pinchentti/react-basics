import React, { Component } from "react";

export default class Home extends Component {
    render() {
        return (
            <article>
                <h2>React demo 1</h2>

                <h4>Summary</h4>

                <ul className="list-group">
                    <li className="list-group-item">A basic react + react-router-dom sample application</li>
                    <li className="list-group-item">Application state is mostly managed at app (sort of "main") component level and passed among it's childrens, along with "onChange()" style callbacks</li>
                </ul>

            </article>
        );
    }
}