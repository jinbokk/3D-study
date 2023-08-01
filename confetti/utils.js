export function randomNumBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function hypotenuse(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
