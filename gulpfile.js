// Include gulp
var gulp = require('gulp')

// Include helper libraries
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var ts = require('gulp-typescript')
var bump = require('gulp-bump')
var del = require('del')

// create ts project
var tsproject = ts.createProject('tsconfig.json')

// sample hello task

gulp.task('hello', function () {
  console.log('hi world!')
})

// build task

gulp.task('buildjs', function () {
  var tsResult = tsproject.src() // instead of gulp.src(...) 
    .pipe(ts(tsproject))

  return tsResult.js.pipe(gulp.dest('build'))
})

// default gulp task.

gulp.task('default', ['buildjs'])
