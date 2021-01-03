const { union, hull } = require('scad-js');
const Post = require('./switch_post.js');
const Place = require('./place.js');

const connectors = (size, structure, position) => {
  const right = (i, j) => union(
    hull(
      hull(
        place(post('top', 'right'), i, j),
        place(post('bottom', 'right'), i, j),
      ),
      hull(
        place(post('top', 'left'), i, j + 1),
        place(post('bottom', 'left'), i, j + 1),
      ),
    ),
  );

  const top = (i, j) => union(
    hull(
      hull(
        place(post('top', 'right'), i, j),
        place(post('top', 'left'), i, j),
      ),
      hull(
        place(post('bottom', 'right'), i + 1, j),
        place(post('bottom', 'left'), i + 1, j),
      ),
    ),
  );

  const diagonal = (i, j) => union(
    hull(
      hull(
        place(post('top', 'right'), i, j),
        place(post('top', 'left'), i, j + 1),
      ),
      hull(
        place(post('bottom', 'right'), i + 1, j),
        place(post('bottom', 'left'), i + 1, j + 1),
      ),
    ),
  );

  const post = Post(size);
  const place = Place(structure, position);
  const arr = [];

  for(let j = 0; j < structure.length; j++) {
    const { start, length } = structure[j];
    for(let i = 0; i < length; i ++) {
      const next = structure[j + 1];
      if (j < structure.length - 1) {
        if (start + i >= next.start && start + i < next.start + next.length)
        {
          arr.push(right(i + start, j));
        }
      }
      if (i < length - 1) {
        arr.push(top(i + start, j));
      }
      if (j < structure.length - 1 && i < length - 1) {
        if (start + i >= next.start && start + i < next.start + next.length) {
          arr.push(diagonal(i + start, j));
        }
      }
    }
  }

  return union(...arr);
};

module.exports = connectors;
