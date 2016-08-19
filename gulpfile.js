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
var util = require('gulp-util')

// create ts project
var tsproject = ts.createProject('tsconfig.json')
var package = require('./package.json')

var projectname = package.name;
var projectver = package.version;

// build task

gulp.task('scripts', function(cb) {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(plumber())
        .pipe(ts(tsproject))
    return merge([
        tsResult.dts.pipe(gulp.dest('build/definitions')),
        tsResult.js.pipe(gulp.dest('build/js'))
    ])
})

gulp.task('scripts-onlycompile', function(cb) {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(plumber())
        .pipe(ts(tsproject), { "noEmit": true })
})

// concat and uglify

gulp.task('concat', ['scripts'], function(cb) {
    gulp.src(['build/js/**/*.js', '!build/libraries/*'])
        .pipe(concat(projectname + '-' + projectver + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/libraries'))
})

gulp.task('concat-force', function(cb) {
    gulp.src(['build/**/*.js', '!build/libraries/*'])
        .pipe(concat(projectname + '-' + projectver + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/libraries'))
})

// watch task

gulp.task('watch-heavy', function() {
    gulp.watch('src/**/*.ts', ['scripts'])
})

gulp.task('watch-light', function() {
    gulp.watch('src/**/*.ts', ['scripts-onlycompile'])
})

// gulp delete task

gulp.task('clean', ['concat'], function() {
    del(['!build/libraries/*', ['build/*']])
})

gulp.task('clean-force', function(cb) {
    del(['!build/libraries/*', ['build/*']])
})

// default gulp task.

gulp.task('default', ['scripts', 'concat', 'clean'])

// gulp tasks

gulp.task('onlycompile', ['scripts-onlycompile'])
gulp.task('default', ['scripts', 'concat', 'clean'])
gulp.task('default', ['scripts', 'concat', 'clean'])
