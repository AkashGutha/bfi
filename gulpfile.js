// Include gulp
var gulp = require('gulp');

// Include helper libraries
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var bump = require('gulp-bump');
var del = require('del');
var merge = require('merge2');
var concat = require('gulp-concat');
var util = require('gulp-util');
var browserify = require('browserify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var tsify = require('tsify');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var source = require('vinyl-source-stream');

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
var outMinFile = projectname + '-' + projectver + '.min.js';

// build task

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts(tsproject));
    return merge([
        tsResult.dts.pipe(gulp.dest('build/definitions')),
        tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'))
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
    gulp.src(['build/js/**/*.js', '!lib/*'])
        .pipe(sourcemaps.init())
        .pipe(concat(outFile))
        .on('error', util.log())
        .pipe(gulp.dest('lib/'));
});

gulp.task('concat-force', function() {
    gulp.src(['build/**/*.js', '!lib/*'])
        .pipe(sourcemaps.init())
        .pipe(concat(projectname + '-' + projectver + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest('lib/'));
});

// browserify task

gulp.task('browserify-sync', ['scripts'], function() {
    browserify({
            entries: './src/main.ts'
        })
        .plugin(tsify, { target: 'es5' })
        .bundle()
        .pipe(plumber())
        .pipe(source('outFile.js'))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename(outFile))
        .pipe(gulp.dest('lib/'));
});

//minify task

gulp.task('minify-sync', ['browserify-sync'], function() {
    gulp.src(['lib/*.js', '!lib/*.min.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename(outMinFile))
        .pipe(gulp.dest('lib/'));
});

gulp.task('minify', function() {
    gulp.src(['lib/*.js', '!lib/*.min.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename(outMinFile))
        .pipe(gulp.dest('lib/'));
});

// watch task

gulp.task('watch-heavy', function() {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('watch-light', function() {
    gulp.watch('src/**/*.ts', ['scripts-onlycompile']);
});

// gulp delete task

gulp.task('clean-sync', ['minify-sync'], function() {
    del('build/*');
});

gulp.task('clean', function() {
    del('build/*');
});

// default gulp task.

gulp.task('default', ['scripts', 'browserify-sync', 'minify-sync']);

// gulp tasks

gulp.task('onlycompile', ['scripts-onlycompile']);
