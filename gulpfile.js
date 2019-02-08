var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var map = require('map-stream');
var browserSync = require('browser-sync');

gulp.task('clean', function() {
    return del('./build/');
});

gulp.task('sass', ['clean'], function() {
    return gulp.src('./src/_/sass/**/*.scss')
        .pipe(plugins.sass({
            outputStyle: 'expanded',
            sourceComments: true
        }).on('error', plugins.sass.logError))
        .pipe(gulp.dest('./build/_/css/'));
});

gulp.task('sass:watch', function() {
    return gulp.src('./src/_/sass/**/*.scss')
        .pipe(plugins.sass({
            outputStyle: 'expanded',
            sourceComments: true
        }).on('error', plugins.sass.logError))
        .pipe(gulp.dest('./build/_/css/'))
        .pipe(browserSync.stream());
});

gulp.task('html:watch', function() {
    return gulp.src('./src/**/*.html', { base: './src/' })
        .pipe(gulp.dest('./build/'));
});

gulp.task('vendor', ['clean'], function() {
    return gulp.src('./src/_/vendor/**/*.js')
        .pipe(gulp.dest('./build/_/js/'));
});

gulp.task('copy:html', ['clean'], function() {
    return gulp.src('./src/**/*.html', { base: './src/' })
        .pipe(gulp.dest('./build/'));
});

gulp.task('copy:fonts', ['clean'], function() {
    return gulp.src('./src/_/fonts/**/*', { base: './src/_/fonts/' })
        .pipe(gulp.dest('./build/_/fonts/'));
});

gulp.task('copy:images', ['clean'], function() {
    return gulp.src('./src/_/images/**/*', { base: './src/_/images/' })
        .pipe(gulp.dest('./build/_/images/'));
});

gulp.task('serve', ['build'], function() {
    browserSync({
        server: {
            baseDir: './build/'
        },
        online: false
    });

    gulp.watch('./src/_/sass/**/*.scss', ['sass:watch']);
    gulp.watch('./src/**/*.html', ['html:watch']);

    gulp.watch(['./build/**/*.html', './build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'vendor', 'copy:html', 'copy:fonts', 'copy:images']);
gulp.task('default', ['build', 'serve']);