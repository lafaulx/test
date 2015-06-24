var gulp = require("gulp");
var gutil = require('gulp-util');
var webpack = require("webpack");
var webpackConfig = require('./webpack.config');

gulp.task('webpack', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    var error = err || (stats.compilation.errors[0] && stats.compilation.errors[0].message);

    if(error) {
      throw new gutil.PluginError("webpack", error);
    }

    callback();
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['webpack']);
});

gulp.task('default', ['webpack']);
gulp.task('dev', ['webpack', 'watch']);