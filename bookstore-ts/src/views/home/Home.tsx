import * as React from "react";

export default class Home extends React.Component {
    render() {
        return (
            <article>
                <h2>React demo 3: Redux, Thunk and Typescript</h2>

                <h4>Summary</h4>

                <ul className="list-group">

                    <li className="list-group-item">
                        <div>
                            <p>This demo integrates typescript:</p>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span>All .js files were changed to <strong>.ts</strong> for typescript modules or <strong>.tsx</strong> for react+typescript components</span>
                                </li>
                                <li className="list-group-item">
                                    <span>Stateful components now must declare a <strong>state interface</strong></span>
                                </li>
                                <li className="list-group-item">
                                    <span>Components receiving props must declare a <strong>props interface</strong></span>
                                </li>
                                <li className="list-group-item">
                                    <span>Summing up: <code>{'React.Component<P,S>'}</code> where P is a props interface and S is a state interface</span>
                                </li>
                                <li className="list-group-item">
                                    <span>typescript is not aware of redux "injected" actions -via <code>connect(fn,fn)(component)</code>-, so "Non-null assertion" and "optional props" were used ^_^</span>
                                </li>
                                <li className="list-group-item">
                                    <span>Nevertheless we took the oportunity to declare a few interfaces for redux actions and the store itself</span>
                                </li>
                                <li className="list-group-item">
                                    <span>We also installed many "@types" packages and updated some imports statements</span>
                                </li>
                                <li className="list-group-item">
                                    <span>The application was created using <code>create-react-app bookstore-ts --scripts-version=react-scripts-ts</code></span>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="list-group-item">
                        <span>Redux still manages application state</span>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span>Reducers barely changed at all</span>
                            </li>
                            <li className="list-group-item">
                                <span>Same goes for our service</span>
                            </li>
                        </ul>
                    </li>

                </ul>

            </article>
        );
    }
}