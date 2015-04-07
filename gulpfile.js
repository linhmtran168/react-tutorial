var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack');
var path = require('path');

// General config
var defaultConfig = {
  entry: './public/scripts/example.js',
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] }
    ]
  }
};

if (process.env.NODE_ENV !== 'production') {
  defaultConfig.devtool = '#eval-source-map';
  defaultConfig.debug = true;
}

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }

    if (done) {
      done();
    }
  };
}

gulp.task('frontend-build', function(done) {
  webpack(defaultConfig).run(onBuild(done));
});

gulp.task('frontend-watch', function() {
  webpack(defaultConfig).watch(100, onBuild());
});

gulp.task('backend-build', function() {
  return gulp.src('src/**/*js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('watch', ['frontend-watch']);

gulp.task('run', ['frontend-watch']);
