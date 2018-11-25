import React, { Component } from 'react';

export default class BookCard extends Component {

    render() {
        return (
            <div className="card w-25">
                <div className="card-body">
                    <h5 className="card-title">{this.props.model.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.model.isbn}</h6>
                    <p className="card-text">{this.props.model.summary || 'No summary found'}</p>

                    <button className="btn btn-small" onClick={() => this.props.onDelete(this.props.model)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        )
    }
}
