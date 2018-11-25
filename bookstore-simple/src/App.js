import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Header } from "./components/header/Header";
import BooksDashboard from "./views/booksdashboard/BooksDashboard";
import BookFormView from "./views/book-form-view/BookFormView";
import Home from "./views/home/Home";
import Footer from "./components/footer/Footer";
import { getBooks, deleteBook } from "./services/BooksService";

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

    /**
     * A child component will notify that a new book was created, we'll update the app state
     * @param {object} book 
     */
    onBookSave(book) {
        this.setState({
            books: this.state.books.concat([book]),
            lastUpdateTime: new Date()
        });
    }

    /**
     * Will send a request to delete a book and then update the UI, after that some children will be re-rendered
     * @param {object} book
     */
    onBookDelete(book) {
        deleteBook(book)
            .then((deletedBook) => {
                this.setState({
                    books: this.state.books.filter((b) => b.id !== deletedBook.id),
                    lastUpdateTime: new Date()
                });
            }, () => { });
    }

    clearStore() {
        localStorage.clear();
        window.location.reload();
    }

    render() {

        return (
            <BrowserRouter>
                <div className="route-wrapper" style={{ height: '100%', overflow: 'auto' }}>

                    <Header
                        currentAmmount={this.state.books.length}
                        onClearClick={() => this.clearStore()} />

                    <section className="d-flex p-4 router-outlet">
                        <Route exact path="/" component={Home} />

                        <Route
                            path="/books"
                            render={props => <BooksDashboard {...props}
                                extra={{
                                    // dashboard shows a list of books, but those can be altered in other components:
                                    books: this.state.books,
                                    // in this case childrens notifies parent, where the service will be called:
                                    onDelete: (book) => this.onBookDelete(book)
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

                    <Footer lastUpdateTime={this.state.lastUpdateTime} />

                </div>
            </BrowserRouter>
        )
    }
}