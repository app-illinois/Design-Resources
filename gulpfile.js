const gulp = require('gulp');
const { series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

function concatJS(){
  return gulp.src('./applications/**/*.js')
    .pipe(concat('app-toolkit.js'))
    .pipe(gulp.dest('./dist'));
}

function copySVG(){
  return gulp.src('./applications/**/*.svg')
    .pipe(gulp.dest('docs/svg/'));
}

function minifyJS(){
  return gulp.src('./dist/app-toolkit.js')
    .pipe(terser())
    .pipe(gulp.dest('docs/js/'));
}


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
  
  
exports.default = series(concatCSS, minifyCSS, concatJS, minifyJS, copySVG);