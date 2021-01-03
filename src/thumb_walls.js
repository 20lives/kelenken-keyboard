const { union } = require('scad-js');

const {
  thumb_cluster_structure,
  thumb_cluster_position,
  // switch_frame_config,
  walls_frame_config,
  walls_size,
} = require('./config.js');

const walls = require('./walls.js');

const w = walls(walls_frame_config, walls_size, thumb_cluster_structure, thumb_cluster_position);

module.exports = union(
  w.left,
  //w.right,
  w.top,
  w.bottom,
  w.topLeft,
  //w.topRight,
  w.bottomLeft,
  //w.bottomRight,
);
