const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');

function compileCSS(done) {
  src('./src/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('dist/css'));

  done();
}

function images() {
  return src('./src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest('dist/img'));
}

function dev() {
  watch('./src/scss/**/*.scss', compileCSS);
  watch('./src/img/**/*', images);
}

exports.compileCSS = compileCSS;
exports.images = images;
exports.dev = dev;
exports.default = series(images, compileCSS, dev);
