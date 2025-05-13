import { MergeSort } from './mergesort.js';

class BST {
    tree = []
    root;
    merge = new MergeSort();

    constructor( arr ){

        arr = this.merge.cleanup( arr );
        arr = this.merge.mergeSort( arr );
        console.log( arr );
        this.root = this.buildTree(arr);

        this.prettyPrint( this.root );

    };

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if ( node === null ) { return; }
        if ( node.right !== null ) {
          this.prettyPrint( node.right, `${ prefix }${ isLeft ? "│   " : "    "}`, false );
        }
        console.log(`${ prefix }${ isLeft ? "└── " : "┌── " }${ node.val }`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${ prefix }${ isLeft ? "    " : "│   " }`, true );
        }
      };

    buildTree( arr ){

        // IF NULL; RET
        if ( arr.length < 1 ) {
            // console.log( 'nothin, getting null') 
            // console.log( arr );
            return null
        };

        // NEW ROOT
        const root = new Node()

        // ONLY ONE
        if ( arr.length < 2 ) {
            root.val = arr[ 0 ];
            return root;
        };

        // ROOT IS HALF
        let mid = Math.floor( arr.length / 2 );        
        root.val = arr[ mid ];

        // BUILDTREE ( LEFT )
        root.left = this.buildTree( arr.slice( 0, mid ) );
        // BUILDTREE ( RIGHT )
        root.right = this.buildTree( arr.slice( mid + 1, arr.length ) );

        // RET ROOT
        return root;
    };
};

class Node {
    val = null;
    left = null;
    right = null;
    
    constructor( v ) {
        this.val = v;
    };
};

export { BST };