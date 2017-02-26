var generate = {};
generate.generateMessage = (from,text) => {
    return {
        from,
        text,
        createAt:new Date().getTime()
    };
};

generate.generateLocationMessage = (from,latitude,longitude) => {
    return {
      from:from,
      url:`https://www.google.com/maps?q=${latitude},${longitude}`,
      createAt: new Date().getTime()
    };
}
module.exports = generate;