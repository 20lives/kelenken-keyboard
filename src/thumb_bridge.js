const { union, hull } = require('scad-js');
const Post = require('./switch_post.js');
const Place = require('./place.js');

const main_bridges = (switch_size, walls_size, structure, position) => {
  const post = Post(switch_size);
  const place = Place(structure, position);

  const rightBridge = () => {
    const j = structure.length - 1;
    const { start, length } = structure[j];
    const m =  place(post('top', 'right'), start + length - 1, j);

    return hull(
      m.translate(walls_size.top),
      m.projection().linear_extrude(1).translate(walls_size.bottom),
    );

  };

  const leftBridge = () => {
    let j = structure.length - 1;
    const { start, length } = structure[j];
    const next = structure[j + 1];
    const m = place(post('bottom', 'right'), start, j);

    return hull(
      m.translate(walls_size.top.map(x => -x)),
      m.projection().linear_extrude(1).translate(walls_size.bottom.map(x => -x)),
    );

  };

  const topBridge = (tb) => {
    const lr = 'right';

    const i = (lr == 'right') ? structure.length - 1 : 0;
    const { start, length } = structure[i];
    const j = (tb == 'top') ? start + length - 1 : start;
    const sign = (tb == 'top') ? 1 : -1;

    const gap_post = place(post(tb, lr), j, i);

    return hull(
      gap_post,
      gap_post.translate(walls_size.top.map(x => x * sign)),
    );
  };

  return {
    leftBridge: leftBridge(),
    rightBridge: rightBridge(),
    topBridge1: topBridge('top'),
    topBridge2: topBridge('bottom'),
  };
};

module.exports = main_bridges;
