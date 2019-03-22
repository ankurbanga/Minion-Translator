import React, { Component } from 'react';
import History from './History/History';
import New from './New/New';
import NavBar from './NavBar/NavBar';
class App extends Component {
  render() {
    return (
      <div>
	<NavBar/>
        <New/>
        <History/>
        <br/><br/><br/>
      </div>
    );
  }
}

export default App;
