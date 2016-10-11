const Validation = require('@typhoslabs/validation');
const DEFAUL_OPTIONS = {
    sanitize: true
};

// Set the Validation base function to our wrapper
Validation.setFn(wrapper);

// This wraps our lambda handler function
function wrapper(schema, handler, options){

    // Set default options
    options = defaultOptions(options);
    
    var validation;
    if(!options.sanitize) validation = Validation.Object(schema).lenient();
    else validation = Validation.Object(schema);
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
        if(body instanceof Error) return callback(body);
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
    var obj = {};
    for(var opt in DEFAUL_OPTIONS) obj[opt] = (opts[opt] === undefined ? DEFAUL_OPTIONS[opt] : opts[opt]);
    return obj;
}

module.exports = Validation;