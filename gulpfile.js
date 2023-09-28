const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

gulp.task('html', () => {
  return gulp
    .src(['project/*/*.pug', '!project/include'])
    .pipe(pug())
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', () => {
  return gulp
    .src(['project/*/*.scss', '!project/include'])
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', () => {
  return gulp
    .src('project/*/*.js')
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('data', () => {
  return gulp.src('./project/data/data.json').pipe(gulp.dest('./dist/data'));
});

gulp.task('assets', () => {
  return gulp.src('./project/assets/*/*.*').pipe(gulp.dest('./dist/assets'));
});

gulp.task('default', () => {
  gulp.watch(
    './project/**/*.*',
    gulp.series('html', 'css', 'js', 'assets', 'data')
  );
});
