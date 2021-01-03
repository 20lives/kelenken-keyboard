const { union } = require('scad-js');

const { 
  main_cluster_structure,
  main_cluster_position,
  // switch_frame_config,
  walls_frame_config,
  walls_size,
} = require('./config.js');

const walls = require('./walls.js');

const w = walls(walls_frame_config, walls_size, main_cluster_structure, main_cluster_position);

module.exports = union(
  w.left,
  w.right,
  w.top,
  w.bottom,
  w.topLeft,
  w.topRight,
  //w.bottomLeft,
  w.bottomRight,
  /*
  w.rightBridge,
  w.leftBridge,
  w.topBridge,
  */
);
  
