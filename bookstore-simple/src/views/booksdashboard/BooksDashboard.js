import React, { Component } from 'react';
import BookCard from '../../components/bookcard/BookCard';

export default class BooksDashboard extends Component {

    renderEmpty() {
        return <p>Nothing found</p>
    }

    /**
     * Maps each book prop to a <BookCard /> component instance, thus rendering a card list
     */
    renderList() {
        return this.props.extra.books.map(b => <BookCard key={b.id} model={b} onDelete={this.props.extra.onDelete} />);
    }

    render() {

        /**
         * The *props.extra* is a react-router passed prop
         */
        const hasBooks = (
            this.props.extra &&
            this.props.extra.books &&
            this.props.extra.books.length
        );

        return (
            <div>
                <h3>Current books storage</h3>
                <article style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
                    {hasBooks ? this.renderList() : this.renderEmpty()}
                </article>
            </div>
        );
    }

}