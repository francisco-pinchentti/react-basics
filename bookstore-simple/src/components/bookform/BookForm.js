import React, { Component } from 'react';
var classNames = require('classnames');

export default class BookForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            isbn: {
                value: '',
                isValid: false
            },
            title: {
                value: '',
                isValid: false
            },
            summary: {
                value: '',
                isValid: true
            },
            isFormValid: false,
            isBusy: false
        };

        this.boundOnFormSubmit = this.onFormSubmit.bind(this);
        this.boundOnInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        if (!!this.props.targetBook) {
            this.setState({
                id: this.props.targetBook.id,
                title: {
                    value: this.props.targetBook.title,
                    isValid: this.validateFormField('title', this.props.targetBook.title)
                },
                summary: {
                    value: this.props.targetBook.summary,
                    isValid: this.validateFormField('summary', this.props.targetBook.summary)
                },
                isbn: {
                    value: this.props.targetBook.isbn,
                    isValid: this.validateFormField('isbn', this.props.targetBook.isbn)
                },
            })
        }
    }

    /**
     * @todo change to a callback to parent
     * @param {*} event 
     */
    async onFormSubmit(event) {
        event.preventDefault(); // prevents browser default refresh page
        if (this.state.isBusy) {
            return;
        }
        if (this.state.isFormValid) {
            this.setState({
                isBusy: true
            });
            if (this.state.id) {
                this.props.onBookUpdate({
                    id: this.state.id,
                    isbn: this.state.isbn.value,
                    title: this.state.title.value,
                    summary: this.state.summary.value
                });
            } else {
                const result = await this.props.onBookSave({
                    isbn: this.state.isbn.value,
                    title: this.state.title.value,
                    summary: this.state.summary.value
                });
                if (!!result) {
                    // on create go back to dashboard:
                    if (!this.state.id) {
                        setTimeout(() => {
                            this.props.history.push('/books');
                        }, 250);
                    }
                } else {
                    alert("There was an error");
                    this.setState({
                        isBusy: false
                    });
                }
            }
        } else {
            alert("Invalid");
        }
    }

    onInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const fieldName = target.name;

        this.setState({
            [fieldName]: {
                value,
                isValid: this.validateFormField(fieldName, value)
            }
        }, () => this.validateForm());
    }

    validateFormField(key, value) {
        switch (key) {
            case 'isbn':
                return value && value.length < 14;
            case 'title':
                return value && value.length < 25;
            case 'summary':
                return !value || value.length < 200;
            default:
                return false;
        }
    }

    validateForm() {
        const isFormValid = (
            this.state.isbn.isValid &&
            this.state.title.isValid &&
            this.state.summary.isValid
        );
        this.setState({
            isFormValid
        });
    }

    /**
     * A helper for dynamic css
     * @param {string} fieldName 
     */
    getClassNamesForField(fieldName) {
        return classNames({
            'form-control': true,
            'is-valid': this.state[fieldName].isValid,
            'is-invalid': !this.state[fieldName].isValid
        });
    }

    render() {

        return (
            <form onSubmit={this.boundOnFormSubmit}>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        className={this.getClassNamesForField('title')} id="title" name="title"
                        value={this.state.title.value}
                        onChange={this.boundOnInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text"
                        className={this.getClassNamesForField('isbn')} id="isbn" name="isbn"
                        value={this.state.isbn.value}
                        onChange={this.boundOnInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <textarea className={this.getClassNamesForField('summary')} id="summary" name="summary" rows="3"
                        value={this.state.summary.value}
                        onChange={this.boundOnInputChange}></textarea>
                </div>

                <div className="d-flex" style={{ justifyContent: 'flex-end'}}>
                    {!this.state.id && <button disabled={!this.state.isFormValid} type="submit" className="btn btn-primary">Add book to store</button>}
                    {this.state.id && <button disabled={!this.state.isFormValid} type="submit" className="btn btn-primary">Update Book</button>}
                </div>

            </form>
        );
    }

}