// Include gulp
var gulp = require('gulp');

// Include helper libraries
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var bump = require('gulp-bump');
var del = require('del');
var merge = require('merge2');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var browserify = require('gulp-browserify');
var header = require('gulp-header');
var rename = require('gulp-rename');

// create ts project
var tsproject = ts.createProject('tsconfig.json');
var pkg = require('./package.json');
var prefixes = require('./prefix.json');

var projectname = pkg.name;
var projectver = pkg.version;

// using data from pkg.json 
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

var outFile = projectname + '-' + projectver + '.js';

// build task

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(plumber())
        .pipe(ts(tsproject));
    return merge([
        tsResult.dts.pipe(gulp.dest('build/definitions')),
        tsResult.js.pipe(gulp.dest('build/js'))
    ]);
});

gulp.task('scripts-onlycompile', function() {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts(tsproject), { "noEmit": true });
});

// concat and uglify

gulp.task('concat', ['scripts'], function() {
    gulp.src(['build/js/**/*.js', '!build/libraries/*'])
        .pipe(sourcemaps.init())
        .pipe(concat(projectname + '-' + projectver + '.js'))
        .on('error', util.log())
        .pipe(gulp.dest('build/libraries'));
});

gulp.task('concat-force', function() {
    gulp.src(['build/**/*.js', '!build/libraries/*'])
        .pipe(sourcemaps.init())
        .pipe(concat(projectname + '-' + projectver + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/libraries'));
});

// browserify task

gulp.task('browserify', ['scripts'], function() {
    gulp.src('build/js/main.js')
        .pipe(plumber())
        .pipe(browserify())
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename(outFile))
        .pipe(gulp.dest('build/libraries'));
});

// watch task

gulp.task('watch-heavy', function() {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('watch-light', function() {
    gulp.watch('src/**/*.ts', ['scripts-onlycompile']);
});

// gulp delete task

gulp.task('clean', ['browserify'], function() {
    del(['!build/libraries/*', 'build/*']);
});

gulp.task('clean-force', function() {
    del(['!build/libraries/*', ['build/*']]);
});

// default gulp task.

gulp.task('default', ['scripts', 'browserify', 'clean']);

// gulp tasks

gulp.task('onlycompile', ['scripts-onlycompile']);
