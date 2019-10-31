const DIRECTIONS = {
  RIGHT: 0,
  LEFT: 1,
  UP: 2,
  DOWN: 3
};
function isInBounds(width, height, x, y) {
  return x >= 0 && x < height && y >= 0 && y < width;
}

function intToRGB(value) {
  if (!value || value === 0) {
    return "#ccc";
  }
  value = value * 13337;
  const blue = Math.floor(value % 256);
  const green = Math.floor((value / 256) % 256);
  const red = Math.floor((value / 256 / 256) % 256);

  return "rgb(" + red + "," + green + "," + blue + ")";
}

module.exports = {
  DIRECTIONS,
  isInBounds,
  intToRGB
};
