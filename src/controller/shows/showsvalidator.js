"use strict";

export class ShowsValidator {

    constructor( shows ) {

        this._shows = shows;
    }

    isValidForUseCase() {
        return {
            "ok": true,
            "errors": []
        }
    }
}