let gulp = require('gulp'),
    pug = require('gulp-pug'),
    less = require("gulp-less"),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    cleanCSS  = require('gulp-clean-css');

gulp.task('pug',function(){
    return gulp.src('../pug_files/*.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('../public/html_files'))
});

gulp.task('less', function () {
    gulp.src('../public/styles/less/*.less')
    .pipe(less({
        pretty:true
    }))
    .pipe(cleanCSS())   
    .pipe(gulp.dest('../public/styles/css'));
});

gulp.task('babel', function(){
    return gulp.src('../public/js_files/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('code.min.js'))
        .pipe(gulp.dest('../public/old_version_js_files'))
});

gulp.task('watch',function(){
    gulp.watch('../pug_files/*.pug', gulp.parallel('pug'));
    gulp.watch('../public/styles/less/*.less', gulp.parallel('less'));
    gulp.watch('../public/js_files/*.js', gulp.parallel('babel'));
});

gulp.task('default', gulp.parallel('watch','less'));