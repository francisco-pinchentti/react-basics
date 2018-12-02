import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook, updateBook } from "../../redux/actions";

var classNames = require('classnames');

class BookForm extends Component {

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            (!prevProps.saveStatus.error && this.props.saveStatus.error) ||
            (!prevProps.updateStatus.error && this.props.updateStatus.error)
        ) {
            alert("There was an error");
        } else if (prevProps.saveStatus.pending && !this.props.saveStatus.pending) {
            setTimeout(() => {
                this.props.history.push('/books');
            }, 250);
        }
    }

    onFormSubmit(event) {
        event.preventDefault(); // prevents browser default refresh page
        if (this.state.id) {
            this.props.updateBook({
                id: this.state.id,
                isbn: this.state.isbn.value,
                title: this.state.title.value,
                summary: this.state.summary.value
            });
        } else {
            this.props.addBook({
                isbn: this.state.isbn.value,
                title: this.state.title.value,
                summary: this.state.summary.value
            });
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

                <div className="d-flex" style={{ justifyContent: 'flex-end' }}>
                    {!this.state.id && <button disabled={!this.state.isFormValid} type="submit" className="btn btn-primary">Add book to store</button>}
                    {this.state.id && <button disabled={!this.state.isFormValid} type="submit" className="btn btn-primary">Update Book</button>}
                </div>

            </form>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        saveStatus: state.requestStatus.postBook,
        updateStatus: state.requestStatus.putBook
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    addBook: (aBook) => dispatch(addBook(aBook)),
    updateBook: (aBook) => dispatch(updateBook(aBook))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);