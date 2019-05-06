import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';

const path = {
  src: 'src/**/*.js',
  dist: 'dist/',
  clean: 'dist/*',
};

const clean = () => del(path.clean);

const production = () => (
  gulp.src(path.src)
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist))
);

const develop = () => (
  gulp.src(path.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist))
);

const watch = (cb) => {
  gulp.watch(path.src, develop);
  cb();
};

const build = gulp.series(clean, production);

exports.build = build;
exports.watch = watch;
exports.clean = clean;
