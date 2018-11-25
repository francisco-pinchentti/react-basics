import React from "react";
import { Link } from "react-router-dom";

export const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand"><img src="../logo.svg" width="24px"></img></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books">Books Storage</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books:new">Add Book</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);