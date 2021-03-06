import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import del from 'del';
import csso from 'gulp-csso';
import svgstore from 'gulp-svgstore';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import htmlmin from 'gulp-htmlmin';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso({
      restructure: false,
      sourceMap: true,
      debug: true
  }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('source/js/script.js')
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

// Manifest

const manifest = () => {
  return gulp.src('source/manifest.webmanifest')
    .pipe(gulp.dest('build/'))
    .pipe(browser.stream());
}

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/icons/*'])
    .pipe(gulp.dest('build/img'))
}

// WebP

const createWebp = () => {
  return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/favicons/*'])
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () =>
  gulp.src(['source/img/*.svg', '!source/img/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));

const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
  gulp.watch('source/js/script.js', gulp.series(scripts));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    manifest,
    createWebp,
    svg,
    sprite
  ),
);

// Start

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    manifest,
    createWebp,
    svg,
    sprite
  ),
  gulp.series(
    server,
    watcher
  ));
