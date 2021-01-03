const { union, hull } = require('scad-js');
const post = require('./switch_post.js');

const SwitchFrame = (size) => {

  const sPost = post(size);

  const right = hull(sPost('top', 'right'), sPost('bottom', 'right'));
  const left = hull(sPost('top', 'left'), sPost('bottom', 'left'));
  const top = hull(sPost('top', 'right'), sPost('top', 'left'));
  const bottom = hull(sPost('bottom', 'right'), sPost('bottom', 'left'));

  return union(
    top,
    bottom,
    left,
    right,
  );
};

module.exports = SwitchFrame;
