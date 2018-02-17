var gulp						= require('gulp'),
		sass						= require('gulp-sass'),
		browserSync			= require('browser-sync').create(),
		sourcemaps			= require('gulp-sourcemaps'),
		ftpVinil				= require('vinyl-ftp'),
		gutil						= require('gulp-util'),
		autoprefixer		= require('gulp-autoprefixer'),
		notify					= require("gulp-notify"),
		uglify					= require('gulp-uglify'),
		cleanCSS				= require('gulp-clean-css'),
		rename					= require('gulp-rename');

gulp.task('browser-sync', function(){
	browserSync.init({
		server: "./app",
		notify: false
	});
});

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.+(scss|sass)')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(sourcemaps.init())										// Process the original sources
	.pipe(sourcemaps.write())										// Add the map to modified source.
	.pipe(gulp.dest('app/css'))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 25 versions']))
	.pipe(cleanCSS())														// Minimize css ( *.min.css )
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
	return gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(uglify())															// Minimize js ( *.min.js )
	.pipe(gulp.dest('app/js'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task( 'deploy', function () {

    var conn = ftpVinil.create( {
        host:     'ftp.yourdomain.com',				//Enter your access data ( Host )
        user:     'username@yourdomain.com',	//Enter your access data ( User )
        password: 'password',									//Enter your access data ( Password )
        parallel: 10,
        log:      gutil.log
    } );
 
    var globs = [
        'app/css/**',
        'app/fonts/**',
        'app/images/**',
        'app/js/**',
        'app/libs/**',
        'app/*.+(html|htm)'
    ];
    // using base = '.' will transfer everything to "/" directory on your server
    // turn off buffering in gulp.src for best performance 
 
    return gulp.src( globs, { base: 'app/', buffer: false } )
        .pipe( conn.newer( '/' ) )						// only upload newer files 
        .pipe( conn.dest( '/' ) );						//server directory
} );

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/**/*.js', '!app/js/**/*.min.js'], ['js']);
	gulp.watch('app/*.+(html|htm)', browserSync.reload);
});

gulp.task('default', ['watch']);
