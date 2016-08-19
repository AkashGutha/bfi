// Include gulp
var gulp = require('gulp')

// Include helper libraries
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var ts = require('gulp-typescript')
var typescript = require('typescript')
var bump = require('gulp-bump')
var del = require('del')
var merge = require('merge2')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')

// create ts project
var tsproject = ts.createProject('tsconfig.json')
var package = require('./package.json')

// sample hello task

gulp.task('hello', function()
{
    console.log('hi world!')
})

// build task

gulp.task('scripts', function(cb)
{
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts(tsproject))
    return merge([
        tsResult.dts.pipe(gulp.dest('build/definitions')),
        tsResult.js.pipe(gulp.dest('build/js'))
    ])
})

// concat and uglify

gulp.task('concat', ['scripts'], function(cb)
{
    gulp.src(['build/**/*.js', '!build/libraries/*'])
        .pipe(plumber())
        .pipe(concat('bfi.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/libraries'))
})

// watch task

gulp.task('watch', function()
{
    gulp.watch('src/**/*.ts', ['hello', 'buildjs'])
})

// gulp delete task

gulp.task('clean', ['scripts', 'concat'], function(cb)
{
    del(['build/*', '!build/libraries/*'])
})

gulp.task('clean-force', function(cb)
{
    del(['build/*'])
})

// default gulp task.

gulp.task('default', ['scripts', 'concat', 'clean'])
