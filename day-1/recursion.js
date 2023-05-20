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
function generatePascalsTriangle(height) {
  if (height <= 0) {
    return [];
  }

  if (height === 1) {
    return [[1]];
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

  return triangle;
}

const res = generatePascalsTriangle(5000);
console.log(res);
