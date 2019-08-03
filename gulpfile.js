var browserify = require("browserify");
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var fancy_log = require("fancy-log");
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var watchify = require("watchify");
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
 
var paths = {
  html: ['src/html/*.html'],
  script_main: ['src/ts/main.ts'],
  scss: ['src/scss/**'],
	build_dir: "dist",
	js_min_output: 'kodsport.min.js',
  assets: ['src/img/**', 'node_modules/monaco-editor/min/**/*'],
	static_dir: "dist/static"
};

 
gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build_dir))
    .pipe(browserSync.stream());
});
 
gulp.task('watch-sass', function () {
  gulp.watch(paths.scss, gulp.series('sass'));
});



var watchedBrowserify = 
  watchify(browserify({
    basedir: '.',
    debug: true,
    entries: paths.script_main,
    cache: {},
    packageCache: {}
  }).plugin(tsify));

function bundleJs() {
  return watchedBrowserify
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(source(paths.js_min_output))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build_dir));
}

gulp.task("bundle-js", bundleJs);

gulp.task("copy-html", function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.build_dir));
});

gulp.task("watch-html", function() {
  gulp.watch(paths.html, gulp.series("copy-html")).on('change', browserSync.reload);
});

gulp.task("copy-assets", function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.static_dir));
});
gulp.task("watch-assets", function() {
  gulp.watch(paths.assets, gulp.series("copy-assets")).on('change', browserSync.reload);
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: paths.build_dir
        }
    });
});

gulp.task("default", gulp.parallel("copy-html", "watch-html", "bundle-js", "sass", "watch-sass", "browser-sync", "copy-assets", "watch-assets"));

watchedBrowserify.on("update", gulp.series(bundleJs, browserSync.reload));
watchedBrowserify.on("log", fancy_log);
