module.exports = function (content, map, meta) {
  console.log('loader2', content);

  this.callback(null, content);

  // return content;
};

// trigger firstly
module.exports.pitch = function () {
  console.log('loader2 pitch');
};
