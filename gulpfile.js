const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const sassPartialsImported = require('gulp-sass-partials-imported');

const reload = browserSync.reload

let scss_dir = './assets/css/scss/';
let includePaths = ['./assets/css/scss/'];

gulp.task('browser-sync', function() {
    browserSync.init({
            notify: false,
            proxy: "localhost:2368"
        })
        // gulp.watch('**/*.hbs', gulp.series('html'))
    gulp.watch('./assets/css/scss/*.scss', gulp.series('css'))
    gulp.watch('./assets/js/*.js', reload)
})

gulp.task('css', function() {
    return gulp.src('./assets/css/scss/*.scss')
        .pipe(plumber([{ errorHandler: false }]))
        .pipe(sassPartialsImported(scss_dir, includePaths))
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream())
        .on('end', reload)
})

gulp.task('html', function() {
    return gulp.src('**/*.hbs')
        .pipe(gulp.dest('./'))
        .on('change', reload)
})

gulp.task('default', gulp.series('browser-sync'))