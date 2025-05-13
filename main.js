import { BST } from './bst.js'

const count = 15;
const min = 0;
const max = 100;

let digits = new Array( count ).fill( 0 );
for( let i = 0; i< digits.length; i++){
    digits[ i ] = Math.floor( Math.random() * (max - min + 1) + min);
};

let lowest = 1000;
let highest = 0;
for( let i = 0; i< digits.length; i++){
    lowest = Math.min( lowest, digits[ i ] );
    highest = Math.max( highest, digits[ i ] );
};

console.log( 'highest:', highest );
console.log( 'lowest:', lowest );
console.log( digits );

let bst = new BST( digits );