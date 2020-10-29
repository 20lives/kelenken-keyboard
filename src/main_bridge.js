const { hull } = require('@dotcore64/scad-js');
const Post = require('./switch_post.js');
const Place = require('./place.js');

const main_bridges = (switch_size, walls_size, structure, position) => {
  const post = Post(switch_size);
  const place = Place(structure, position);

  const rightBridge = () => {
    const { start, length } = structure[0];
    const sign = -1;

    const bridge_post = place(post('bottom', 'left'), start, 0);

    return hull(
      bridge_post.translate(walls_size.top.map(x => x * sign)),
      bridge_post.projection().linear_extrude(1).translate(walls_size.bottom.map(x => x * sign)).color('green'),
    );
  };

  const leftBridge = () => {
    const { start, length } = structure[0];

    const bridge_post = place(post('bottom', 'left'), start, 0);

    return hull(
      bridge_post,
      bridge_post.projection().linear_extrude(1),
    );
  };

  const topBridge = () => {
    const { start, length } = structure[0];
    const sign = -1;

    const bridge_post = place(post('bottom', 'left'), start, 0);

    return hull(
      bridge_post,
      bridge_post.translate(walls_size.top.map(x => x * sign)),
    );
  };

  return {
    leftBridge: leftBridge(),
    rightBridge: rightBridge(),
    topBridge: topBridge(),
  };
};

module.exports = main_bridges;
