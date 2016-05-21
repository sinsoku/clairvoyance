import gulp from 'gulp';
import del from 'del';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';


gulp.task('clean', () => del(['lib/', 'test/']));

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', ['clean'], () => {
  return gulp.src('src/lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('build:test', ['build'], () => {
  return gulp.src('src/test/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('test'));
});

gulp.task('pre-test', ['build:test'], () => {
  return gulp.src(['lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src(['test/**/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 } }));
});

gulp.task('default', ['lint', 'test']);
