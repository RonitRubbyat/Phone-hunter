/* 
flasy:

false
0
empty string ''
null
undefined
NaN

truthy:

ture
any number except 0
any string including ' ', '0', 'false'
[]
{}
anything false that is true
*/

let x = NaN;

if (x) {
    console.log("it's true!");
} else {
    console.log("it's false!");
};