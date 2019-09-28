import { isInBounds } from "./grid-util";

class Grid {
  constructor(w, h, def = 5) {
    this.width = w;
    this.height = h;
    this.def = def;
    this.grid = [];
    for(let row = 0; row < this.height; row++) {
      let gridRow = [];
      for(let col = 0; col < this.width; col++) {
        gridRow.push(def);
      }
      this.grid.push(gridRow);
    }
  }

  getCellsWithValue(val) {
    let result = [];
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        if (this.grid[i][j] == val) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }
  getGrid() {
    return this.grid;
  }
  getValueAt(x, y) {
    if (!isInBounds(this.width, this.height, x, y)) {
      return this.def;
    }

    return this.grid[x][y];
  }
  setValueAt(x, y, val) {
    if (!isInBounds(this.width, this.height, x, y)) {
      return;
    }
    this.grid[x][y] = val;
  }
}

export default Grid;

