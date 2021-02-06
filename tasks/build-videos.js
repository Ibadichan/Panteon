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
    videos,
  },
} = config.gulp;

const isDevelopment = process.env.NODE_ENV === 'development';

const buildVideos = () => {
  const build = src(videos.glob)
      .pipe(dest(videos.destinationFolder))
      .pipe(gulpif(isDevelopment, browserSync.stream()));

  return build;
};

module.exports = buildVideos;
