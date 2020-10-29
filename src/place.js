const Place = (structure, position) => (target, col, row) => {
  const { step, radius, trans, rot } = structure[row];
  const { translate, rotate } = position;

  return target
    .translate([0, 0, -radius])
    .rotate([step * col, 0, 0])
    .translate([0, 0, rot])
    .translate(trans)
    .rotate([0, rot, 0])
    .translate(translate)
    .rotate(rotate);
};

module.exports = Place;
