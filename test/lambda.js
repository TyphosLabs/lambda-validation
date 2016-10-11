const Validation = require('../index.js');

exports.handler = Validation({
    name: Validation.String().required()
}, (event, context, callback) => {
    callback(null, `Hello ${event.body.name}`);
}, {
    // Options go here
});