const gulp = require('gulp');
const gulpif = require('gulp-if');
const gzip = require('gulp-gzip');
const terser = require('gulp-terser');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const config = require('../config');
const browserSync = require('./constants/browser-sync');

const {dest} = gulp;

const {
  gzipOptions,
  sources: {scripts},
} = config.gulp;

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const buildScripts = () => {
  const build = browserify(scripts.browserifyOptions)
      .transform(babelify.configure(scripts.babelifyOptions))
      .bundle()
      .on('error', (error) => console.log(error.message))
      .pipe(source(scripts.bundleFileName))
      .pipe(buffer())
      .pipe(gulpif(isProduction, terser()))
      .pipe(dest(scripts.destinationFolder))
      .pipe(gulpif(isDevelopment, browserSync.stream()))
      .pipe(gulpif(isProduction, gzip(gzipOptions)))
      .pipe(gulpif(isProduction, dest(scripts.destinationFolder)));

  return build;
};

module.exports = buildScripts;
