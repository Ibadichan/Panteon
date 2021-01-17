const gulp = {
  sources: {
    favicons: {
      glob: 'src/favicons/**/*',
      destinationFolder: 'dist',
    },
    images: {
      glob: 'src/img/**/*',
      destinationFolder: 'dist/img',
    },
    videos: {
      glob: 'src/video/**/*',
      destinationFolder: 'dist/video',
    },
    documents: {
      glob: 'src/*.html',
      destinationFolder: 'dist',
    },
    styles: {
      glob: [
        'src/styles/normalize.css',
        'src/styles/global.css',
        'src/styles/**/*',
      ],
      destinationFolder: 'dist',
      bundleFileName: 'style.css',
      resolveAssetsOptions: {
        cachebuster: true,
        loadPaths: [
          'scr/img/',
        ],
      },
      postcssPresetEnvOptions: {
        stage: 0,
      },
    },
  },
  gzipOptions: {
    deleteMode: 'dist',
    skipGrowingFiles: true,
  },
};

module.exports = gulp;
