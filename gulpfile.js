const gulp = require("gulp");
const gzip = require('gulp-gzip');
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

const GZIP_OPTIONS = {
  deleteMode: "dist",
  skipGrowingFiles: true,
};

const buildFavicons = () => {
  const build = src("./src/favicons/**/*")
    .pipe(dest("./dist"));

  return build;
};

const buildImages = () => {
  const build = src("./src/img/**/*")
    .pipe(imagemin())
    .pipe(dest("./dist/img"));

  return build;
};

const buildVideos = () => {
  const build = src("./src/video/**/*")
    .pipe(dest("./dist/video"));

  return build;
};

const buildDocuments = () => {
  const build = src("./src/*.html")
    .pipe(dest("./dist"))
    .pipe(gzip(GZIP_OPTIONS))
    .pipe(dest("./dist"))

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
    .pipe(concat("style.css"))
    .pipe(postcss(postcssPlugins))
    .pipe(dest("./dist"))
    .pipe(gzip(GZIP_OPTIONS))
    .pipe(dest("./dist"))

  return build;
};

const enableHotReloading = () => {
  watch(
    "./src/favicons/**/*",
    {
      ignoreInitial: false,
    },
    buildFavicons,
  );

  watch(
    "./src/img/**/*",
    {
      ignoreInitial: false,
    },
    buildImages
  );

  watch(
    "./src/video/**/*",
    {
      ignoreInitial: false,
    },
    buildVideos
  );

  watch(
    "./src/styles/**/*",
    {
      ignoreInitial: false,
    },
    buildStyles
  );

  watch(
    "./src/*.html",
    {
      ignoreInitial: false,
    },
    buildDocuments,
  );
};

const buildAssets = series(
  buildFavicons,
  buildImages,
  buildVideos,
  buildStyles,
  buildDocuments,
);

const tasks = {
  start: enableHotReloading,
  build: buildAssets,
  "build-favicons": buildFavicons,
  "build-images": buildImages,
  "build-videos": buildVideos,
  "build-styles": buildStyles,
  "build-documents": buildDocuments,
  default: buildAssets,
};

module.exports = tasks;
