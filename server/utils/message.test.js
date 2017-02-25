var expect = require('expect');
var generateMessage = require('./message');

describe('generateMessage',() => {
    it('should generate correct message object',() => {
        //store res in variable
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from,text);
        //assert createAt is number
        expect(message.createAt).toBeA('number');
        //assert from & text match
        expect(message).toInclude({
            from:from,
            text:text
        });
    });
});