const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function browsersync () {
	browserSync.init({
		server: { baseDir: 'dev/'},
		notify: false,
		online: true,
	})
}

function scripts() {
	return src([
		'dev/js/main.js'
	])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('dev/js/'))
	.pipe(browserSync.stream())
}

function styles() {
	return src('dev/scss/main.scss')
	.pipe(sass())
	.pipe(concat('main.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss(( { level: { 1: { specialComments: 0 } }/*, format: 'beautify'*/ } )))
	.pipe(dest('dev/css/'))
	.pipe(browserSync.stream())
}

function images() {
	return src('dev/img/src/**/*')
	.pipe(newer('dev/img/dest/'))
	.pipe(imagemin())
	.pipe(dest('dev/img/dest/'))
}

function cleanimg() {
	return del('dev/img/dest/**/*', { forse: true });
}

function cleanprod() {
	return del('prod/**/*', { forse: true });
}

function buildcopy() {
	return src([
		'dev/css/**/*.min.css',
		'dev/js/**/*.min.js',
		'dev/img/dest/**/*',
		'dev/fonts/**/*',
		'dev/**/*.html',
	], { base: 'dev' })
	.pipe(dest('prod'));
	
}

function startwatch() {
	watch('dev/scss/**/*', styles);
	watch(['dev/**/*.js', '!dev/**/*.min.js'], scripts);
	watch('**/*.html').on('change', browserSync.reload);
	watch('dev/img/src/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleanprod = cleanprod;

exports.build = series(cleanprod, scripts, styles, images, buildcopy);
exports.default = parallel(scripts, styles, browsersync, startwatch);