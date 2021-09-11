const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function compileCSS(done) {
  src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));

  done();
}

function images() {
  return src('./src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest('dist/img'));
}

function webpImages() {
  return src('./src/img/**/*.{jpg,png}')
    .pipe(webp({ quality: 50 }))
    .pipe(dest('dist/img'));
}

function avifImages() {
  return src('./src/img/**/*.{jpg,png}')
    .pipe(avif({ quality: 50 }))
    .pipe(dest('dist/img'));
}

function dev() {
  watch('./src/scss/**/*.scss', compileCSS);
  watch('./src/img/**/*', images);
}

exports.compileCSS = compileCSS;
exports.images = images;
exports.webpImages = webpImages;
exports.avifImages = avifImages;
exports.dev = dev;
exports.default = series(images, webpImages, avifImages, compileCSS);
