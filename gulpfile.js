const gulp = require("gulp");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const assets = require("postcss-assets");
const postcssPresetEnv = require("postcss-preset-env");
const sortMQ = require("postcss-sort-media-queries");

const {
  src,
  dest,
  watch,
  series,
} = gulp;

const buildImages = () => {
  const build = src("./src/img/**/*")
    .pipe(imagemin())
    .pipe(dest("./dist/img"));

  return build;
};

const buildDocuments = () => {
  const build = src("./src/*.html")
    .pipe(dest("./dist"));

  return build;
};

const buildStyles = () => {
  const postcssPlugins = [
    assets({
      cachebuster: true,
      loadPaths: ["scr/img/"],
    }),
    postcssPresetEnv({ stage: 0 }),
    sortMQ(),
    autoprefixer(),
    cssnano(),
  ];

  const buildSources = [
    "./src/styles/normalize.css",
    "./src/styles/global.css",
    "./src/styles/**/*",
  ];

  const build = src(buildSources)
    .pipe(concat("style.min.css"))
    .pipe(postcss(postcssPlugins))
    .pipe(dest("./dist"));

  return build;
};

const enableHotReloading = () => {
  watch(
    "./src/styles/**/*",
    {
      ignoreInitial: false,
    },
    buildStyles
  );

  watch(
    "./src/img/**/*",
    {
      ignoreInitial: false,
    },
    buildImages
  );
};

const buildAssets = series(
  buildImages,
  buildStyles,
  buildDocuments,
);

const tasks = {
  start: enableHotReloading,
  build: buildAssets,
  "build-images": buildImages,
  "build-styles": buildStyles,
  "build-documents": buildDocuments,
  default: buildAssets,
};

module.exports = tasks;
