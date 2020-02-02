let gulp = require('gulp'),
    pug = require('gulp-pug');


gulp.task('pug',function(){
    return gulp.src('../pug_files/*.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('../html_files'))
});

gulp.task('watch',function(){
    gulp.watch('../pug_files/*.pug', gulp.parallel('pug'));
});

gulp.task('default', gulp.parallel('watch'));