const gulp = require('gulp');
const gzip = require('gulp-gzip');
const gulpif = require('gulp-if');
const config = require('../config');
const browserSync = require('./constants/browser-sync');

const {
  src,
  dest,
} = gulp;

const {
  gzipOptions,
  sources: {
    documents,
  },
} = config.gulp;

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const buildDocuments = () => {
  const build = src(documents.glob)
      .pipe(dest(documents.destinationFolder))
      .pipe(gulpif(isDevelopment, browserSync.stream()))
      .pipe(gulpif(isProduction, gzip(gzipOptions)))
      .pipe(gulpif(isProduction, dest(documents.destinationFolder)));

  return build;
};

module.exports = buildDocuments;
