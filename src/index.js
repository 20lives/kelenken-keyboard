const fs = require('fs');
const { union } = require('@dotcore64/scad-js');

const { 
  main_cluster_structure,
  thumb_cluster_structure,
  thumb_cluster_position,
  switch_frame_config,
  walls_frame_config,
  main_cluster_position,
//  walls_size,
} = require('./config.js');

const main_cluster = require('./main_cluster.js');
const thumb_cluster = require('./thumb_cluster.js');
const connectors = require('./connectors.js');
const main_walls = require('./main_walls.js');
const thumb_walls = require('./thumb_walls.js');
const bridge = require('./bridge.js');

const right = union(
  main_cluster,
  thumb_cluster,
  main_walls,
  thumb_walls,
  connectors(walls_frame_config, thumb_cluster_structure, thumb_cluster_position),
  connectors(switch_frame_config, main_cluster_structure, main_cluster_position),
  bridge,
);

const left = right.mirror([1, 0, 0]);

fs.writeFileSync('./dist/left.scad', left.serialize());
fs.writeFileSync('./dist/right.scad', right.serialize());
