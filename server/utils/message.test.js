var expect = require('expect');
var generate = require('./message');

describe('generateMessage',() => {
    it('should generate correct message object',() => {
        //store res in variable
        var from = 'Jen';
        var text = 'Some message';
        var message = generate.generateMessage(from,text);
        //assert createAt is number
        expect(message.createAt).toBeA('number');
        //assert from & text match
        expect(message).toInclude({
            from:from,
            text:text
        });
    });
});

describe('generateLocationMessage',() => {
    it('should generate correct location object',() => {
       var from = 'Evan';
       var latitude = 20;
       var longitude = 30;
       var url = 'https://www.google.com/maps?q=20,30';
       var message = generate.generateLocationMessage(from,latitude,longitude);
       
       expect(message.createAt).toBeA('number');
       expect(message).toInclude({from,url});
    });
});