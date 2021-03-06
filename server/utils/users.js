//addUser(id,name,room),
//removeUser(id),
//getUser(id),
//getUserList(room)
"use strict";
class Users {
    constructor() {
        this.users = [];
    }
    
    addUser(id,name,room) {
        var user = {id,name,room};
        this.users.push(user);
        return this.user;
    }
    
    removeUser(id) {
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => {
                return user.id !== id;
            });
        }
        return user;
    }
    
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });
        var nameArray = users.map((user) => {
           return user.name;
        });
        return nameArray;
    }
}

module.exports = Users;