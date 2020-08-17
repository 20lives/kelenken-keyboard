const S = require('@dotcore64/scad-js');
const { frame_sizes } = require('./config.js');

const switch_frame = require('./switch_frame.js');

console.log(switch_frame(frame_sizes).serialize());
