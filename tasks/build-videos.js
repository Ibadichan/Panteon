const gulp = require("gulp");
const config = require('../config');

const {
  src,
  dest,
} = gulp;

const {
  sources: {
    videos,
  },
} = config.gulp;

const buildVideos = () => {
  const build = src(videos.glob)
    .pipe(dest(videos.destinationFolder));

  return build;
};

module.exports = buildVideos;
