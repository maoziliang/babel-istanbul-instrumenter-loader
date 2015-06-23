# Babel istanbul instrumenter loader for webpack
Fork from [deepsweet/istanbul-instrumenter-loader](https://github.com/deepsweet/istanbul-instrumenter-loader)

## Install

```
$ npm install babel-istanbul-instrumenter-loader
```

## Usage

Useful to work together with `webpack` and `gulp-istanbul`.

1. webpack.spec.config.js

``` javascript
{ 
    test: /\.jsx?$/, 
    exclude: /(node_modules|build|test)/, 
    loader: 'babel-istanbul-instrumenter'
}
```

2. gulpfile.js

``` javascript
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    connect = require('gulp-connect'),
    runSeq = require('run-sequence'),
    webpack = require('webpack'),
    webpackSpecConfig = require('./webpack.spec.config');

// build specification bundle file
gulp.task('build:spec', function (done) {
  webpack(webpackSpecConfig, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack-spec", err);
    //gutil.log("[webpack-spec]", stats.toString());
    done();
  });
});

gulp.task('coverage:server', function() { 
  var host = '0.0.0.0',
    port = 4004;

  gutil.log('Open your browser and visit http://' + host + ':' + port + 'to view the coverage report. ctrl+c to quit.');
  connect.server({
    root: './coverage/lcov-report',
    port: port,
    host: host
  });
});

// run test
gulp.task('test', ['build:spec'], function (done) {
  gulp.src('test/start.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      coverageVariable: '__coverage__',
      dir: './coverage',
      reporters: ['lcov', 'json', 'text', 'text-summary']
    }))
    .on('end', function () {
      runSeq('coverage:server', done);
    });
});

```

```
$ gulp test
```
