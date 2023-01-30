/*
data type:
 a. premitive data type:
    1. number
    2. string
    3. boolean
    4. undefined
    5. null
    6. symbol
 non-premitive:
    1. object
*/

// premitive

let a = 'hello!';
let b = a;
console.log(a, b);
// a = 'gelo';
b = 'gelo!';
console.log(a, b);

// non-permitive

let x = { job: 'web developer' };
let y = x;
console.log(x, y);
// x.job = 'front end web developer';
y.job = 'front end web developer';
console.log(x, y);