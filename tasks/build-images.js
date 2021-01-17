const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const gulpif = require('gulp-if');
const config = require('../config');

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

const buildImages = () => {
  const build = src(images.glob)
    .pipe(gulpif(isProduction, imagemin()))
    .pipe(dest(images.destinationFolder));

  return build;
};

module.exports = buildImages;
