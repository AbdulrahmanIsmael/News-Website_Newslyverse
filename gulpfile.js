const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

gulp.task('html', () => {
  return gulp.src('src/pug/*.pug').pipe(pug()).pipe(gulp.dest('./dist'));
});

gulp.task('css', () => {
  return gulp
    .src('src/sass/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', () => {
  return gulp.src('src/js/*.js').pipe(gulp.dest('dist/js'));
});

gulp.task('import', () => {
  return gulp.src('src/js/import/*.js').pipe(gulp.dest('dist/js/import'));
});

gulp.task('assets', () => {
  return gulp.src('./src/assets/**/*.*').pipe(gulp.dest('./dist/assets'));
});

gulp.task('default', gulp.parallel('html', 'css', 'js', 'import', 'assets'));

gulp.task('watch', () => {
  gulp.watch(
    './src/**/*.*',
    gulp.series('html', 'css', 'js', 'import', 'assets')
  );
});
