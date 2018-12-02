import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';

import { Header } from "./components/header/Header";
import BooksDashboard from "./views/booksdashboard/BooksDashboard";
import BookFormView from "./views/book-form-view/BookFormView";
import Home from "./views/home/Home";
import Footer from "./components/footer/Footer";
import { clearBooks, loadSampleData } from "./services/BooksService";

/**
 * Redux actions explicitly imported:
 */
import { addBook, listBooks, removeBook, updateBook } from "./redux/actions";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            lastUpdateTime: new Date()
        }
    }

    componentDidMount() {
        this.props.listBooks();
    }

    _updateBooksList(books) {
        this.setState({
            books,
            lastUpdateTime: new Date()
        });
    }

    onBookUpdate(book) {
        this.props.updateBook(book);
    }

    /**
     * A child component will notify that a new book was created, we'll update the app state
     * @param {object} book 
     */
    onBookSave(book) {
        this.props.addBook(book);
    }

    /**
     * Will send a request to delete a book and then update the UI, after that some children will be re-rendered
     * @param {object} book
     */
    onBookDelete(book) {
        this.props.removeBook(book);
    }

    clearStore() {
        clearBooks()
            .then(() => {
                this._updateBooksList([]);
            });
    }

    async refreshAppState() {
        await clearBooks();
        await loadSampleData();
        window.location.reload();
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
                                    books: this.props.books,
                                    // in this case childrens notifies parent, where the service will be called:
                                    onDelete: (book) => this.onBookDelete(book),
                                    // we'll allow updates from the dashboard too:
                                    onBookUpdate: (b) => this.onBookUpdate(b)
                                }}
                            />}
                        />
                        <Route
                            path="/books:new"
                            render={props => <BookFormView {...props}
                                // we pass a callback (onBookSave) to get notified of any changes:
                                extra={{ onBookSave: (b) => this.onBookSave(b) }} />}
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
    addBook: (aBook) => dispatch(addBook(aBook)),
    removeBook: (aBook) => dispatch(removeBook(aBook)),
    updateBook: (aBook) => dispatch(updateBook(aBook))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
