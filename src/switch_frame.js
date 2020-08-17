const { cube, union } = require('@dotcore64/scad-js');

const full_frame = ( { x, y, z, t } ) => {

  const front = cube([x, t, z]).translate([0, t / 2 + y / 2, z / 2]);
  const left = cube([t, x, z]).translate([t / 2 + x / 2, 0, z / 2]);

  const half = union(front, left);

  return union(
    half.mirror([1, 0, 0]),
    half.mirror([0, 1, 0])
  );
}

module.exports = full_frame;
