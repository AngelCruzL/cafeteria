const autoprefixer = require('autoprefixer');
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');

function compileCSS(done) {
  src('./src/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('dist/css'));

  done();
}

function dev() {
  watch('./src/scss/**/*.scss', compileCSS);
}

exports.dev = dev;
exports.default = series(compileCSS, dev);
