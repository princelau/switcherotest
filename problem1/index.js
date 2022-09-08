// for loop
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// recursive
var sum_to_n_b = function (n) {
  if (n === 0) {
    return 0;
  }
  return sum_to_n_b(n - 1) + n;
};

// math equation
var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(15));
console.log(sum_to_n_b(15));
console.log(sum_to_n_c(15));
