var chalk = require('chalk');
// Gulp and plugins
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');
    rename = require('gulp-rename');
    pngquant = require('imagemin-pngquant');
	imageop = require('gulp-image-optimization');


gulp.task('default', ['images'], function(callback) {

    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});

// Copies images from src and component/* /
gulp.task('image', function () {
    return gulp.src(['exclude/images/*'])
        .pipe(rename({dirname: ''}))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({ quality: '65-80', speed: 4 })]
        }))
        .pipe(gulp.dest('./assets/images/'));
});

// Copies images from src and component/* /
gulp.task('images', function(cb) {
    gulp.src(['exclude/**/*.png','exclude/**/*.jpg','exclude/**/*.gif','exclude/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./assets/images')).on('end', cb).on('error', cb);
});



