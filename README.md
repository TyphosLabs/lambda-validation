[![CircleCI](https://circleci.com/gh/TyphosLabs/lambda-validation/tree/master.svg?style=svg)](https://circleci.com/gh/TyphosLabs/lambda-validation/tree/master)
# lambda-validation
This module is a wrapper for a Node.js AWS Lambda handler function that adds validation to the handler and advanced error handling for API Gateway with a very minimal interface.
# example usage
``` javascript
// Require lambda-validation
const Validation = require('lambda-validation');
// Create and save a schema
const schema = {
    name: Validation.String().required()
};
// Write and save a handler
const handler = (event, context, callback) => {
    callback(null, `Hello ${event.body.name}`);
};
// Export wrapper
exports.handler = Validation(schema, handler);
```
# setup
- create a Lambda with the example code above
- setup API gateway
- create API Gateway endpoint and point it at your lambda
- add passthrough schema to your API Gateway
- setup HTTP status codes
- test the endpoint
