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
      glob: 'src/views/**/*.ejs',
      destinationFolder: 'dist',
    },
    styles: {
      glob: [
        'src/styles/normalize.css',
        'src/styles/global.css',
        'src/styles/ui.blocks/**/*',
        'src/styles/common.blocks/**/*',
        'src/styles/pages.blocks/**/*',
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
  cleanOptions: {
    glob: 'dist',
    read: false,
    force: true,
    allowEmpty: true,
  },
};

module.exports = gulp;
