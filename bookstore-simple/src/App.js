import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home, About } from "./views";
import BooksDashboard from "./components/booksdashboard/BooksDashboard";
import BookForm from "./components/bookform/BookForm";

const App = () => (
    <Router>
        <div>
            <Header />

            <section className="d-flex p-4">
                <Route exact path="/" component={Home} />
                <Route path="/books" component={BooksDashboard} />
                <Route path="/books:new" component={BookForm} />
                <Route path="/about" component={About} />
            </section>

        </div>
    </Router>
);

export default App;