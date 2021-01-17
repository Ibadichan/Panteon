const gulp = require("gulp");
const config = require('../config');

const {
  src,
  dest,
} = gulp;

const {
  sources: {
    favicons,
  },
} = config.gulp;

const buildFavicons = () => {
  const build = src(favicons.glob)
    .pipe(dest(favicons.destinationFolder));

  return build;
};

module.exports = buildFavicons;
