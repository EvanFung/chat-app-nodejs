var generate = {};
var moment = require('moment');
generate.generateMessage = (from,text) => {
    return {
        from,
        text,
        createAt:moment().valueOf()
    };
};

generate.generateLocationMessage = (from,latitude,longitude) => {
    return {
      from:from,
      url:`https://www.google.com/maps?q=${latitude},${longitude}`,
      createAt: moment().valueOf()
    };
}
module.exports = generate;