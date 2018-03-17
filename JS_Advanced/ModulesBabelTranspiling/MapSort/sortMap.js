function mapSort (map, sorter) {

  let sorted = Array.from(map.entries());

  if (sorter) {
    sorted.sort(sorter);

  } else {

    sorted.sort((a, b) => {

      if (typeof a[0] === 'number') {
        return a[0] - b[0];

      } else {
        return a[0].localeCompare(b[0]);

      }
    });

  }

  return new Map(sorted);
}

module.exports = mapSort;