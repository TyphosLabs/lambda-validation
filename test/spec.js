const expect = require('chai').expect;
const Lamdba = require('./lambda');
const Validation = require('../index');

const simple_schema = {name: Validation.String()};
const simple_context = {};
const simple_event = {
    'body-json': {name: 'Austin'}
};

describe('Validation()', function(){

    it('should init', function(){
        Validation(simple_schema, function(){});
    });

    it('should return typeof function', function(){
        var validation = Validation(simple_schema, function(){});
        expect(validation).to.be.a('function');
    });

    it('should return a working handler', function(done){
        var validation = Validation(simple_schema, function(event, context, callback){
            expect(context).to.equal(simple_context);
            callback(null, event.name);
        });
        validation(simple_event, simple_context, function(err, result){
            if(err) throw err;
            expect(result).to.equal(simple_event.name);
            done();
        });
    });
});
