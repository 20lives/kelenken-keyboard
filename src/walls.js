const { union, hull } = require('@dotcore64/scad-js');
const Post = require('./switch_post.js');
const Place = require('./place.js');

const pairsHull = (...items) => {
  const res = [];
  for (let i = 0; i < items.length - 1; i++) {
    res.push(hull(items[i], items[i + 1]));
  }
  return union(...res);
};

const projectExtrude = obj => hull(obj, obj.projection().linear_extrude(1));

const walls = (switch_size, walls_size, structure, position) => {
  const post = Post(switch_size);
  const place = Place(structure, position);

  const top = () => {
    const arr = [];
    for(let j = 0; j < structure.length; j++) {
      const { start, length } = structure[j];
      arr.push(
        place(post('top', 'left'), start + length - 1, j),
        place(post('top', 'right'), start + length - 1, j),
      );
    }

    const arr2 = arr.map(x => union(
      x,
      x.translate(walls_size.top),
    ));

    const arr3 = arr.map(x => union(
      x.translate(walls_size.top),
      x.projection()
        .linear_extrude(0.1)
        .translate(walls_size.bottom),
    ));

    return union(
      pairsHull(...arr3),
      pairsHull(...arr2),
    );
  };

  const bottom = () => {
    const arr = [];
    for(let j = 0; j < structure.length; j++) {
      const { start, length } = structure[j];
      const next = structure[j + 1];
      arr.push(
        place(post('bottom', 'left'), start, j),
        place(post('bottom', 'right'), start, j),
      );
      if (j < structure.length - 1) {
        if (start >= next.start && start < next.start + next.length) {
          arr.push(place(post('bottom', 'left'), start, j + 1));
        }
      }
    }

    const arr2 = arr.map(x => union(
      x,
      x.translate(walls_size.top.map(x => -x)),
    ));

    const arr3 = arr.map(x => union(
      x.translate(walls_size.top.map(x => -x)),
      x.projection()
        .linear_extrude(0.1)
        .translate(walls_size.bottom.map(x => -x)),
    ));

    return union(
      pairsHull(...arr3),
      pairsHull(...arr2),
    );
  };

  const side = (side) => {
    const pos = (side == 'right') ? structure.length - 1 : 0;
    const arr = [];
    const { start, length } = structure[pos];

    for(let i = 0; i < length; i++) {
      const wall = hull(
        place(post('top', side), start + i, pos),
        place(post('bottom', side), start + i, pos),
      );
      arr.push(projectExtrude(wall));
    }

    for(let i = 0; i < length - 1; i++) {
      const wall = hull(
        place(post('top', side), start + i, pos),
        place(post('bottom', side), start + i + 1, pos),
      );
      arr.push(projectExtrude(wall));
    }

    return union(...arr);
  };

  const gap = (tb, lr) => {

    const i = (lr == 'right') ? structure.length - 1 : 0;
    const { start, length } = structure[i];
    const j = (tb == 'top') ? start + length - 1 : start;
    const sign = (tb == 'top') ? 1 : -1;

    const gap_post = place(post(tb, lr), j, i);

    const wall1 = hull(
      gap_post,
      gap_post.translate(walls_size.top.map(x => x * sign)),
    );
    const wall2 = hull(
      gap_post.translate(walls_size.top.map(x => x * sign)),
      gap_post.projection().linear_extrude(1).translate(walls_size.bottom.map(x => x * sign)),
    );

    return union(
      projectExtrude(wall1),
      projectExtrude(wall2),
    );
  };

  return {
    bottom: bottom(),
    top: top(),
    left: side('left'),
    right: side('right'),
    topRight: gap('top', 'right'),
    topLeft: gap('top', 'left'),
    bottomLeft: gap('bottom', 'left'),
    bottomRight: gap('bottom', 'right'),
  };
};

module.exports = walls;
