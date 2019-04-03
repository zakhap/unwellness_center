var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
sass.compiler = require('node-sass');
var copy = require('gulp-copy');


const { watch, series } = require('gulp');

gulp.task('sass', function() {
  return gulp.src('./sass/*.scss')
    .pipe(sass({
      errorLogToConsole: true,
    }))
    .on( 'error', console.error.bind( console ))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});


gulp.task('serve', function() {
    browserSync.init({
    	server: "./",
      browser: "Google Chrome"
    });
});

gulp.task('copy', function(){
    const sourceFiles = [
        'assets/*',
        'js/*',
        'css/*',
        'index.html'
    ]
    const destination = 'dist/'

    return gulp.src(sourceFiles)
        .pipe(copy(destination,  { prefix: 0 }))
});

gulp.task('deploy', gulp.series('sass', 'copy'));

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
    browser: "Google Chrome"
  })
});


gulp.task('watch', function(){
  gulp.watch('./sass/*.scss', gulp.series('sass'));
  gulp.watch("./index.html").on('change', browserSync.reload);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
});


gulp.task('default', gulp.parallel('sass', 'browserSync', 'watch'));
