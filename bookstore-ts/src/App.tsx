import * as React from 'react';
import './App.css';

import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';

import { Header } from "./components/header/Header";
import BooksDashboard from "./views/booksdashboard/BooksDashboard";
import BookFormView from "./views/book-form-view/BookFormView";
import Home from "./views/home/Home";
import Footer from "./components/footer/Footer";
import { listBooks, clearStore, refreshStore } from "./redux/actions";
import { Book } from './model/Book';
import { StoreState } from './redux/interfaces';

interface AppProps {
  listBooks?: () => any,
  clearStore?: () => any,
  refreshStore?: () => any,
  books?: Book[],
  lastUpdateTime?: Date
}

class App extends React.Component<AppProps> {

  componentDidMount() {
    this.props.listBooks!();
  }

  clearStore = () => {
    this.props.clearStore!();
  }

  refreshAppState = () => {
    this.props.refreshStore!();
  }

  /**
   * @see: By writing functions this way we can avoid explicit binding
   */
  renderDashboardRoute = (props: any) => {
    return (
      <BooksDashboard {...props}
        extra={{
          // dashboard shows a list of books, but those can be altered in other components:
          books: this.props.books
        }}
      />
    );
  }

  renderFormRoute = (props: any) => {
    return (<BookFormView {...props} />);
  }

  public render() {

    return (
      <BrowserRouter>
        <div className="route-wrapper" style={{ height: '100%', overflow: 'auto' }}>
          <Header
            currentAmmount={this.props.books!.length}
            onRefreshClick={this.refreshAppState}
            onClearClick={this.clearStore} />
          <section className="d-flex p-4 router-outlet">
            <Route exact={true} path="/" component={Home} />
            <Route
              path="/books"
              render={this.renderDashboardRoute}
            />
            <Route
              path="/books:new"
              render={this.renderFormRoute}
            />
          </section>
          <Footer lastUpdateTime={this.props.lastUpdateTime} />
        </div>
      </BrowserRouter>
    )
  }
}

/**
 * Wire the component to redux state and actions:
 */

/**
 * Map store state to component state (read only):
 * 
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state: StoreState, ownProps: AppProps) => ({
  books: state.books,
  lastUpdateTime: state.lastUpdateTime
});

/**
 * Map redux actions to component props (instead of calling a service)
 * 
 * @param {*} dispatch 
 * @param {*} ownProps 
 */
const mapDispatchToProps = (dispatch: Function, ownProps: AppProps) => ({
  listBooks: () => dispatch(listBooks()),
  clearStore: () => dispatch(clearStore()),
  refreshStore: () => dispatch(refreshStore())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
