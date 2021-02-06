const gulp = require('gulp');
const gulpif = require('gulp-if');
const config = require('../config');
const browserSync = require('./constants/browser-sync');

const {
  src,
  dest,
} = gulp;

const {
  sources: {
    favicons,
  },
} = config.gulp;

const isDevelopment = process.env.NODE_ENV === 'development';

const buildFavicons = () => {
  const build = src(favicons.glob)
      .pipe(dest(favicons.destinationFolder))
      .pipe(gulpif(isDevelopment, browserSync.stream()));

  return build;
};

module.exports = buildFavicons;
