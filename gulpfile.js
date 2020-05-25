const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const color = require('gulp-color');
const inject = require('gulp-inject');
const del = require('del');

function styles() {
  return gulp
    .src('./src/styles/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .on('error', sass.logError)
    .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions', '>1%'] }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/styles'))
    .pipe(browserSync.stream());
}

function scripts() {
  del.sync(['./dist/scripts/*.js']);
  const target = gulp.src('./dist/index.html');
  const scripts = gulp
    .src('./src/scripts/**/*.js')
    .pipe(webpack())
    .pipe(gulp.dest('./dist/scripts'));

  return target
    .pipe(inject(scripts, { relative: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src('./dist/images/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = gulp.series(styles, scripts, images);

exports.default = function () {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch('./src/styles/**/*.scss').on('change', styles);
  gulp
    .watch('./src/scripts/*.js')
    .on('change', gulp.series(scripts, browserSync.reload));
  gulp.watch('./dist/images').on('change', images);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);

  console.log(color('Happy coding mate! :)', 'CYAN'));
};
