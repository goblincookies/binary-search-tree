class MergeSort {


    mergeSort( array ) {

        // ONLY 2 OR LESS ELEMENTS?
        if ( array.length < 3 ) {
            let newarray = []
            if( typeof array[ 0 ] == 'number' &&
                typeof array[ 1 ] == 'number' ){
                newarray[ 0 ] = Math.min( array[ 0 ], array[ 1 ] );
                newarray[ 1 ] = Math.max( array[ 0 ], array[ 1 ] );
            } else {
                newarray.push( typeof array[ 0 ] == 'number' ? array[ 0 ] : array[ 1 ] );
            };
            return newarray;
        };

        // SPLIT IN HALF
        let half = Math.floor( array.length / 2 );
        let ahalf = this.mergeSort( array.slice(0, half ) );
        let bhalf = this.mergeSort( array.slice( half, array.length ) );

        // MERGE
        let n = ahalf.length + bhalf.length;
        let merged = [];
        for ( let i = 0; i < n; i++ ) {

            // THE REPEATED INSTRUCTIONS HERE MAKE
            // ME THINK THIS CAN BE REDUCED TO FEWER STEPS
            // FOREXAMPLE MIN / MAX IS SIMPLER,
            // BUT I STILL NEED TO CHECK FOR THE SHIFT()
            if( typeof ahalf[ 0 ] == 'number' &&
                typeof bhalf[ 0 ] == 'number' ){
                
                if ( ahalf[ 0 ] < bhalf[ 0 ] ) {
                    merged.push( ahalf[ 0 ] );
                    ahalf.shift();          
                } else {
                    merged.push( bhalf[ 0 ] );
                    bhalf.shift(); 
                };

            } else {
                if ( ahalf[ 0 ] ) {
                    merged.push( ahalf[ 0 ] );
                    ahalf.shift();
                } else {
                    merged.push( bhalf[ 0 ] );
                    bhalf.shift(); 
                };
            };
        };

        return merged;
    };

    cleanup( input ) {
        if ( typeof input == 'string' ) {
            // REMOVE EXTRA SPACES
            input = input.replace(/\s+/g,' ');
            // MAKE ARRAY; SPLIT BY SPACE OR COMMAS
            input = input.split( /[\s,]+/ );
            // CONVERT TO INTEGERS
            input = input.map( n => parseInt( n ) );
        };

        // REMOVE DUPLICATES
        input = [...new Set( input ) ];
        // REMOVE NaN
        input = input.filter( n => !Number.isNaN( n ) );
        return input;
    };

};


export { MergeSort };