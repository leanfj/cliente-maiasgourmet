const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp
    .src('./sass/**/*.sass')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.sass', ['sass']);
});

//Concatenar Javascript
const bootstrapJs = './node_modules/bootstrap/dist/js/bootstrap.bundle.js';
const jquery = './node_modules/jquery/dist/jquery.js';

const mainJS = './js/main.js';

gulp.task('concatjs', function() {
  return gulp
    .src([jquery, bootstrapJs, mainJS])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('concatjs:watch', function() {
  gulp.watch('./js/*.js', ['concatjs']);
});

gulp.task('uglify', function() {
  gulp
    .src('./js/scripts.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('default', ['sass:watch', 'concatjs:watch']);
