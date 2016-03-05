'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = ['*.js', 'lib/*.js', 'test/*.js'];

// GULP TASK LINTER
gulp.task('lint', function(){
  return gulp.src(paths)
    .pipe(lint())
    .pipe(lint.format());
});

// GULP TASK TEST
gulp.task('test', function(){
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

// GULP TASK WATCH FOR CHANGES
gulp.task('watch', function(){
  gulp.watch(paths, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch']);
