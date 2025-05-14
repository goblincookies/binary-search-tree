import { BST } from './bst.js'

const count = 25;
const min = 0;
const max = 100;

let digits = new Array( count ).fill( 0 );

for( let i = 0; i< digits.length; i++){
    digits[ i ] = Math.floor( Math.random() * (max - min + 1) + min);
};

digits = [1,4,3,5,6,8,9,41,55,99,23,45,67];

// let delNum = digits[ Math.floor( Math.random() * digits.length ) ];
// let delNum = 9;

digits.push( 45 );

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
bst.print();
console.log( bst.height( 55 ) );

// bst.insert( 24 );
// bst.insert( 25 );

// bst.delete( delNum );
// bst.print();

// bst.postOrder();

// bst.print();

console.log( 'height: ', bst.height( 55 ) );
console.log( 'height: ', bst.height( 1 ) );
console.log( 'height: ', bst.height( 9 ) );

