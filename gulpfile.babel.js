import gulp from 'gulp';
import del from 'del';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import remapIstanbul from 'remap-istanbul/lib/gulpRemapIstanbul';


gulp.task('clean', () => del(['lib/', 'test/', 'maps/', 'coverage/']));

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build', ['clean'], () =>
  gulp.src('src/lib/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('../maps', { includeContent: false, sourceRoot: '../src/lib' }))
    .pipe(gulp.dest('lib'))
);

gulp.task('build:test', ['build'], () =>
  gulp.src('src/test/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('test'))
);

gulp.task('pre-test', ['build:test'], () =>
  gulp.src(['lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
);

gulp.task('test', ['pre-test'], () =>
  gulp.src(['test/**/*.js'])
    .pipe(mocha({ timeout: 10000 }))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 } }))
);


gulp.task('remap-istanbul', ['test'], () =>
  gulp.src('coverage/coverage-final.json')
    .pipe(remapIstanbul({
      basePath: 'maps/',
      reports: {
        json: 'coverage/coverage.json',
        html: 'coverage/lcov-report',
        lcovonly: 'coverage/lcov.info',
      },
    }))
);

gulp.task('default', ['lint', 'test']);
