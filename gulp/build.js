'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const install = require("gulp-install");
const flatten = require('gulp-flatten');
const foreach = require('gulp-foreach');
const path = require('path');
const fs = require('fs');
const merge = require('merge-stream');
const zip = require('gulp-vinyl-zip');
const babel = require('gulp-babel');

const destination = './dist';
const packaged = path.join( destination, 'packaged' );

gulp.task('clean', function() {
    return del(destination);

});

gulp.task('copy_package', function(){
    return gulp.src('./package.json')
        .pipe(flatten())
        .pipe(gulp.dest(destination));
});

gulp.task('install_local', function(){
    return gulp.src(destination + '/package.json')
        .pipe(gulp.dest(destination))
        .pipe(install({production: true, args:['--no-save']}));
});

gulp.task('copy_lambdas', function(){
    return gulp
        .src(['./*.js', '!gulpfile.js'])
        .pipe(babel())
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(gulp.dest(destination + '/' + path.basename(file.path, '.js')))
        }));
});

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('copy_local_modules', function() {

    var folders = getFolders(destination + '/').filter( w => w !== 'node_modules' );
    if (folders.length === 0) return;
    var tasks = folders.map(function(folder) {
        return gulp.src(destination + '/node_modules/**/*')
            .pipe(gulp.dest(path.join(destination, folder , 'node_modules')));
    });

    return merge(tasks);
});

gulp.task('copy_local_source', function() {

    var folders = getFolders(destination + '/').filter( w => w !== 'node_modules' );
    if (folders.length === 0) return;
    var tasks = folders.map(function(folder) {
        return gulp.src('src/**/*')
            .pipe(babel())
            .pipe(gulp.dest(path.join(destination, folder , 'src')));
    });

    return merge(tasks);
});


gulp.task('zip_lambda_folders', function() {

    var folders = getFolders(destination + '/').filter( w => w !== 'node_modules' );
    if (folders.length === 0) return;
    var tasks = folders.map(function(folder) {
        return gulp.src(path.join(destination, folder) + '/**/*')
            .pipe(zip.dest(path.join(packaged, folder + '.zip')));
    });


    return merge(tasks);
});

// delete dist folder
// create dist folder
// copy package.json into dist
// run npm install --no-save --production
// for each lambda
//      create sub dir & copy in lambda code
//      copy in local node_modules
//      zip into packaged folder
//
gulp.task('default', gulp.series(

    'clean',
    'copy_package',
    'install_local',
    'copy_lambdas',
    'copy_local_source',
    'copy_local_modules',
    'zip_lambda_folders'
));
