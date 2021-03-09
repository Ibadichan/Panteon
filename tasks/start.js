const gulp = require('gulp');
const config = require('../config');
const browserSync = require('./constants/browser-sync');
const buildFavicons = require('./build-favicons');
const buildImages = require('./build-images');
const buildVideos = require('./build-videos');
const buildStyles = require('./build-styles');
const buildDocuments = require('./build-documents');
const buildScripts = require('./build-scripts');

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
    scripts,
  },
} = config.gulp;

const WATCH_DEFAULT_OPTIONS = {
  ignoreInitial: false,
};

const start = () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  watch(
      documents.glob,
      WATCH_DEFAULT_OPTIONS,
      buildDocuments,
  ).on('change', browserSync.reload);

  watch(
      favicons.glob,
      WATCH_DEFAULT_OPTIONS,
      buildFavicons,
  ).on('change', browserSync.reload);

  watch(
      images.glob,
      WATCH_DEFAULT_OPTIONS,
      buildImages,
  ).on('change', browserSync.reload);

  watch(
      videos.glob,
      WATCH_DEFAULT_OPTIONS,
      buildVideos,
  ).on('change', browserSync.reload);

  watch(
      styles.glob,
      WATCH_DEFAULT_OPTIONS,
      buildStyles,
  ).on('change', browserSync.reload);

  watch(
      scripts.glob,
      WATCH_DEFAULT_OPTIONS,
      buildScripts,
  ).on('change', browserSync.reload);
};

module.exports = start;
