const expect = require('expect');

//import isRealString 
const validation = require('./validation');

describe('isRealString',() => {
    it('should reject non-string values',() => {
        var res = validation.isRealString(98);
        expect(res).toBe(false);
    });
    
    it('should reject string with only spaces',() => {
        var res = validation.isRealString('    ');
        expect(res).toBe(false);
    });    

    it('should allow string with non-space characters',() => {
        var res = validation.isRealString('  evan  ');
        expect(res).toBe(true);
    });    
});