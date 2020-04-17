# Overview
<strong>(⊙_⊙)？</strong>

<b>WOW!</b> You kids are seriously this smart?! I can't believe you are already being taught advanced combinatorics. I didn't start doing these kinds of questions until taking discrete mathematics in university! You kids should be so proud! You're making the rest of us parents look silly.

I'm going to write a little guide for us small brain parents about how I was able to solve your homework.

# The Question
Arrange the digits 1,2,3,4,5,6,7,8, and 9 into three groups.

Make one group of two digits, one group of three digits, and one group of four digits.

When you multiply the first group of two digits by the second group of three digits you get the four digit number as your answer.

<strong>Example: 39 x 186 = 7254</strong>

There are six other possible combinations.

Part a: Solve the problem any way you can. Show your work.
Part b: Explain your thinking in writing. How did you come to your final answer?

<strong><em>Take a pic of your work. OR create a doc and submit to this assignment when you are done please.</em></strong>

# The Breakdown
Alrighty, so let's really think about this problem. We have:

- 9 digits.
```clike
[1,2,3,4,5,6,7,8,9]
```
- The digits can be in 9 positions across 3 groups
```clike
group1[no1,no2] * group2[no3,no4,no5] = group3[no6,no7,no8,no9]
```
- The digits cannot be reused
- Group 3 must be equal to the product of group 1 and group 2
- There are 6 additional correct possible combinations including the one the question provided, for a total of 7 correct combinations.

Yikes! This is a seriously hard question. Let's see if we can figure this out.

# Thinking Through The Problem

9 digits in 9 different positions. That sounds like it could be a ton of different arrangements, right? It is! In mathematics we call these permutations. Let's see exactly how many there are:


We have 9 digits:

```clike
[1,2,3,4,5,6,7,8,9]
```

We can place them in 9 different positions

```clike
_   _   _   _   _   _   _   _   _
1   2   3   4   5   6   7   8   9
```

So in the first position we have 9 different digits to choose from. Let's just pick the digit 9.

```clike
9   _   _   _   _   _   _   _   _
1   2   3   4   5   6   7   8   9
```

We need to put another digit in the next position. Because we cannot repeat digits, we now have only 8 more digits to choose from.

```clike
[1,2,3,4,5,6,7,8,  ]
```

Let's grab the 8

```clike
[1,2,3,4,5,6,7,    ]

9   8   _   _   _   _   _   _   _
1   2   3   4   5   6   7   8   9
```
Great! Let's think a little more about this now though. We first had 9 choices for the first position. Then we had 8 choices for the next position. How many possible choices did we have?

```clike
9 choices multiplied by 8 choices is 72 possible permutations of choices we could have made.
```
Woah. With only 2 digits in 2 positions we somehow had 72 possible choices we could have made?! That's so many! Don't forget though, there's still more positions to fill. Let's see what happens when we make one more.

```clike
[1,2,3,4,5,6,      ]

9   8   7   _   _   _   _   _   _
1   2   3   4   5   6   7   8   9

9 choices, multiplied by 8 choices, multiplied by 7 choices is 504 possible permutations of choices we could have made.
```

<strong>504?!</strong> Uh oh. The number of choices are going up pretty fast.

You readers might be seeing a pattern happening here. Each time we select a new digit, the number of choices we can make for the next digit is reduced by 1.

Let's complete the set and see how many possible permutations there are. This time, we're going to write it a bit more simply as

```clike
9 x 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1
1   2   3   4   5   6   7   8   9

In mathematics this is what we call a factorial. It can be written even more simply as

9!
```

Go ahead. Try punching that in on your calculator. This is going to be a big number.

<details>
<summary>SPOILER WARNING</summary>
9! = 362,880 possible permutations
</details>

<strong>OMG! (╯°□°）╯︵ ┻━┻)</strong>

We had that many possible choices in total?! How were we supposed to do this on paper? Is there some kind of crazy trick?! Maybe Mrs. B can show me her magical ways.

Ok. Relax. Breathe.

I have this tiny little brain, but I'm sure we can figure this out. What could I use to solve this ... If only I could think like a ... Like a ... <i>Computer</i> ... <b>OH WAIT!</b>

I'M A -

# 🔥🔥🔥💻COMPUTER PROGRAMMER!💻🔥🔥🔥


I can't believe I didn't think of that first. I can just tell a computer to do it for me! I'll just put this back

<strong>┳━┳ ノ( ゜-゜ノ)</strong>

In computer science this is actually an extremely similar problem to what we would call a password cracker. The only difference is we are dealing with less choices per position. I've even made one before!

*Note to self: Are we sure Mrs. B isn't secretly teaching the kids to be computer hackers?*

<strong>If you're still reading, I'm impressed! This is where I'm going to show off this big ol fat head of mine though. Just remember that this took me many years to learn - including university.

<em>Go ahead and skip to the end for the answers!👌</em></strong>

## Step 1 - Let's just calculate all the possible permutations
I'm going to be using a programming language called JavaScript. It's running on a programming environment called Node.js

This is actual code, but don't worry - it cannot actually run like this
```javascript
var fs = require('fs');

// Function to calculate permutations
function permutation(n, r) {
  return factorial(n) / factorial(n - r);
}

// Function to calculate factorials
function factorial(n) {
  let c;
  let r = 1;

  for (c = 1; c <= n; c++)
    r = r * c;

  return r;
}

// Heaps algorithm to calculate all possible non-repeating combinations
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

```
Neat. This generated a json file (a special file computers can read easily). I converted it to a plain text file so anyone can read it without issues.

Each line in the file is a new and unique combination of the 9 possible digits, non repeating.

## Step 2 - Calculate the math for every single combination
From this we can grab our 3 groups, and simply do the math!

```javascript
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
```
Great! I generated two files. The first file has all the possible answers to each unique combination. The second file has valid answers only.

# 🌟Big Brain🌟

<strong>
🥁🥁🥁 DRUMROLL 🥁🥁🥁
</strong>

```clike
[
  "Is 28 times 157 equal to 4396? 28 * 157 = 4396 so the answer is yes!",
  "Is 12 times 483 equal to 5796? 12 * 483 = 5796 so the answer is yes!",
  "Is 42 times 138 equal to 5796? 42 * 138 = 5796 so the answer is yes!",
  "Is 27 times 198 equal to 5346? 27 * 198 = 5346 so the answer is yes!",
  "Is 18 times 297 equal to 5346? 18 * 297 = 5346 so the answer is yes!",
  "Is 39 times 186 equal to 7254? 39 * 186 = 7254 so the answer is yes!",
  "Is 48 times 159 equal to 7632? 48 * 159 = 7632 so the answer is yes!"
]
```
<strong>
( •_•)>⌐■-■

(⌐■_■)
</strong>

Gottem.

# The Files

See them on my [GitHub](https://github.com/DillK/exercises/tree/master/math-potw2).

Thanks for reading everyone.

Ciao 👋😎