var moment = require('moment');
// var date = new Date();
// var months = ['Jan','Feb'];
// //start at 0 index
// console.log(date.getMonth());
// var date = moment();
// console.log(date.format('D/MMM/YYYY'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createAt = 1234;
var date = moment(createAt);
console.log(date.format('h:mm:a'));