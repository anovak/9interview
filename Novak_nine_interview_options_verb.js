// ----------------------------------------------------------------------------
// Purpose:		Options request handler for cors request
// Sec-Context:	root role can create in any site, others only in home site
// ----------------------------------------------------------------------------
"use strict";

const AWS = require('aws-sdk'); 

module.exports.handler = (event, context, callback) => {

	console.log( 'Debug: Options callback fro CORS headers ');
	console.log( 'Debug: event:  ' + JSON.stringify(event));
	
	var cors_headers = createCorsHeaders(event);
	console.log( 'Debug: cors_headers:  ' + JSON.stringify(cors_headers));
	
	callback(null, {
		statusCode: 200,
		headers: cors_headers
	});
};

// ----------------------------------------------------------------------------
// Purpose:	create the headers needed to reply to cors request
// Notes:
// ----------------------------------------------------------------------------
function createCorsHeaders(event)
{
	const cors_headers = {};
	
	if( ! event )
		return cors_headers;
	
	if( ! ('stageVariables' in event) )
		return cors_headers;
	
	if( event.stageVariables.CORS_ACCESS_CONTROL_ALLOW_ORIGIN )
	{
		cors_headers['Access-Control-Allow-Origin'] = event.stageVariables.CORS_ACCESS_CONTROL_ALLOW_ORIGIN.replace( /all/gi, '*' );
	}
	
	if( event.stageVariables.CORS_ACCESS_CONTROL_ALLOW_METHODS )
	{
		cors_headers['Access-Control-Allow-Methods'] = event.stageVariables.CORS_ACCESS_CONTROL_ALLOW_METHODS.replace( /all/gi, 'DELETE, GET, OPTIONS, POST, PUT' );
	}

	if( event.stageVariables.CORS_ACCESS_CONTROL_ALLOW_HEADERS )
	{
		cors_headers['Access-Control-Allow-Headers'] = event.stageVariables.CORS_ACCESS_CONTROL_ALLOW_HEADERS.replace( /all/gi, 'Accept,Content-Type,Authorization' );
	}
	
	return cors_headers;
};
