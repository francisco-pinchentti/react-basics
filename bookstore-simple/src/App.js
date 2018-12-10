import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Header } from "./components/header/Header";
import BooksDashboard from "./views/booksdashboard/BooksDashboard";
import BookFormView from "./views/book-form-view/BookFormView";
import Home from "./views/home/Home";
import Footer from "./components/footer/Footer";
import { getBooks, deleteBook, clearBooks, saveBook, updateBook, loadSampleData } from "./services/BooksService";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            lastUpdateTime: new Date()
        }
    }

    componentDidMount() {
        this.loadBooks();
    }

    async loadBooks() {
        const response = await getBooks();
        this.setState({
            books: response.books,
            lastUpdateTime: new Date()
        });
    }

    _updateBooksList(books) {
        this.setState({
            books,
            lastUpdateTime: new Date()
        });
    }

    async onBookUpdate(book) {
        const updatedBook = await updateBook(book);
        if (!!updatedBook) {
            this._updateBooksList(this.state.books.filter(b => b.id !== book.id).concat([updatedBook]));
        }
        return updateBook;
    }

    /**
     * A child component will notify that a new book was created, we'll update the app state
     * @param {object} book 
     */
    async onBookSave(book) {
        try {
            const savedBook = await saveBook(book);
            if (!!savedBook) {
                this._updateBooksList(this.state.books.concat([savedBook]));
            }
            return savedBook;
        } catch (e) {
            return false;
        }
    }

    /**
     * Will send a request to delete a book and then update the UI, after that some children will be re-rendered
     * @param {object} book
     */
    onBookDelete(book) {
        deleteBook(book)
            .then((deletedBook) => {
                this._updateBooksList(this.state.books.filter((b) => b.id !== deletedBook.id));
            }, () => { });
    }

    clearStore() {
        clearBooks()
            .then(() => {
                this._updateBooksList([]);
                window.location.replace("/");
            });
    }

    async refreshAppState() {
        await clearBooks();
        await loadSampleData();
        window.location.replace("/");
    }

    render() {

        return (
            <BrowserRouter>

                <Route
                    render={({ location }) => (

                        <div className="route-wrapper" style={{ height: '100%', overflow: 'auto' }}>
                            <Header
                                currentAmmount={this.state.books.length}
                                onRefreshClick={() => this.refreshAppState()}
                                onClearClick={() => this.clearStore()} />

                            <section className="d-flex p-4 router-outlet">

                                <TransitionGroup className="main-transition-group">
                                    <CSSTransition
                                        key={location.key}
                                        classNames="fade"
                                        timeout={300}
                                    >

                                        <Switch>
                                            <Route exact path="/" component={Home} />
                                            <Route
                                                exact path="/books"
                                                render={props => <BooksDashboard {...props}
                                                    extra={{
                                                        // dashboard shows a list of books, but those can be altered in other components:
                                                        books: this.state.books,
                                                        // in this case childrens notifies parent, where the service will be called:
                                                        onDelete: (book) => this.onBookDelete(book),
                                                        // we'll allow updates from the dashboard too:
                                                        onBookUpdate: (b) => this.onBookUpdate(b)
                                                    }}
                                                />}
                                            />
                                            <Route
                                                exact path="/books:new"
                                                render={props => <BookFormView {...props}
                                                    // we pass a callback (onBookSave) to get notified of any changes:
                                                    extra={{ onBookSave: (b) => this.onBookSave(b) }} />}
                                            />
                                            {/* Default route: */}
                                            <Route component={Home} />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </section>
                            <Footer lastUpdateTime={this.state.lastUpdateTime} />
                        </div>
                    )} />

            </BrowserRouter>
        )
    }
}