import React from 'react';

import Game from './Game';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 4
    };
    this.onSizeChange = this.onSizeChange.bind(this);
  }

  onSizeChange(event) {
    this.setState({ size: event.target.value });
  }

  render() {
    const { size} = this.state;
    return (
      <div className="app">
        {/* <input type="number" value={size} onChange={this.onSizeChange}></input> */}
        {size ? <Game width={size} height={size} /> : ''}

      </div>
    );
  }
}

export default App;
