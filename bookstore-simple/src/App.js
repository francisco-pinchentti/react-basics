import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import BooksDashboard from "./views/booksdashboard/BooksDashboard";
import BookFormView from "./views/book-form-view/BookFormView";
import Home from "./views/home/Home";
import { About } from "./views/about/About";
import Footer from "./components/footer/Footer";

const App = () => (
    <Router>
        <div className="route-wrapper" style={{ height: '100%', overflow: 'auto'}}>
            <Header />

            <section className="d-flex p-4 router-outlet">
                <Route exact path="/" component={Home} />
                <Route path="/books" component={BooksDashboard} />
                <Route path="/books:new" component={BookFormView} />
                <Route path="/about" component={About} />
            </section>

            <Footer />

        </div>
    </Router>
);

export default App;