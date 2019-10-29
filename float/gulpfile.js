var gulp 		= require('gulp'),
	scss 		= require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat      = require('gulp-concat'),
	cssNano     = require('gulp-cssnano'),
	rename      = require('gulp-rename'),
	del      	= require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	uglify      = require('gulp-uglifyjs'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function(){
	return gulp.src('app/scss/*.scss')
	.pipe(scss())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
})

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.js',
		'app/libs/slick-1.8.1/slick.js',
		'app/libs/ScrollMagic.js',
		'app/libs/debug.addIndicators.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
})

gulp.task('css-libs', gulp.parallel('scss'), function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssNano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
})

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
})

gulp.task('clean', async function(){ // запустить перед build
	return del.sync('dist');
})

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});


gulp.task('watch', function(){
	gulp.watch('app/scss/*.scss', gulp.parallel('scss'));
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
})


gulp.task('default', gulp.parallel('browser-sync', 'scripts', 'css-libs',  'watch'));

gulp.task('prebuild', async function(){

	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

});

gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'scss', 'scripts'));