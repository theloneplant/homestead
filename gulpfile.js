const gulp = require('gulp'),
source     = require('vinyl-source-stream'),
rename     = require('gulp-rename'),
browserify = require('browserify'),
concat     = require('gulp-concat'),
buffer     = require('vinyl-buffer'),
uglify     = require('gulp-uglify'),
sass       = require('gulp-sass'),
minifyCss  = require('gulp-minify-css'),
pug        = require('pug'),
gulpPug    = require('gulp-pug'),
importCss  = require('gulp-import-css'),
cssimport  = require('gulp-cssimport'),
gap        = require('gulp-append-prepend');
gulp.task('default', ['pug', 'js', 'scss']);

var pugOptions = {
	pretty : true,
	doctype: 'html'
};

gulp.task('pug', done => {
	var pugs = 0;
	var files = [
		'./src/views/index.pug',
		'./src/views/templates.pug'
	];
	files.forEach(e => {
		gulp.src(e)
		.pipe(gulpPug(pugOptions))
		.pipe(gulp.dest('./dist'))
		.on('end', pugDone);
	});
	function pugDone() {
		if(++pugs === files.length) done();
	}
});

gulp.task('scss', done => {
	gulp.src('./src/scss/main.scss')
	.pipe(cssimport())
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./dist/css'))
	.pipe(minifyCss({
		keepSpecialComments: 0
	}))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest('./dist/css'))
	.on('end', done);
});

gulp.task('js', () => {
	return browserify({ entries: './src/js/main.js' })
	.transform('babelify', {presets: ['es2015']})
	.bundle()
	.on('error', onError)
	.pipe(source('./src/js/main.js'))
	.pipe(buffer())
	.pipe(gap.appendFile('./node_modules/metismenu/dist/metisMenu.js'))
	.pipe(gap.appendFile('./node_modules/chart.js/dist/Chart.bundle.min.js'))
	// .pipe(uglify({
	// 	mangle: false
	// }))
	.pipe(rename('main.js'))
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', () => {
	gulp.watch(['./src/views/**/*.pug'], ['pug']);
	gulp.watch(['./src/sass/**/*.scss'], ['sass']);
	gulp.watch(['./src/js/**/*.js'],     ['js']);
});

function onError(err) {
	console.log(err);
	this.emit('end');
}
