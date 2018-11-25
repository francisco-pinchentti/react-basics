import React, { Component } from 'react';

export default class BookForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isbn: '',
            title: '',
            summary: '',
            invalid: true
        };

        this.boundOnFormSubmit = this.onFormSubmit.bind(this);
        this.boundOnInputChange = this.onInputChange.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault(); // do not refresh
    }

    onInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.boundOnFormSubmit}>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text"
                        className="form-control" id="isbn" name="isbn"
                        value={this.state.isbn}
                        onChange={this.boundOnInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        className="form-control" id="title" name="title"
                        value={this.state.title}
                        onChange={this.boundOnInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <textarea className="form-control" id="summary" name="summary" rows="3"
                        value={this.state.summary}
                        onChange={this.boundOnInputChange}></textarea>
                </div>

                <button disabled={this.state.invalid} type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }

}