const Validation = require('@typhoslabs/validation');

// Set the Validation base function to our wrapper
Validation.setFn(wrapper);

// This wraps our lambda handler function
function wrapper(schema, handler, options){

    // Set default options
    options = defaultOptions(options);
    var validation = Validation.Object(schema);
    // Anonymous function is justfied by the fact this will only exacute once

    return function(event, context, callback){

        // Save body, we about to use it a lot
        var body = event['body-json'];
        // TODO use lambda-errors?
        // Make sure we have a body
        if(!body) return callback(new Error('No body on event!'));
        // Validate our data
        body = validation.validate(body);
        // TODO wrap with lambda-errors?
        if(body instanceof Error) return callback(err);
        // Sanitize our data
        if(options.sanitize) body = sanitize(body);
        // TODO maybe just map this to body in API gateway
        // Delete old body
        delete event['body-json'];
        // Set new body
        event.body = body;
        // Call our Lambda handler
        handler(event, context, callback);
    }
};

function defaultOptions(opts){
    return {
        sanitize: opts.sanitize || false
    };
}

function sanitize(schema, data){
    // TODO logic goes here
    return data;
}

module.exports = Validation;