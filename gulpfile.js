var fs        = require('fs');
var path      = require('path');
var plato     = require('plato');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var notify    = require('gulp-notify');
var rename    = require('gulp-rename');
var cssnano   = require('gulp-cssnano');
var less      = require('gulp-less');
var path      = require('path');
var gutil     = require('gutil');
var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var beep = require('beepbeep');
var gulp      = require('gulp');

var runSequence = require('run-sequence');

// Beep Error Messaging + Red Coloring FTW.
var onError = function (err) {
    beep([1000, 500, 1500]);
    gutil.log(gutil.colors.red(err));
};

var paths = {
    scripts: [
        'src/app/app.js',
    ]
};

// ---------------------------------------------------------------------
// | Minor tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('js', function () {
    return;
});

// Watch less files for changes and reload on changes
gulp.task('less', function () {
    return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('src/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({stream:true}))
    .pipe(notify({ message: 'Less task complete'}))
    .on('error', gutil.log);
});

gulp.task('compileJs', function () {
   //
});

// Watch html for changes and reload on changes
gulp.task('html', function (){
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream({stream:true}))
    .pipe(notify({ message: 'Html task complete'}));
});

// watches the gulpfile as its running as well
gulp.slurped = false; //step 1

gulp.task('watch', function () {
    if(!gulp.slurped){ //step 2
        gulp.watch('src/less/*.less', ['less'], reload);
        gulp.watch('src/**/*.html', ['html'], reload);
        gulp.watch('src/**/*.html').on('change', reload);
        gulp.slurped = true; //step 3
    }
});

// Serve a site after running multiple tasks
gulp.task('serve', ['js', 'html', 'less'], function () {
     browserSync.init({
        server: {
            baseDir: "src/.",
            open: "local",
            browser: "google chrome",
            middleware: [historyApiFallback()]
        }
    });
});

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('build', function (done) {
    runSequence(
        // any dependency functions first
    done);
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/.",
            open: "local",
            browser: "google chrome"
        }
    });
});

gulp.task('default', function(){
    gulp.start('serve','watch', reload);
});
