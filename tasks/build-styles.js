const gulp = require("gulp");
const gulpif = require('gulp-if');
const gzip = require('gulp-gzip');
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const assets = require("postcss-assets");
const postcssPresetEnv = require("postcss-preset-env");
const sortMQ = require("postcss-sort-media-queries");
const config = require('../config');

const {
  src,
  dest,
} = gulp;

const {
  gzipOptions,
  sources: {
    styles,
  },
} = config.gulp;

const isProduction = process.env.NODE_ENV === 'production';

const buildStyles = () => {
  const postcssPlugins = [
    assets(styles.resolveAssetsOptions),
    postcssPresetEnv(styles.postcssPresetEnvOptions),
  ];

  if (isProduction) {
    postcssPlugins.push(
      sortMQ(),
      autoprefixer(),
      cssnano(),
    );
  }

  const build = src(styles.glob)
    .pipe(concat(styles.bundleFileName))
    .pipe(postcss(postcssPlugins))
    .pipe(dest(styles.destinationFolder))
    .pipe(gulpif(isProduction, gzip(gzipOptions)))
    .pipe(gulpif(isProduction, dest(styles.destinationFolder)));

  return build;
};

module.exports = buildStyles;
