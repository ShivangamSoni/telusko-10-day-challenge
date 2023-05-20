/**
 * For a given `height` return a Matrix Array of height length
 * Representing the Pascals Triangle
 *
 * e.g.: height = 5
 * ```
 *        1
 *      1   1
 *    1   2   1
 *  1   3   3   1
 * 1   4   6   4   1
 * ```
 *
 *
 * @param {number} height
 * @return {number[][]}
 */
const generatePascalsTriangle = (function () {
  // Creating Memoized version of Algorithm using IIFE by creating a cache within the Closure
  const cache = new Map();

  return function generatePascalsTriangle(height) {
    if (height <= 0) {
      return [];
    }

    if (height === 1) {
      return [[1]];
    }

    if (cache.has(height)) {
      return cache.get(height);
    }

    const triangle = generatePascalsTriangle(height - 1);
    const prevRow = triangle[triangle.length - 1];
    const row = [];
    for (let i = 0; i <= height - 1; i++) {
      if (i === 0 || i === height - 1) {
        row.push(1);
      } else {
        const cell = prevRow[i - 1] + prevRow[i];
        row.push(cell);
      }
    }
    triangle.push(row);
    // Save in Cache, Needs to be destructured otherwise only Reference if Stored
    cache.set(height, [...triangle]);

    return triangle;
  };
})();

const res = generatePascalsTriangle(5);
console.log(res);
