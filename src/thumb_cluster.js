const { union } = require('scad-js');
const { thumb_cluster_structure, switch_frame_config, thumb_cluster_position } = require('./config.js');

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

module.exports = row_frames(thumb_cluster_structure, thumb_cluster_position, switch_frame_config);
