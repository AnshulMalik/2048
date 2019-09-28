import React from 'react';
import Grid from './Grid';
import { DIRECTIONS, isInBounds, intToRGB } from './grid-util';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const { width, height } = props;
    this.state = {
      score: 0,
      width,
      height,
      grid: new Grid(width, height, 0),
      def: 0,
      st: [[0, width -1], [0, 0], [0, 0], [height - 1, 0]],
      stInc: [[1, 0], [1, 0], [0, 1], [0, 1]],
      cellInc: [[0, -1], [0, 1], [1, 0], [-1, 0]]
    };
  }

  componentDidMount() {
    // add listener to listen for key events
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    this.fillEmptySpaceWithRandom();
    // setTimeout(this.updateRow(0, DIRECTIONS.RIGHT), 1000);
  }

  onKeyDown(event) {
    let dir = -1;
    switch(event.key) {
      case "ArrowRight":
        dir = DIRECTIONS.RIGHT;
        break;
      case "ArrowLeft":
        dir = DIRECTIONS.LEFT;
        break;
      case "ArrowUp":
        dir = DIRECTIONS.UP;
        break;
      case "ArrowDown":
      dir = DIRECTIONS.DOWN;
        break;
    }

    if(dir != -1) {
      this.updated = false;
      this.updateRow(dir);
      if(this.updated) {
        // don't fill with random number if nothing changed
        this.fillEmptySpaceWithRandom();
      }

      if(!this.areMovesAvailable()) {
        alert("Game Over!");
      }
    }
  }

  fillEmptySpaceWithRandom() {
    const { grid, score } = this.state;
    const emptySpaces = grid.getCellsWithValue(this.state.def);
    if (emptySpaces.length == 0)
      return;

      const rand = Math.floor(Math.random() * emptySpaces.length);
    let [x, y] = emptySpaces[rand];

    grid.setValueAt(x, y, 2);
    this.setState({ grid });
  }

  renderRow(i) {
    const { width, grid } = this.state;
    let result = [];
    let temp = 0;
    for(let j = 0; j < width; j++) {
      temp = grid.getValueAt(i, j);
      result.push(<div className="col" style={{ backgroundColor: intToRGB(temp) }}>{temp ? temp : '-'}</div>)
    }

    return result;
  }

  renderGrid() {
    const result = [];
    const { height } = this.state;
    for(let i = 0; i < height; i++) {
      result.push(<div className="row">{this.renderRow(i)}</div>);
    }

    return result;
  }

  updateRow(dir) {
    const { width, height } = this.state;
    let [x, y] = this.state.st[dir];
    let [xinc, yinc] = this.state.stInc[dir];
    let [xCellInc, yCellInc] = this.state.cellInc[dir];

    while(isInBounds(width, height, x, y)) {
      let curx = x;
      let cury = y;
      while(isInBounds(width, height, curx, cury)) {
        this.evalCell(curx, cury, dir);
        curx += xCellInc;
        cury += yCellInc;
      }
      x += xinc;
      y += yinc;
    }
  }
  evalCell(x, y, dir) {
    const { grid, def, width, height } = this.state;
    let { score } = this.state;
    let [xinc, yinc] = this.state.cellInc[dir];
    let udpated = false;
    let nextx = x + xinc;
    let nexty = y + yinc;
    if (!isInBounds(width, height, nextx, nexty))
      return;

      let val = grid.getValueAt(x, y);
    if (!val) {
      this.condense(x, y, dir, grid);
    }
    val = grid.getValueAt(x, y);

    let nextVal = grid.getValueAt(nextx, nexty);
    if(!nextVal) {
      this.condense(nextx, nexty, dir, grid);
    }
    nextVal = grid.getValueAt(nextx, nexty);

    if (val !== def && val === nextVal) {
      this.updated = true;
      val += nextVal;
      score += val;
      grid.setValueAt(nextx, nexty, def);
      grid.setValueAt(x, y, val);
    }

    this.setState({ grid, score });
  }

  condense(x, y, dir, grid) {
    const { width, height } = this.state;
    let [xinc, yinc] = this.state.cellInc[dir];
    let emptyx = x;
    let emptyy = y;
    while(x >= 0 && x < height && y >= 0 && y < width) {
      let val = grid.getValueAt(x, y)
      if (val) {
        grid.setValueAt(emptyx, emptyy, val);
        grid.setValueAt(x, y, 0);
        this.updated = true;
        emptyx += xinc;
        emptyy += yinc;
      }
      x += xinc;
      y += yinc;
    }
  }

  areMovesAvailable() {
    const { width, height, grid } = this.state;
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for(let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        for(let d = 0; d < dirs.length; d++) {
          if (grid.getValueAt(i, j) === grid.getValueAt(i + dirs[d][0], j + dirs[d][1])) {
            return true;
          }
        }
      }
    }

    return false;
  }
  render() {
    return (

      <div className="grid">
        <h2 class="score">Score: {this.state.score}</h2>
        { this.renderGrid() }
      </div>);
  }
}

export default Game;
