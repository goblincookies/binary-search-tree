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
        if ( node.val == val ) {
            console.log( 'found val:', val );
            console.log( node );
            return node;
        };

        if( val < node.val ) {
            if ( node.left ) {
                return this.findRec( node.left, val );
            } else {
                // NOT FOUND
                return null;
            };
        } else {
            if ( node.right ) {
                return this.findRec( node.right, val );
            } else {
                // NOT FOUND
                return null;
            };
        };
    };

    nextSmallest( node ) {
        if( !node ) { return null }
        if ( node.left ) {
            if ( node.left.left ) {
                return this.nextSmallest( node.left );
            }
            return node;
        };

    };

    // ROOT LEFT RIGHT
    preOrder(){ this.preOrderRec( this.root ) };
    preOrderRec( node ) {
        if( node == null ) return;

        console.log( node.val );
        this.preOrderRec( node.left );
        this.preOrderRec( node.right );
    };

    // LEFT ROOT RIGHT
    inOrder( node ) { this.inOrderRec( this.root ) }
    inOrderRec( node ) {
        if( node == null ) return;

        this.inOrderRec( node.left );
        console.log( node.val );
        this.inOrderRec( node.right );
    };

    // LEFT RIGHT ROOT
    postOrder( node ) {
        this.postOrderRec( this.root );
    }
    postOrderRec( node ) {
        if( node == null ) return;

        this.postOrderRec( node.left );
        this.postOrderRec( node.right );
        console.log( node.val );
    };
    
    delete( val ) {
        console.log( 'deleting' );
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

            console.log( 'found it!', node.val );

            // HAS ZERO CHILDREN:
            if ( !node.left && !node.right ) {
                //      -- DELETE
                console.log( 'no children' );
                console.log( node );

                this.linkParentToChild( prev, node.val, null );
                node = null;
                return node;
            };

            // HAS TWO CHILDREN
            //      -- FIND NEXT SMALLEST
            //      -- STEAL ITS VALUE
            //      -- DELETE STOLEN NODE
            if ( node.left && node.right ) {                
                console.log( 'both' );
                console.log( node );
                let minVal = this.minVal( node.right )
                console.log( minVal );
                node.val = minVal;
                this.deleteRec( node, node.right, node.val );
                return node;
            };

            // HAS ONE CHILD
            if ( node.left ) {
                //      -- LINK PARENT TO NEXT
                console.log( 'one child, left' );
                console.log( node );
                this.linkParentToChild( prev, node.val, node.left );
                return node;
            } else {
                console.log( 'one child, right' );
                console.log( node );
                this.linkParentToChild( prev, node.val, node.right );
                console.log( node );
                return node;
            };  
        };
    };

    linkParentToChild( parent, val, child ) {
        console.log( 'linking' )
        console.log( parent, val, child );

        if ( parent.left ) {
            console.log( 'checking left')
            if( parent.left.val == val ){ parent.left = child; }
        }
        
        if ( parent.right ){
            console.log( 'checking right')
            if( parent.right.val == val ){ parent.right = child; }
        };
    };

    minVal( node ) {
        console.log( 'finding minumum', node.val )
        if( node.left ) {
            return this.minVal( node.left );
        };
        console.log( node.val );
        return node.val;
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