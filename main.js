import { BST } from './bst.js'

let count = 25;
const min = 0;
const max = 100;

let digits = new Array( count ).fill( 0 );

for( let i = 0; i< digits.length; i++){
    digits[ i ] = Math.floor( Math.random() * (max - min + 1) + min);
};

// digits = [1,4,3,5,6,8,9,41,55,99,23,45,67];

// let delNum = digits[ Math.floor( Math.random() * digits.length ) ];
// let delNum = 9;

// digits.push( 45 );

let lowest = 1000;
let highest = 0;
for( let i = 0; i< digits.length; i++){
    lowest = Math.min( lowest, digits[ i ] );
    highest = Math.max( highest, digits[ i ] );
};

console.log( 'highest:', highest );
console.log( 'lowest:', lowest );
console.log( digits );


// CREATE BINARY SEARCH TREE
// FROM ARRAY OF RANDOM NUMBERS < 100
let bst = new BST( digits );
bst.print();

// CONFIRM THE TREE IS BALANCED
console.log( 'Is Balanced:', bst.isBalanced() );

// PRINT PRE ORDER
console.log( 'Pre Order:', bst.preOrder() );

// PRINT POST ORDER
console.log( 'Post Order', bst.postOrder() );

// PRINT IN ORDER
console.log( 'In Order', bst.inOrder() );

// UNBALANCING THE TREE
count = Math.floor( 5 + Math.random() * 15 );
digits = new Array( count ).fill( 0 );
for( let i = 0; i< digits.length; i++){
    digits[ i ] = Math.floor( Math.random() * (max - min + 1) + min);
};
digits = bst.cleanup( digits );
console.log( `adding ${count} digits: ${digits}`);

for( let i = 0; i< digits.length; i++){
    bst.insert( digits[ i ] );
};

bst.print();


// CONFIRM THE TREE IS UNBALANCED
console.log( 'Is Balanced:', bst.isBalanced() );

// REBALANCE THE TREE
bst.rebalance();

// CONFIRM THE TREE IS AGAIN BALANCED
console.log( 'Is Balanced:', bst.isBalanced() );

// Confirm that the tree is balanced by calling isBalanced.
// Print out all elements in level, pre, post, and in order.


// PRINT PRE ORDER
console.log( 'Pre Order:', bst.preOrder() );

// PRINT POST ORDER
console.log( 'Post Order', bst.postOrder() );

// PRINT IN ORDER
console.log( 'In Order', bst.inOrder() );
