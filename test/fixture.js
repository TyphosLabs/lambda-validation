console.log('Loading...');
const Lamdba = require('./lambda');
const Config = require('./config');

console.log('Executing lambda...');
Lamdba.handler(Config.event, Config.context, (err, result) => {
    if(err) throw err;
    console.log('Lambda:', JSON.stringify(result, null, 4));
});