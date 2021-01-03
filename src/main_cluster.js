const { union } = require('scad-js');
const { main_cluster_structure, main_cluster_position, switch_frame_config } = require('./config.js');

const Place = require('./place.js');
const SwitchFrame = require('./switch_frame.js');

const row_frames = (structure, position, frame_config) => {
  const place = Place(structure, position);
  const switch_frame = SwitchFrame(frame_config);

  const arr = [];
  for(let i = 0; i < structure.length; i++) {
    const { start, length } = structure[i];
    for(let j = start; j < start + length; j++) {
      arr.push(place(switch_frame, j, i));
    }
  }

  return union(...arr);
};

module.exports = row_frames(main_cluster_structure, main_cluster_position, switch_frame_config);
