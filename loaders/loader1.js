const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const schema = require('./schema');

module.exports = function (content, map, meta) {
  console.log('loader1', content);

  const options = getOptions(this);

  console.log('loader1', options);

  validate(schema, options, {
    name: 'loader3',
  });

  return content;
};

// trigger firstly
module.exports.pitch = function (...args) {
  console.log('loader1 pitch', args);
};
