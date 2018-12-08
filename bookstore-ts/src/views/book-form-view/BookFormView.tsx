import * as React from 'react';
import BookForm from "../../components/bookform/BookForm";

interface BooksFormViewProps {
    history: any
}

export default class BooksFormView extends React.Component<BooksFormViewProps> {

    public render() {
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