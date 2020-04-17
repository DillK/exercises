var fs = require('fs');

function permutation(n, r) {
  return factorial(n) / factorial(n - r);
}

function factorial(n) {
  let c;
  let r = 1;

  for (c = 1; c <= n; c++)
    r = r * c;

  return r;
}

// Heaps algorithm
function* permute(a, n = a.length) {
  if (n <= 1) yield a.slice();
  else for (let i = 0; i < n; i++) {
    yield* permute(a, n - 1);
    const j = n % 2 ? 0 : i;
    [a[n - 1], a[j]] = [a[j], a[n - 1]];
  }
}

console.log("Program is calculating");

let permutations = Array.from(permute("123456789".split(''))).map(perm => perm.join('')).filter((el, idx, self) => (self.indexOf(el) === idx));

console.log(`We expect ${permutation(9)} permutations`);
console.log(`We found ${permutations.length} permutations`);

fs.writeFileSync("permutations.json", JSON.stringify(permutations), error => { console.log("Failed") });

console.log("Finished");
