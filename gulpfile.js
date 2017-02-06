var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var util = require('gulp-util');
var concat = require('gulp-concat');
var less = require('gulp-less');
var removeLogs = require('gulp-removelogs');
var del = require('del');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var jshint = require('gulp-jshint');

var paths = {
  srcjs: ['public/src/**/*.js'],
  js: ['public/src/**/*.js', 'tests/**/*.js'],
  less: ['public/src/**/*.less'],
  html: ['public/src/**/*.html', '!public/src/index.html'],
  index: ['public/src/index.html'],
  buildJS: ['dist/js/**/*.js'],
  images: ['public/src/images/**/*']  
};

var noop = function() {};

/* Gulp Tasks */

gulp.task('copyImages', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('./public/dist/images'));
});

gulp.task('deletebuild', function(cb) {
  return del('./public/dist', cb);
});

gulp.task('deletebowercomponents', function(cb) {
  return del('./bower_components', cb);
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('public/dist/views'));
});

gulp.task('copyIndex', function() {
  return gulp.src(paths.index)
    .pipe(gulp.dest('public/dist'));
});

gulp.task('removeLogs', function() {
  return gulp.src(paths.srcjs)
    .pipe(removeLogs())
    .pipe(gulp.dest('src'));
});

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less().on('error', function(err) {
      util.log(err);
      process.exit(1);
      this.emit('end');
    }))
    .pipe(concat('master.css'))
    .pipe(gulp.dest('public/dist/styles'));
});

// watch the file changes...
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.index, ['copyIndex']);
  gulp.watch(paths.less, ['less']);
});

gulp.task('productionJS', function() {
  return gulp.src(paths.srcjs)
    .pipe(jshint())
    .pipe(jscs())
    .pipe(concat('app.js'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});

gulp.task('js', function() {
  return gulp.src(paths.srcjs)
    .pipe(jshint())
    .pipe(jscs())
    .on('error', noop)
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('app.js'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('public/dist/js'));
});

gulp.task('jsLint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jscs())
    .on('error', noop)
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('bower-installer', shell.task([
  'bower-installer'
]));

// Gulp default function for proceed the gulp.
gulp.task('default', function() {
  runSequence('html', 'copyIndex', 'copyImages', 'less', 'js', 'watch');
});

gulp.task('build', function(callback) {
  runSequence('deletebuild', 'bower-installer', 'deletebowercomponents', 'productionJS', 'html',
      'copyIndex', 'less', 'copyImages', endGulpDevelop);

  function endGulpDevelop() {
    callback();
    process.exit(0);
  }
});