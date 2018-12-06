import * as React from 'react';
import BookForm from "../../components/bookform/BookForm";

interface BooksFormViewProps {
    history: any
}

export default class BooksFormView extends React.Component<BooksFormViewProps> {

    public render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-4 col-md-6 col-sm-8 col-12">
                        <h3>Add a new book</h3>
                        <BookForm history={this.props.history} />
                    </div>
                </div>
            </div>
        );
    }

}