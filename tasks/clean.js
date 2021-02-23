const del = require('del');
const config = require('../config');

const {
  cleanOptions: {
    glob,
  },
} = config.gulp;

const clean = () => {
  return del([
    glob,
  ]);
};

module.exports = clean;
