const { cube } = require('@dotcore64/scad-js');

module.exports = ({x, y, z, t}) => (tb, rl) => {
  return cube([t, t, z]).translate([
    (x + t) / 2 * (rl == 'right' ? 1 : -1),
    (y + t) / 2 * (tb == 'top' ? 1 : -1),
    0,
  ]);
};
