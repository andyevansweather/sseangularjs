var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: '',
        livereload: true,
        port: 8800
    });
});

gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);