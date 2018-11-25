import React, { Component } from 'react';
import { saveBook } from '../../services/BooksService';
var classNames = require('classnames');

export default class BookForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    async onFormSubmit(event) {
        event.preventDefault(); // prevents browser default refresh page
        if (this.state.isBusy) {
            return;
        }
        if (this.state.isFormValid) {
            this.setState({
                isBusy: true
            });
            const result = await saveBook({
                isbn: this.state.isbn.value,
                title: this.state.title.value,
                summary: this.state.summary.value
            });
            if (result) {
                alert("All OK!");
            } else {
                alert("There was an error");
            }

            this.setState({
                isBusy: false
            });

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
                return value && value.length < 8;
            case 'summary':
                return !value || value.length < 500;
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
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text"
                        className={this.getClassNamesForField('isbn')} id="isbn" name="isbn"
                        value={this.state.isbn.value}
                        onChange={this.boundOnInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        className={this.getClassNamesForField('title')} id="title" name="title"
                        value={this.state.title.value}
                        onChange={this.boundOnInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <textarea className={this.getClassNamesForField('summary')} id="summary" name="summary" rows="3"
                        value={this.state.summary.value}
                        onChange={this.boundOnInputChange}></textarea>
                </div>

                <button disabled={!this.state.isFormValid} type="submit" className="btn btn-primary">Add book to store</button>
            </form>
        );
    }

}