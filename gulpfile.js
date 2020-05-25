const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
//const webpack = require('webpack');
const imagemin = require('gulp-imagemin');
const color = require('gulp-color');
//const minify = require('gulp-minify');
//const terser = require('gulp-terser');
//const babel = require('gulp-babel-minify');
//const babel = require('gulp-babel');
//const uglify = require('gulp-uglify');
//const browserify = require('browserify');
const inject = require('gulp-inject');
const del = require('del');

/* dependencies commented out above were used during configuration. Somehow I couldn't 
make neither terser, babel, browserify nor uglify to work so I finally went for webpack and left
them just to keep track of packages I tried*/

// compile scss into css
function styles() {
  return (
    gulp
      .src('./src/styles/**/*.scss')
      .pipe(
        sass({
          outputStyle: 'compressed', // options - extended, nested, compressed, compact
        })
      )
      .on('error', sass.logError)
      // add autoprefixers for some multi-browser problematic styles
      .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions', '>1%'] }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./dist/styles'))
      .pipe(browserSync.stream())
  ); //  stream changes to all browsers
}

function scripts() {
  del.sync(['./dist/scripts/*.js']); // cleans scripts directory from all old [hash].js files
  const target = gulp.src('./dist/index.html');
  const scripts = gulp
    .src('./src/scripts/**/*.js')
    // .pipe(babel()) // the same as higher - previous ideas to bundle code but didn't work for me
    // .pipe(uglify())

    .pipe(webpack()) // bundles all scripts into one
    .pipe(gulp.dest('./dist/scripts'));

  return target // dynamically injects [hash].js script name to index.html
    .pipe(inject(scripts, { relative: true })) // solves the problem with relative paths between files
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src('./dist/images/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}

// exporting all functions outside
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
