// From JavaScript: The good parts - Chapter 6. Arrays,
// Section 6.7. Dimensions.
// Inspiration from http://www.quesucede.com/public/gameoflife

Array.matrix = function (m, n, initial) {
  var a, i, j, mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];
    for (j = 0; j < n; j += 1) {
      a[j] = 0;
    }
    mat[i] = a;
  }
  return mat;
};