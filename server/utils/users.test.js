'user strict';
const expect = require('expect');
const Users = require('./users');

// console.log(typeof Users);

describe('Users',() =>{
    it('should add a new user',()=> {
        var users = new Users();
        var user = {
            id:'1234shid',
            name:'mike',
            room:'1'
        }
        var resUser = users.addUser(user);
        expect(users.users).toEqual([user]);
        
    });
});
