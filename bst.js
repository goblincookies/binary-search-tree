import { MergeSort } from './mergesort.js';

class BST {
    tree = []
    root;
    merge = new MergeSort();

    constructor( arr ){

        arr = this.cleanup( arr );
        console.log( arr );
        this.root = this.buildTree(arr);
    };

    cleanup( arr ){
        arr = this.merge.cleanup( arr );
        arr = this.merge.mergeSort( arr );
        return arr;
    };

    print(){
        console.log( '------------------------------')
        this.prettyPrint( this.root );
    }

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
        if ( arr.length < 1 ) { return null };

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

        // BUILD LEFT AND RIGHT NODES
        root.left = this.buildTree( arr.slice( 0, mid ) );
        root.right = this.buildTree( arr.slice( mid + 1, arr.length ) );

        // RET ROOT
        return root;
    };


    insert( val ) { this.insertRec( this.root, val ) };
    insertRec( node, val ) {
        if ( !node ) { return };
        if ( node.val == val ) {
            return;
        };
        if( val < node.val ) {
            if ( node.left ) {
                this.insertRec( node.left, val );
            } else {
                node.left = new Node();
                node.left.val = val;
                return;
            }
        } else {
            if ( node.right ) {
                this.insertRec( node.right, val );
            } else {
                node.right = new Node();
                node.right.val = val;
                return;
            };
        };
    };


    find( val ) { return this.findRec( this.root, val ) };
    findRec( node, val ) {
        if ( !node ) { return null };

        if( val < node.val ) { return this.findRec( node.left, val ) }
        else if ( val > node.val ) { return this.findRec( node.right, val ) }
        // FOUND 
        else { return node };
    };

    // ROOT LEFT RIGHT
    preOrder(){ return this.preOrderRec( this.root, [] ) };
    preOrderRec( node, arr ) {
        if( node == null ) return arr;
        arr.push( node.val );
        this.preOrderRec( node.left, arr );
        this.preOrderRec( node.right, arr );
        return arr;
    };

    // LEFT ROOT RIGHT
    inOrder( ) { return this.inOrderRec( this.root, [] ) }
    inOrderRec( node, arr ) {
        if( node == null ) return arr;

        this.inOrderRec( node.left, arr );
        arr.push( node.val );
        this.inOrderRec( node.right, arr );
        return arr;
    };

    // LEFT RIGHT ROOT
    postOrder( ) { return this.postOrderRec( this.root, [] ); }
    postOrderRec( node, arr ) {
        if( node == null ) return;

        this.postOrderRec( node.left, arr );
        this.postOrderRec( node.right, arr );
        arr.push( node.val );
        return arr;
    };
    
    delete( val ) {
        console.log( 'deleting', val );
        this.deleteRec( null, this.root, val );
    };

    deleteRec( prev, node, val ) {
        // console.log( 'delete loop')
        if ( !node ) {
            console.log( `${ val } not found` );
            return null;
        };
        
        if( val < node.val ) {
            // console.log( 'left' );
            return this.deleteRec( node, node.left, val ); }
        else if ( val > node.val ) {
            // console.log( 'right' );
            return this.deleteRec( node, node.right, val ); }
        else {
            // FOUND IT
            // HAS ZERO CHILDREN:
            if ( !node.left && !node.right ) {
                //      -- DELETE
                this.linkParentToChild( prev, node.val, null );
                node = null;
                return node;
            };

            // HAS TWO CHILDREN
            //      -- FIND NEXT SMALLEST
            //      -- STEAL ITS VALUE
            //      -- DELETE STOLEN NODE
            if ( node.left && node.right ) {                
                let minVal = this.minVal( node.right )
                node.val = minVal;
                this.deleteRec( node, node.right, node.val );
                return node;
            };

            // HAS ONE CHILD
            if ( node.left ) {
                //      -- LINK PARENT TO NEXT
                this.linkParentToChild( prev, node.val, node.left );
                return node;
            } else {
                this.linkParentToChild( prev, node.val, node.right );
                return node;
            };  
        };
    };

    linkParentToChild( parent, val, child ) {
        if ( parent.left ) {
            if( parent.left.val == val ){ parent.left = child; }
        }
        
        if ( parent.right ){
            if( parent.right.val == val ){ parent.right = child; }
        };
    };

    minVal( node ) {

        if( node.left ) {
            return this.minVal( node.left );
        };
        console.log( node.val );
        return node.val;
    };
    
    // THE LONGEST PATH FROM NODE TO LEAF
    height( val ) {
        let found = this.find( val );
        if( !found ) { return 0 };

        return this.heightRec( found, 0 )
    };

    heightRec( node, h ) {
        if( !node ) { return h - 1 };
        return Math.max(
            this.heightRec( node.left, h + 1 ),
            this.heightRec( node.right, h + 1 )
        );
    };

    // THE PATH FROM ROOT TO NODE
    depth( val ) {
        return this.depthRec( this.root, val, 0 );
    };

    depthRec( node, val, d ) {
        if ( !node ) { return d - 1 };

        if( val < node.val ) { return this.depthRec( node.left, val, d + 1 ) }
        else if ( val > node.val ) { return this.depthRec( node.right, val, d + 1 ) }
        // FOUND 
        else { return d };
    };

    // CHECKS IF TREE IS BALANCED
    isBalanced() {
        return this.isBalancedRec( this.root, 0 );
    };
    isBalancedRec( node, d ) {
        if( !node ) { return true };

        let lHalf = this.heightRec( node.left, d + 1 );
        let rHalf = this.heightRec( node.right, d + 1 );

        if ( Math.abs( lHalf - rHalf ) > 1 ) { return false; }

        let lBalanced = this.isBalancedRec( node.left, 0 );
        let rBalanced = this.isBalancedRec( node.right, 0 );

        return( lBalanced && rBalanced );
    };

    rebalance(){
        let arr = this.inOrder();
        this.root = this.buildTree( arr );
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