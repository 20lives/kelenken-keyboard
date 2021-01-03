const { union, hull } = require('scad-js');

const { 
  main_cluster_structure,
  thumb_cluster_structure,
  thumb_cluster_position,
  walls_frame_config,
  main_cluster_position,
  walls_size,
} = require('./config.js');

const main_bridge = require('./main_bridge.js');
const thumb_bridge = require('./thumb_bridge.js');

const main_bridges = main_bridge(walls_frame_config, walls_size, main_cluster_structure, main_cluster_position);

const thumb_bridges = thumb_bridge(walls_frame_config, walls_size, thumb_cluster_structure, thumb_cluster_position);

module.exports = union(
  union(
    main_bridges.topBridge,
    thumb_bridges.topBridge1,
  ),
  union(
    main_bridges.topBridge,
    thumb_bridges.topBridge2,
  ),
  hull(
    main_bridges.leftBridge,
    thumb_bridges.rightBridge,
  ),
  hull(
    main_bridges.rightBridge,
    thumb_bridges.leftBridge,
  ),
);
