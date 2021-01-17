const gulp = require("gulp");
const buildFavicons = require('./build-favicons');
const buildImages = require('./build-images');
const buildVideos = require('./build-videos');
const buildStyles = require('./build-styles');
const buildDocuments = require('./build-documents');

const {
  series,
} = gulp;

const build = series(
  buildFavicons,
  buildImages,
  buildVideos,
  buildStyles,
  buildDocuments,
);

module.exports = build;
