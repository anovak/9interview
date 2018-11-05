// ----------------------------------------------------------------------------
// Purpose: Filter a manifest of tv shows and return DRM titles
// Sec-Context: None. World open endpoint.
// ----------------------------------------------------------------------------
"use strict";

import {Shows} from "./src/controller/shows/shows";
import {ShowsValidator} from "./src/controller/shows/showsvalidator";
import {Filter} from "./src/controller/shows/filter";
import {ParseError} from "./src/models/parseerror";
import {ServerError} from "./src/models/servererror";
import {ValidationError} from "./src/models/validationerror";
import {Cors} from "./src/aws/cors";

//
// HTTP endpoint (channel 9 specific) status codes.
//
const Error_server = 500;
const Error_parse  = 400;
const Error_semantic = 400;
const Success = 200;

module.exports.handler = (event, context, callback) => {

    console.log( event );

    const cors = new Cors( event );

    try {
        //
        // load data source and validate that the data can be deserialized
        //
        const shows = new Shows( event.body );
        if( ! shows.initialize() ) {
            const pe = new ParseError();
            callback(null, { statusCode: Error_parse, headers: cors.headers, body: JSON.stringify(pe.response) });
            return;
        }

        //
        // do any semantic level validation of the source data
        //
        const validator = new ShowsValidator( shows );
        const valid = validator.isValidForUseCase();
        if( !valid.ok ) {
            const ve = new ValidationError( valid.errors );
            callback(null, { statusCode: Error_semantic, headers: cors.headers, body: JSON.stringify(ve.response) });
            return;
        }

        //
        // filter out the shows as per business spec and return the subset
        //
        const filter = new Filter( shows );
        const records = filter.filterByDRM( 0 );
        const response = {response: records};
        callback(null, { statusCode: Success, headers: cors.headers, body: JSON.stringify(response) });
    }
    catch ( ex ) {
        console.error( ex );
        const se = new ServerError();
        callback(null, { statusCode: Error_server, headers: cors.headers, body: JSON.stringify(se.response) });
        return;
    }
};

