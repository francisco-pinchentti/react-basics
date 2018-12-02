import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { removeBook } from "../../redux/actions";
import BookCard from '../../components/bookcard/BookCard';
import BookForm from '../../components/bookform/BookForm';

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.9)'
    }
};

Modal.setAppElement('#root');

class BooksDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdateModalOpen: false,
            selectedUpdateBook: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.updateStatus.pending && !this.props.updateStatus.pending) {
            this.closeUpdateModal();
        }
    }

    openUpdateModal(book) {
        this.setState({
            isUpdateModalOpen: true,
            selectedUpdateBook: Object.assign({}, book)
        });
    }

    closeUpdateModal() {
        this.setState({
            isUpdateModalOpen: false,
            selectedUpdateBook: undefined
        });
    }

    renderEmpty() {
        return <p>Nothing found</p>
    }

    /**
     * Maps each book prop to a <BookCard /> component instance, thus rendering a card list
     */
    renderList() {
        return this.props.extra.books.map(b => <BookCard key={b.id} model={b} onDelete={this.props.removeBook} onUpdate={ (book) => this.openUpdateModal(book)} />);
    }

    render() {

        /**
         * The *props.extra* is a react-router passed prop
         */
        const hasBooks = (
            this.props.extra &&
            this.props.extra.books &&
            this.props.extra.books.length
        );

        return (
            <div>
                <h3>Current books storage</h3>
                <article style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
                    {hasBooks ? this.renderList() : this.renderEmpty()}
                </article>
                <Modal
                    isOpen={this.state.isUpdateModalOpen}
                    onRequestClose={() => this.onUpdateModalClose()}
                    style={modalStyles}
                    contentLabel="Update book"
                >
                    <BookForm targetBook={this.state.selectedUpdateBook} />
                </Modal>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        updateStatus: state.requestStatus.putBook
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    removeBook: (aBook) => dispatch(removeBook(aBook)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksDashboard)