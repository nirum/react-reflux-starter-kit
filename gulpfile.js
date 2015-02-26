/**
 * Created by nirum on 2/25/15.
 */

// Load gulp and other modules
var gulp = require('gulp');
var del = require('del');
var stylus = require('gulp-stylus');
var babel = require("gulp-babel");
var concat = require("gulp-concat");

/**
 * Filepaths
 */
var bases = {
    app: 'app/',
    dist: 'build/'
};

var paths = {
    scripts: ['js/**/*.js'],
    styles: ['css/**/*.styl'],
    html: ['index.html']
};

/**
 * Stylus => CSS
 */
gulp.task('styles', function () {
    gulp.src(paths.styles, {cwd: bases.app})
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest(bases.dist + 'css/'));
});

/**
 * JSX => JS
 */
gulp.task('scripts', function () {
    gulp.src(paths.scripts, {cwd: bases.app})
        .pipe(concat("bundle.js"))
        .pipe(babel())
        .pipe(gulp.dest(bases.dist + 'js/'));
});

/**
 * HTML
 */
gulp.task('html', function () {
    gulp.src(paths.html, {cwd: bases.app})
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