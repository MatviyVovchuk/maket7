const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Compile SCSS to CSS
gulp.task('styles', () => {
  const processors = [autoprefixer()];

  return gulp
    .src('src/sass/styles.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Concatenate and minify JS
gulp.task('scripts', () => {
  return gulp
    .src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Copy images to dist folder
gulp.task('images', () => {
  return gulp
    .src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});

// Copy HTML files to dist folder
gulp.task('html', () => {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Watch for changes and reload browser
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch('src/sass/**/*.sass', gulp.series('styles'));
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/images/**/*', gulp.series('images'));
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch(['*.html', 'dist/css/*.css', 'dist/js/*.js']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.series('styles', 'scripts', 'images', 'html', 'watch'));
