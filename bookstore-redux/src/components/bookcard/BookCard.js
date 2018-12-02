import React, { Component } from 'react';

export default class BookCard extends Component {

    render() {
        return (
            <div className="card w-25 m-2 demo-card">
                <img className="card-img-top" src="https://picsum.photos/200/200" alt="Book cover" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.model.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">ISBN: {this.props.model.isbn}</h6>
                    <p className="card-text">{this.props.model.summary || 'No summary found'}</p>

                    <div className="d-flex button-group">

                        <button className="btn btn-small btn-danger" onClick={() => this.props.onDelete(this.props.model)}>
                            <i className="fas fa-trash"></i>
                        </button>

                        <button className="btn btn-small btn-info" onClick={() => this.props.onUpdate(this.props.model)}>
                            <i className="fas fa-save"></i>
                        </button>

                    </div>

                </div>
            </div>
        )
    }
}
