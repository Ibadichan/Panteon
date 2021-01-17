const build = require('./tasks/build');
const start = require('./tasks/start');
const buildFavicons = require('./tasks/build-favicons');
const buildImages = require('./tasks/build-images');
const buildVideos = require('./tasks/build-videos');
const buildStyles = require('./tasks/build-styles');
const buildDocuments = require('./tasks/build-documents');

const tasks = {
  start,
  build,
  "build-favicons": buildFavicons,
  "build-images": buildImages,
  "build-videos": buildVideos,
  "build-styles": buildStyles,
  "build-documents": buildDocuments,
  default: build,
};

module.exports = tasks;
