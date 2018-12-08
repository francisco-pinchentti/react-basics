import React, { Component } from 'react';
import BookForm from "../../components/bookform/BookForm";

export default class BooksFormView extends Component {

    render() {
        return (
            <div className="d-flex form-container">
                <div className="form-wrapper">
                    <h3>Add a new book</h3>
                    <BookForm history={this.props.history} />
                </div>
            </div>
        );
    }

}