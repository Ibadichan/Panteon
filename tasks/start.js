const gulp = require("gulp");
const config = require('../config');
const buildFavicons = require('./build-favicons');
const buildImages = require('./build-images');
const buildVideos = require('./build-videos');
const buildStyles = require('./build-styles');
const buildDocuments = require('./build-documents');

const {
  watch,
} = gulp;

const {
  sources: {
    favicons,
    images,
    videos,
    styles,
    documents,
  },
} = config.gulp;

const WATCH_DEFAULT_OPTIONS = {
  ignoreInitial: false,
};

const start = () => {
  watch(
    favicons.glob,
    WATCH_DEFAULT_OPTIONS,
    buildFavicons,
  );

  watch(
    images.glob,
    WATCH_DEFAULT_OPTIONS,
    buildImages
  );

  watch(
    videos.glob,
    WATCH_DEFAULT_OPTIONS,
    buildVideos
  );

  watch(
    styles.glob,
    WATCH_DEFAULT_OPTIONS,
    buildStyles
  );

  watch(
    documents.glob,
    WATCH_DEFAULT_OPTIONS,
    buildDocuments,
  );
};

module.exports = start;
