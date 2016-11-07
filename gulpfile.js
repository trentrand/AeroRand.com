'use strict';

var gulp = require('gulp'),
	swig = require('gulp-swig'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat-util'),
    sass = require('gulp-sass'),
    embedTemplates = require('gulp-angular-embed-templates'),
    webserver = require('gulp-webserver'),
	_ = require('lodash'),
	config = require('./config/all'),
	production = require('./config/production'),
	development = require('./config/development'),
	args = require('yargs').argv;


if (args.env === 'production') {
	_.assign(config,production)
} else {
	_.assign(config,development)	
}

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('swig', ['clean'], function() {
  gulp.src('./app/index.html')
    .pipe(swig({data: config}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('copy-bower', ['clean'], function() {
   var bower_assets = _.flatten([config.assets.scripts,config.assets.stylesheets,config.assets.fonts]).filter(function(filename){
      return filename.indexOf('bower_components') >= 0;
   });
   gulp.src(bower_assets,{base: 'bower_components/'})
   .pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('concat-app', ['clean'], function() {
  return gulp.src(['app/config.js', 'app/init.js', 'app/core.module.js', 'app/**/*.js'])
    /* this will remove 'use strict' and wrap the source in the function form of use strict */
    .pipe(embedTemplates())
    .pipe(concat('app.js', {process: function(src) { return (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
    .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
    .pipe(concat.footer('\n})(window, document);\n'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass-dev', ['clean'], function () {
  gulp.src(config.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('watch', function () {
  gulp.watch(['app/config.js', 'app/init.js', 'app/core.module.js', 'app/**/*.js', 'app/views/*.html'], ['build']);
  gulp.watch(['./app/index.html'], ['build']);
  gulp.watch(config.sass, ['build']);
});

gulp.task('build', ['clean', 'swig','copy-bower','concat-app','sass-dev']);

gulp.task('default', ['build', 'webserver', 'watch']);

