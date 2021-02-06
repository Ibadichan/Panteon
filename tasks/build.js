const gulp = require('gulp');
const buildFavicons = require('./build-favicons');
const buildImages = require('./build-images');
const buildVideos = require('./build-videos');
const buildStyles = require('./build-styles');
const buildDocuments = require('./build-documents');
const clean = require('./clean');

const {
  series,
} = gulp;

const build = series(
    clean,
    buildFavicons,
    buildImages,
    buildVideos,
    buildStyles,
    buildDocuments,
);

module.exports = build;
