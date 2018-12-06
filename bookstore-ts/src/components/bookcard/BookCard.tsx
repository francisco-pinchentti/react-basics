import * as React from 'react';
import { Book } from "../../model/Book";

interface BookCardProps {
    model: Book,
    onDelete: (b: Book) => void,
    onUpdate: (b: Book) => void
}

export default class BookCard extends React.Component<BookCardProps> {

    onDelete() {
        this.props.onDelete(this.props.model);
    }
    boundOnDelete: (event: React.MouseEvent<HTMLButtonElement>) => void = this.onDelete.bind(this);

    
    onUpdate() {
        this.props.onUpdate(this.props.model);
    }
    boundOnUpdate: (event: React.MouseEvent<HTMLButtonElement>) => void = this.onUpdate.bind(this);

    public render() {
        return (
            <div className="card w-25 m-2 demo-card">
                <img className="card-img-top" src="https://picsum.photos/200/200" alt="Book cover" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.model.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">ISBN: {this.props.model.isbn}</h6>
                    <p className="card-text">{this.props.model.summary || 'No summary found'}</p>

                    <div className="d-flex button-group">

                        <button className="btn btn-small btn-danger" onClick={this.boundOnDelete}>
                            <i className="fas fa-trash" />
                        </button>

                        <button className="btn btn-small btn-info" onClick={this.boundOnUpdate}>
                            <i className="fas fa-save" />
                        </button>

                    </div>

                </div>
            </div>
        )
    }
}
