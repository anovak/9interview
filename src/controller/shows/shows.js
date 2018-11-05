"use strict";

export class Shows {

    constructor( raw ) {
        this._raw = raw;
        this._json = null;
    }

    initialize() {

        try{

            this._json = JSON.parse( this._raw );
            return true;
        }
        catch( syntaxError ) {
            if( syntaxError instanceof SyntaxError  ) {
                return false;
            }
            throw syntaxError;
        }
    }

    get shows() {

        if( this._json === null ) {
            if( ! this.initialize() )
                return [];
        }

        return this._json.payload;
    }
}