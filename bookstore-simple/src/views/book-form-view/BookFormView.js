import React, { Component } from 'react';
import BookForm from "../../components/bookform/BookForm";

export default class BooksFormView extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-4 col-md-6 col-sm-8 col-12">
                        <h3>Add a new book</h3>
                        <BookForm />
                    </div>
                </div>
            </div>
        );
    }

}