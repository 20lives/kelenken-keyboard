const main_cluster_structure = [
  { start: -1, length: 3, radius: 45, step: 35, rot: 8, trans: [18 * 0, 0, 5] },
  { start: -1, length: 3, radius: 45, step: 35, rot: 4, trans: [18 * 1, 0, 5] },
  { start: -2, length: 4, radius: 45, step: 35, rot: 0, trans: [18 * 2, 0, 0] },
  { start: -2, length: 4, radius: 45, step: 35, rot: 0, trans: [18 * 3, 0, 4] },
  { start: -1, length: 3, radius: 45, step: 35, rot: 0, trans: [18 * 4, -6, 8] },
];

const main_cluster_position = {
  translate: [0, 0, 60],
  rotate: [0, 10, 0],
};

const thumb_cluster_structure = [
  { start: 0, length: 2, radius: 57, step: 25, rot: 0, trans: [22 * 0, 0, 3] },
  { start: -1, length: 3, radius: 53, step: 25, rot: 0, trans: [22 * 1, 10, 0] },
  { start: 0, length: 2, radius: 57, step: 25, rot: 0, trans: [22 * 2, 0, 3] },
];

const thumb_cluster_position = {
  translate: [-9, -20, 100],
  rotate: [0, -65, 30],
};

const walls_size = {
  top: [0, 10, 0],
  bottom: [0, 20, 0],
};

const switch_frame_config = {
  x: 14.4,
  y: 14.4,
  z: 4,
  t: 1, // wall thickness
};

const walls_frame_config = {
  x: 14.4,
  y: 14.4,
  z: 2,
  t: 1, // wall thickness
};

module.exports = {
  thumb_cluster_structure,
  thumb_cluster_position,
  main_cluster_structure,
  main_cluster_position,
  switch_frame_config,
  walls_frame_config,
  walls_size,
};
