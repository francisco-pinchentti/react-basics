import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';

import { Header } from "./components/header/Header";
import BooksDashboard from "./views/booksdashboard/BooksDashboard";
import BookFormView from "./views/book-form-view/BookFormView";
import Home from "./views/home/Home";
import Footer from "./components/footer/Footer";

/**
 * Redux actions explicitly imported:
 */
import { listBooks, clearStore, refreshStore } from "./redux/actions";

class App extends Component {

    componentDidMount() {
        this.props.listBooks();
    }

    clearStore() {
        this.props.clearStore();
    }

    refreshAppState() {
        this.props.refreshStore();
    }

    render() {

        return (
            <BrowserRouter>
                <div className="route-wrapper" style={{ height: '100%', overflow: 'auto' }}>
                    <Header
                        currentAmmount={this.props.books.length}
                        onRefreshClick={() => this.refreshAppState()}
                        onClearClick={() => this.clearStore()} />
                    <section className="d-flex p-4 router-outlet">
                        <Route exact path="/" component={Home} />
                        <Route
                            path="/books"
                            render={props => <BooksDashboard {...props}
                                extra={{
                                    // dashboard shows a list of books, but those can be altered in other components:
                                    books: this.props.books
                                }}
                            />}
                        />
                        <Route
                            path="/books:new"
                            render={props => <BookFormView {...props} />}
                        />
                    </section>
                    <Footer lastUpdateTime={this.props.lastUpdateTime} />
                </div>
            </BrowserRouter>
        )
    }
}

/**
 * Wire the component to redux state and actions:
 */

/**
 * Map store state to component state (read only):
 * 
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state, ownProps) => ({
    books: state.books,
    lastUpdateTime: state.lastUpdateTime
});

/**
 * Map redux actions to component props (instead of calling a service)
 * 
 * @param {*} dispatch 
 * @param {*} ownProps 
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    listBooks: () => dispatch(listBooks()),
    clearStore: () => dispatch(clearStore()),
    refreshStore: () => dispatch(refreshStore())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
