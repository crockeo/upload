// Name  : gulpfile.js
// Author: Cerek Hillen
//
// Description:
//   This file specifies the behavior for Gulp.

/////////////
// Imports //
var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    watch   = require('gulp-watch'),
    jade    = require('gulp-jade'),
    react   = require('gulp-react'),
    sass    = require('gulp-sass'),
    nodemon = require('nodemon');

//////////
// Code //

////
// Deploying

// Deploying Jade.
gulp.task('deploy-jade', function () {
    gulp.src('templates/jade/**')
        .pipe(plumber())
        .pipe(jade({}))
        .pipe(gulp.dest('static/html/'));
});

// Deploying JSX.
gulp.task('deploy-jsx', function () {
    gulp.src('templates/jsx/**')
        .pipe(plumber())
        .pipe(react({}))
        .pipe(gulp.dest('static/js/'));
});

// Deploying SCSS.
gulp.task('deploy-scss', function () {
    gulp.src('templates/scss/**')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('static/css'));
});

// Deploying the templates.
gulp.task('deploy-templates', ['deploy-jade', 'deploy-jsx', 'deploy-scss'] function () { });

// Deploying the front-end dependencies.
gulp.task('deploy-dependencies', function () {
    // Deploying React.
    gulp.src('bower_components/react/react.min.js')
        .pipe(gulp.dest('static/js/'));

    // Deploying Zepto.
    gulp.src('bower_components/zepto/zepto.min.js')
        .pipe(gulp.dest('static/js/'));

    // Deploying Bootstrap.
    gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('static/css/'));

    gulp.src('bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('static/fonts/'));
});

// Deploying everything.
gulp.task('deploy', ['deploy-dependencies', 'deploy-templates'], function () { });

////
// Watching

// Watching the project.
gulp.task('watch-project', function () {
    nodemon({
        script: 'app.js',
        ext   : 'js',
        ignore: ['static/', 'templates/jsx', 'gulpfile.js']
    }).on('restart', function () {
        console.log('Server restarted...');
    }).on('crash', function () {
        console.log('Server crashed. It will restart upon the next change!');
    });
});

// Watching the templates.
gulp.task('watch-templates', function () {
    gulp.watch('templates/**', ['deploy-templates']);
});

// Watching the whole project for updates.
gulp.task('watch', ['watch-project', 'watch-templates'], function () { });

////
// Default

// Defaults to first deploying the dependencies and then watching the project
// for updates.
gulp.task('default', ['deploy', 'watch']);
