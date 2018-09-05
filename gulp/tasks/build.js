const gulp 	= require('gulp'),
imagemin 	= require('gulp-imagemin'),
del 		= require('del'),
usemin 		= require('gulp-usemin'),
rev			= require('gulp-rev'),
cssnano		= require('gulp-cssnano'),
uglify		= require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', () => {
	browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], () => {
	return del("./docs");
});


gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
	let pathtoCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	];

	return gulp.src(pathtoCopy)
		.pipe(gulp.dest("./docs"));
});

/* video 58 */


gulp.task('optimizeImages', ['deleteDistFolder'], () => {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			// optimize jpeg images
			progressive: true,
			// for gif images
			interlaced: true,
			// for svg file
			multipass: true
		}))
		.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start("usemin");
});

gulp.task('usemin', ['styles', 'scripts'], () => {
	return gulp.src("./app/index.html")
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest("./docs"));
});



gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);