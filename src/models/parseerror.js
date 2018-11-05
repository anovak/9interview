"use strict";

export class ParseError {


    get response(){

        return {
            response: [],
            error: 'Could not decode request'

        };
    }
}