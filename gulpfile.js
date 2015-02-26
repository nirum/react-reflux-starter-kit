/**
 * Created by nirum on 2/25/15.
 */

// Load gulp and other modules
var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var babelify = require("babelify");

/**
 * Filepaths
 */
var bases = {
    app: 'app/',
    dist: 'build/'
};

var paths = {
    app: ['./' + bases.app + 'js/main.jsx'],
    styles: [bases.app + 'css/**/*.styl'],
    html: [bases.app + 'index.html']
};

/**
 * Stylus => CSS
 */
gulp.task('styles', function () {
    gulp.src(paths.styles)
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest(bases.dist + 'css/'));
});

/**
 * JSX => Browserify => JS
 */
gulp.task('scripts', function () {
    browserify(paths.app)
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(bases.dist + 'js/'));
});

/**
 * HTML
 */
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(gulp.dest(bases.dist));
});

/**
 * Clean build directory
 */
gulp.task('clean', function (callback) {
    del([bases.dist], callback);
});

/**
 * Default task
 */
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'html');
});

/**
 * Watch for file changes
 */
gulp.task('watch', function() {

    // Watch .styl files
    gulp.watch(bases.app + paths.styles, ['styles']);

    // Watch .js files
    gulp.watch(bases.app + paths.scripts, ['scripts']);

    // Watch html files
    gulp.watch(bases.app + paths.html, ['html']);

});