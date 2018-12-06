import * as React from 'react';
import { connect } from 'react-redux';
import { addBook, updateBook } from "../../redux/actions";
import { Book } from 'src/model/Book';

const classNames = require('classnames');

interface BookFormProps {
    targetBook ?: Book,
    saveStatus ?: any,
    updateStatus ?: any,
    history? : any,
    addBook?: (b: Book) => void,    // @see: made optional because it's a redux prop and parent component will not be passing it
    updateBook?: (b: Book) => void  // @see: made optional because it's a redux prop and parent component will not be passing it
}

interface BookFormState {
    id ?: string,
    isbn: {
        value ?: string,
        isValid: boolean
    },
    title: {
        value?: string,
        isValid: boolean
    },
    summary: {
        value?: string,
        isValid: boolean
    },
    isFormValid: boolean,
    isBusy: boolean
}

class BookForm extends React.Component<BookFormProps, BookFormState> {

    constructor(props: any) {
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
    }
    
    boundOnFormSubmit: (event: React.FormEvent) => void;
    
    boundOnISBNInputChange = this.onISBNInputChange.bind(this);

    componentDidMount() {
        if (this.props.targetBook) {
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
            });
        }
    }

    componentDidUpdate(prevProps: BookFormProps, prevState: BookFormState, snapshot: any) {
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

    /**
     * @todo type events
     * @param event 
     */
    onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // prevents browser default refresh page
        if (this.state.id) {
            /**
             * @see: the trailing *!* is a hint to typescript that the props won't be null (it will be wired via redux)
             * {@link https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html | Non-null assertion operator }
             */            
            this.props.updateBook!({
                id: this.state.id,
                isbn: this.state.isbn.value,
                title: this.state.title.value,
                summary: this.state.summary.value
            });
        } else {
            this.props.addBook!({
                isbn: this.state.isbn.value,
                title: this.state.title.value,
                summary: this.state.summary.value
            });
        }
    }

    // onInputChange(event: any) {
    //     const target = event.target;
    //     const value : string = target.value;
    //     const fieldName : string = target.name;
    //     this.setState({
    //         [fieldName]: {
    //             value,
    //             isValid: this.validateFormField(fieldName, value)
    //         }
    //     }, () => this.validateForm());
    // }

    onISBNInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value: string = target.value;

        this.setState({
            isbn: {
                value,
                isValid: this.validateFormField('isbn', value)
            }
        }, () => this.validateForm());
    }

    onTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value: string = target.value;

        this.setState({
            title: {
                value,
                isValid: this.validateFormField('title', value)
            }
        }, () => this.validateForm());
    }

    onSummaryInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target;
        const value: string = target.value;

        this.setState({
            summary: {
                value,
                isValid: this.validateFormField('summary', value)
            }
        }, () => this.validateForm());
    }

    validateFormField(key: string, value?: string): boolean {
        switch (key) {
            case 'isbn':
                return !!(value && value.length < 14);
            case 'title':
                return !!(value && value.length < 25);
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
    getClassNamesForField(fieldName: string) {
        return classNames({
            'form-control': true,
            'is-valid': this.state[fieldName].isValid,
            'is-invalid': !this.state[fieldName].isValid
        });
    }

    public render() {

        return (
            <form onSubmit={this.boundOnFormSubmit}>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        className={this.getClassNamesForField('title')} id="title" name="title"
                        value={this.state.title.value}
                        onChange={this.onTitleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text"
                        className={this.getClassNamesForField('isbn')} id="isbn" name="isbn"
                        value={this.state.isbn.value}
                        onChange={this.boundOnISBNInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <textarea className={this.getClassNamesForField('summary')} id="summary" name="summary" rows={3}
                        value={this.state.summary.value}
                        onChange={this.onSummaryInputChange} />
                </div>

                <div className="d-flex" style={{ justifyContent: 'flex-end' }}>
                    {!this.state.id && <button disabled={!this.state.isFormValid} type="submit" className="btn btn-primary">Add book to store</button>}
                    {this.state.id && <button disabled={!this.state.isFormValid} type="submit" className="btn btn-primary">Update Book</button>}
                </div>

            </form>
        );
    }

}

/**
 * @todo type the store
 * @param state 
 * @param ownProps 
 */
function mapStateToProps(state: any, ownProps: BookFormProps) {
    return {
        saveStatus: state.requestStatus.postBook,
        updateStatus: state.requestStatus.putBook
    }
};

const mapDispatchToProps = (dispatch: Function, ownProps: BookFormProps) => ({
    addBook: (aBook: Book) => dispatch(addBook(aBook)),
    updateBook: (aBook: Book) => dispatch(updateBook(aBook))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);