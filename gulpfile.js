var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var templateCache = require('gulp-angular-templatecache');
var merge = require('merge-stream');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

require('jshint-stylish');

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    port: 3000
  })
})

gulp.task('browserify', function() {
  return browserify('./app/js/main.js')
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./dist/js/'));
})

gulp.task('sass', function() {
  return sass('./app/styles/style.scss')
  .pipe(gulp.dest('./dist/css'))
})

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
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*.js', ['browserify'])
  gulp.watch('./app/**/*.scss', ['sass'])
  gulp.watch('app/views/**/*.html', ['views'])
})

gulp.task('default', ['connect', 'browserify', 'views', 'watch'])
