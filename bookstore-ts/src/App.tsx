import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import Footer from './components/footer/Footer';
// import { Header } from './components/header/Header';

class App extends React.Component {


  public onClearClick() {
    console.log('c');
  }

  public onRefreshClick() {
    console.log('r');
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>


        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>

        {/* <Header onClearClick={this.onClearClick} onRefreshClick={this.onRefreshClick} /> */}
        <Footer lastUpdateTime={new Date()} />

      </div>
    );
  }

}

export default App;
