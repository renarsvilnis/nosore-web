'use strict';

let gulp = require('gulp');
let wiredep = require('wiredep').stream;
let del = require('del');
let mqpacker = require('css-mqpacker');
let autoprefixer = require('autoprefixer');
let watchify = require('watchify');
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let modernizr = require('modernizr');
let runSequence = require('run-sequence');

// autoload node modules that prefixed with 'gulp-'
let $ = require('gulp-load-plugins')({
  scope: ['devDependencies'],
  camelize: true,
  lazy: false
});

// ########################################
// Variables
// ########################################

// current enviroment
let env = process.env.NODE_ENV || 'development';

const IN_BASE = 'private/';
const OUT_BASE = 'public/';

const IN = {
  CSS: IN_BASE + 'scss/',
  JS: IN_BASE + 'js/',
  IMG: IN_BASE + 'img/',
  FONTS: IN_BASE + 'fonts/',
  AUDIO: IN_BASE + 'audio/',
  HTML: IN_BASE + 'html/'
};

const OUT = {
  CSS: OUT_BASE + 'stylesheets/',
  JS: OUT_BASE + 'javascripts/',
  IMG: OUT_BASE + 'images/',
  FONTS: OUT_BASE + 'fonts/',
  AUDIO: OUT_BASE + 'audio/',
  HTML: OUT_BASE
};

const GLOBY = {
  CSS: '**/*.scss',
  JS: '**/*.{js,jsx}',
  IMG: '**/*.{svg,png,jpeg,jpg,ico,gif}',
  FONTS: '**/*.{eot,svg,ttf,woff,woff2}',
  AUDIO: '**/*.{mp3,ogg,wav}',
  HTML: '**/*.html'
};

// ########################################
// Helpers
// ########################################
const isProduction = env === 'production';
// const isDevelopment = () => env === 'development';

// ####################
// CSS
// ####################
gulp.task('styles', function () {
  const optsWiredep = {
    ignorePath: /^(\.\.\/)+/,
    dependencies: false, // dependencies are used for backend
    devDependencies: true,
    overrides: {
      'modularized-normalize-scss': {
        main: '_normalize.scss'
      }
    }
  };

  const optsSass = {
    precision: 8
  };

  const optsAutoprefixer = {
    browsers: ['> 5%'],
    cascade: true,
    remove: true
  };

  // const optsMinifyCss = {
  //   keepSpecialComments: 0,
  //   processImport: true
  // };

  return gulp.src(IN.CSS + GLOBY.CSS)
    .pipe($.plumber())
    .pipe(wiredep(optsWiredep))
    .pipe($.sourcemaps.init())
    .pipe($.sass(optsSass).on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer(optsAutoprefixer),
      mqpacker()
    ]))
    // .pipe($.minifyCss(optsMinifyCss))
    .pipe($.csso())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(OUT.CSS))
    .pipe($.livereload());
});

// ####################
// HTML
// ####################
gulp.task('html', function () {
  const optsMinifyHtml = {
    conditionals: true,
    spare: true
  };

  return gulp.src(IN.HTML + GLOBY.HTML)
    .pipe($.cached('html'))
    .pipe($.if(isProduction, $.minifyHtml(optsMinifyHtml)))
    .pipe(gulp.dest(OUT.HTML))
    .pipe($.livereload());
});

// ####################
// IMAGES
// ####################
gulp.task('images', function () {
  const optsImagemin = {
    optimizationLevel: 3,
    progressive: true,
    interlaced: true,
    svgoPlugins: [
      {cleanupIDs: false}
    ]
  };

  return gulp.src(IN.IMG + GLOBY.IMG)
    .pipe($.cached('images'))
    .pipe($.imagemin(optsImagemin))
    .pipe(gulp.dest(OUT.IMG))
    .pipe($.livereload());
});

// ####################
// FONTS
// ####################
gulp.task('fonts', function () {
  return gulp.src(IN.FONTS + GLOBY.FONTS)
    .pipe(gulp.dest(OUT.FONTS))
    .pipe($.livereload());
});

// ####################
// AUDIO
// ####################
gulp.task('audio', function () {
  return gulp.src(IN.AUDIO + GLOBY.AUDIO)
    .pipe($.cached('audio'))
    .pipe(gulp.dest(OUT.AUDIO))
    .pipe($.livereload());
});

// ####################
// Javacript
// ####################

const jsBuild = function (filename) {
  const optsSourcemaps = {
    // Load existing source maps
    loadMaps: true
  };

  const optsBrowserify = {
    cache: {},
    packageCache: {},
    entries: IN.JS + filename,
    fullPaths: true,
    debug: true
  };

  const optsBabelify = {
    // presets: [
    //   'es2015',
    //   'react'
    // ]
  };

  // Note: adding transform here so that incremental builds don't get slower
  // Related: https://github.com/substack/watchify/issues/187
  let bundler = browserify(optsBrowserify).transform(babelify, optsBabelify);

  // wrap the browserify around watchify while in development
  if (!isProduction) {
    bundler = watchify(bundler);
  }

  const rebundle = function () {
    return bundler
      .bundle()
      .on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
      })
      .pipe(source(filename))
      .pipe(buffer())
      .pipe($.sourcemaps.init(optsSourcemaps))
      .pipe($.if(isProduction, $.uglify()))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(OUT.JS))
      .pipe($.livereload())
      .pipe($.debug({
        title: 'Browserify task'
      }));
  };

  bundler.on('update', rebundle);
  bundler.on('log', $.util.log);
  return rebundle();
};

gulp.task('js', function (callback) {
  runSequence(
    'js-lint',
    // 'js-browserify',
    'js-modernizr',
    callback
  );
});

gulp.task('js-browserify', function (callback) {
  runSequence(['js-browserify:site'], callback);
});

gulp.task('js-browserify:site', function (callback) {
  return jsBuild('site.js');
});

gulp.task('js-lint', function () {
  const optsEslint = {
    useEslintrc: true
  };

  return gulp.src(IN.JS + GLOBY.JS)
    .pipe($.cached('linting'))
    .pipe($.eslint(optsEslint))
    .pipe($.eslint.format())
    // stop build if eslint contains errors
    .pipe($.if(isProduction, $.eslint.failAfterError()));
});

gulp.task('js-modernizr', function (callback) {
  const optsModernizr = {
    'feature-detects': [
      // 'css/transitions',
      // 'css/transforms',
      // 'svg',
      // 'svg/asimg'
    ]
  };

  modernizr.build(optsModernizr, function (result) {
    $.file('modernizr.js', result, {src: true})
      .pipe($.if(isProduction, $.uglify()))
      .pipe(gulp.dest(OUT.JS));
    callback();
  });
});

// ####################
// Main TASKS
// ####################

gulp.task('clean', function () {
  return del(OUT_BASE);
});

gulp.task('default', function (callback) {
  runSequence(
    'clean',
    ['fonts', 'html', 'audio', 'images'],
    ['styles', 'js'],
    'watch',
    callback
  );
});

gulp.task('watch', function () {
  // The logic behind if JavaScript build should be wrapped in Watchify
  // is encapsulated withing the function
  jsBuild('site.js');

  if (isProduction) {
    return;
  }

  // Start livereload server
  // Add the script file to include livereload in the dev.warp enviroment
  // <script src="//dev.warp.lv:35735/livereload.js"></script>
  $.livereload.listen({
    port: 35735
  });

  gulp.watch(IN.FONTS + GLOBY.FONTS, ['fonts']);
  gulp.watch(IN.AUDIO + GLOBY.AUDIO, ['audio']);
  gulp.watch(IN.HTML + GLOBY.HTML, ['html']);
  gulp.watch(IN.IMG + GLOBY.IMG, ['images']);
  gulp.watch(IN.JS + GLOBY.JS, ['js']);
  gulp.watch(IN.CSS + GLOBY.CSS, ['styles']);
});
