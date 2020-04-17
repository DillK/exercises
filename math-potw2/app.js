var fs = require('fs');

function parse(arr) {
  let num = "";
  for (let i = 0; i < arr.length; i++) {
    num += "" + arr[i];
  }
  return Number.parseInt(num);
}

console.log("Program is running ...");

let answers = [];
let valid = [];

let data = fs.readFileSync('permutations.json');
let permutations = JSON.parse(data);

for (let i = 0; i < permutations.length; i++) {
  let permut = permutations[i].split('');

  let grpA = parse([permut[0], permut[1]]);
  let grpB = parse([permut[2], permut[3], permut[4]]);
  let grpC = parse([permut[5], permut[6], permut[7], permut[8]]);

  let bool = (grpA * grpB === grpC);
  let answer = `Is ${grpA} times ${grpB} equal to ${grpC}? ${grpA} * ${grpB} = ${grpA * grpB} so the answer is ${bool ? 'yes' : 'no'}!`;
  answers.push(answer);

  if (bool) {
    valid.push(answer);
  }
}

fs.writeFileSync("all-answers.json", JSON.stringify(answers), error => { console.log("Failed") });
fs.writeFileSync("valid-answers.json", JSON.stringify(valid), error => { console.log("Failed") });

console.log("Program has finished ...");