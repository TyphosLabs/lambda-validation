console.log('Loading...');
const Lamdba = require('./lambda');
const Config = require('./config');

console.log('Executing lambda...');
Lamdba.handler(Config.event, Config.context, (err, result) => {
    if(err) return console.error(err);
    console.log('Lambda:', JSON.stringify(result, null, 4));
});