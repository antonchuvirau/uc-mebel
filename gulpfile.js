'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del');

sass.compiler = require('node-sass');

gulp.task('styles', function(){
    return gulp.src('app/scss/main.scss')
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('public/css/'))
});

gulp.task('scripts', function(){
    return gulp.src(['app/js/plugins.js', 'app/js/main.js'])
    // .pipe(babel())
    // .on('error', function(e) {
    //     console.log('>>> ERROR', e);
    //     this.emit('end');
    // })
    .pipe(concat('application.js'))
    .pipe(gulp.dest('public/js/'))
});

gulp.task('clean', function(){
    return del('public');
});

gulp.task('assets', function(){
    return gulp.src('app/assets/**', {since: gulp.lastRun('assets')})
        .pipe(gulp.dest('public'))
});

// gulp.task('images', function(){
//     return gulp.src('app/assets/img/**')
//         .pipe(imagemin())
//         .pipe(gulp.dest('public/img'))
// });

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'scripts', 'assets')));

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.*', gulp.series('styles'));
    gulp.watch('app/js/**/*.*', gulp.series('scripts'));
    gulp.watch('app/assets/**/*.*', gulp.series('assets'));
    // gulp.watch('app/assets/img/**', gulp.series('images'));
});

gulp.task('serve', function(){
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));