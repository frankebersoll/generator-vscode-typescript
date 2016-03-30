var gulp = require('gulp');
var tsb = require('gulp-tsb');
var del = require('del');

var sources = [
  'src/**/*.ts',
  'typings/main.d.ts'
];

var output = 'out/';

var onError = error => { console.error('*** Error: ' + error); };

var compilation = tsb.create({
    module: 'commonjs',
    inlineSourceMap: true,
    sourceRoot: __dirname + '/src',
		declaration: false
}, false, false, onError);

gulp.task('clean', () => del([output]));

gulp.task('build', ['clean'], () => {
		return gulp.src(sources)
    .pipe(compilation())
    .pipe(gulp.dest(output));
});

gulp.task('watch', ['build'], () => {
    gulp.watch(sources, ['build']);
});
