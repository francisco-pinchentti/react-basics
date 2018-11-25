import React, { Component } from 'react';
import BookCard from '../../components/bookcard/BookCard';

export default class BooksDashboard extends Component {

    render() {

        /**
         * The props.extra is a Router passed prop
         */
        const booksList = (!!this.props.extra && this.props.extra.books)
            ? this.props.extra.books.map(b => <BookCard key={b.id} model={b} onDelete={this.props.extra.onDelete} />)
            : null;

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