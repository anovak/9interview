"use strict";

export class ValidationError {

    constructor( errors ) {

        this._errors = errors;
    }

    get response(){

        return this._errors.map( i => { return {
            "severity": i.severity,
            "message": i.message
        } });
    }
}