// Include gulp
var gulp = require('gulp')

// Include helper libraries
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var ts = require('gulp-typescript')
var typescript = require('typescript')
var bump = require('gulp-bump')
var del = require('del')

// create ts project
var tsproject = ts.createProject('tsconfig.json')

// sample hello task

gulp.task('hello', function () {
  console.log('hi world!')
})

// build task

gulp.task('build', function () {
  return tsproject.src() // instead of gulp.src(...) 
    .pipe(ts(tsproject))
    .js
    .pipe(gulp.dest('build'))
})

// watch task

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts' , ['hello', 'buildjs'])
})

// gulp delete task

gulp.task('clean' , function () {
  del('build/*')
})

// default gulp task.

gulp.task('default', ['build'])
