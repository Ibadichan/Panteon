const path = require('path');

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
      glob: 'src/pages/*',
      destinationFolder: 'dist',
    },
    scripts: {
      glob: 'src/scripts/**/*',
      destinationFolder: 'dist',
      browserifyOptions: {
        entries: 'src/scripts/index.js',
        debug: true,
      },
      babelifyOptions: {
        ignore: ['node_modules'],
      },
      bundleFileName: 'index.js',
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
        basePath: path.join(__dirname, '../dist'),
      },
      postcssPresetEnvOptions: {
        stage: 0,
      },
      pxToRemOptions: {
        propList: ['*'],
      },
    },
  },
  gzipOptions: {
    deleteMode: 'dist',
    skipGrowingFiles: true,
  },
  cleanOptions: {
    glob: 'dist',
  },
};

module.exports = gulp;
