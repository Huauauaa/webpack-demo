module.exports = function (content, map, meta) {
  console.log('loader3', content);

  // async
  const callback = this.async();

  setTimeout(() => {
    callback(null, content);
  }, 1000);

  // return content;
};

// trigger firstly
module.exports.pitch = function () {
  console.log('loader3 pitch');
};
