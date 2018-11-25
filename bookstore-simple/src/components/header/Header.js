import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

export const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ paddingBottom: 0, paddingTop: 0 }}>
            <span className="navbar-brand">
                <img src={logo} style={{ height: '10vmin' }} alt="logo" />
            </span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books">Books Storage <br />
                            <span className="badge badge-light">Total Books: 14</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books:new">Add Book</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>

                {/* <span className="badge pull-right">Total Books: 14</span> */}

            </div>
        </nav>
    </header>
);