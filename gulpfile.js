const gulp = require('gulp');
const { series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');

function concatCSS() {
    return gulp.src('applications/**/*.css')
    .pipe(concatCss("app-toolkit.css"))
    .pipe(gulp.dest('docs/css/'));
  }

  function minifyCSS() {
    return gulp.src('docs/css/app-toolkit.css') 
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('docs/css')); 
  }
  
  
exports.default = series(concatCSS, minifyCSS);