const gulp = require('gulp');
const gulpClean = require('gulp-clean');
const config = require('../config');

const {
  cleanOptions: {
    glob,
    read,
    force,
    allowEmpty,
  },
} = config.gulp;

const clean = () => {
  return gulp.src(glob, {read, force, allowEmpty})
      .pipe(gulpClean());
};

module.exports = clean;
