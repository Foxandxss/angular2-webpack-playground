// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      'jasmine'
    ],

    files: [
      // Grab all files in the app folder that contain .test.
      'test/test.bundle.js'
    ],

    preprocessors: {
      'test/test.bundle.js': ['webpack']
    },

    browsers: [
      'Chrome'
    ],

    singleRun: false,

    webpack: require('./webpack.config'),

    webpackMiddleware: {
      noInfo: true
    }
  });
};