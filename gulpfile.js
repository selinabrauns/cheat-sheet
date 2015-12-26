var gulp = require('gulp'),
	gutil = require('gulp-util'),
	react = require('gulp-react'),
	concat = require('gulp-concat')
	watchify = require('watchify'),
	browserify = require('browserify'),
	reactify = require('reactify'),
	notifier = require('node-notifier'),
	source = require('vinyl-source-stream'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch');

/* compile react to js*/
gulp.task('build', function() {
  var bundler = watchify(browserify({
    entries: ['./components/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  function build(file) {
    if (file) gutil.log('Recompiling ' + file);
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(gulp.dest('./output'));
  };
  build();
  bundler.on('update', build);
});



/* compile scss to css */
gulp.task('scss', function(){
	return gulp.src('./style/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./output'))
});

gulp.task('watch', function(){
	return gulp.watch('./style/**/*.scss', ['scss'])
});


gulp.task('default', ['build', 'scss', 'watch'], function(){});