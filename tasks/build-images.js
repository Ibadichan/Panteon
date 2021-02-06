const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');
const config = require('../config');
const browserSync = require('./constants/browser-sync');

const {
  src,
  dest,
} = gulp;

const {
  sources: {
    images,
  },
} = config.gulp;

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const buildImages = () => {
  const build = src(images.glob)
      .pipe(gulpif(isProduction, imagemin()))
      .pipe(dest(images.destinationFolder))
      .pipe(gulpif(isDevelopment, browserSync.stream()));

  return build;
};

module.exports = buildImages;
