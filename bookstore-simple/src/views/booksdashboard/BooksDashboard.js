import React, { Component } from 'react';
import { getBooks } from '../../services/BooksService';
import BookCard from '../../components/bookcard/BookCard';

export default class BooksDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    async componentDidMount() {
        const response = await getBooks();
        this.setState({
            books: response.books
        });
    }

    render() {

        const booksList = this.state.books.map(b => <BookCard key={b.id} model={b} />);

        return (
            <div>
                <h3>Current books storage</h3>
                <article style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
                    {booksList}
                </article>
            </div>
        );
    }

}