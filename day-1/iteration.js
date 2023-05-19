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
  const triangle = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        row.push(1);
      } else {
        const rowUp = triangle[i - 1][j];
        const rowUpPrevCol = triangle[i - 1][j - 1];
        row.push(rowUp + rowUpPrevCol);
      }
    }
    triangle.push(row);
  }
  return triangle;
}

const res = generatePascalsTriangle(5000);
console.log(res);
