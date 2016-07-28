var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-ruby-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var templateCache = require('gulp-angular-templatecache');
var merge = require('merge-stream');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'dist',
      port: 3000
    }
  });
});

gulp.task('browserify', function() {
  return browserify({
    entries: ['./app/js/main.js'],
    debug: !global.isProd
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulpif(global.isProd, buffer()))
  .pipe(gulpif(global.isProd, uglify()))
  .pipe(gulp.dest('./dist/js/'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return sass('./app/styles/style.scss')
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('views', function() {
  var indexFile = gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist'));

  var views = gulp.src('./app/views/**/*.html')
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest('app/js'));

  return merge(indexFile, views);
});

gulp.task('lint', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {beep: true}))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*.js', ['lint', 'browserify']);
  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch('app/views/**/*.html', ['views']);
});

gulp.task('clean', function() {
  return del('./dist');
});

gulp.task('default', ['dev']);

gulp.task('dev', function() {
  global.isProd = false;
  runSequence('clean', 'lint', ['browserify', 'views', 'sass'], 'watch', 'serve');
});

gulp.task('prod', function() {
  global.isProd = true;
  runSequence('clean', 'lint', ['browserify', 'views', 'sass'], 'watch', 'serve');
});
