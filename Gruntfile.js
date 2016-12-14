module.exports = function(grunt) {

	var app_files = [{
		expand: true,
		flatten: true,
		src: ['app/**/*.js'],
		dest: 'static/scripts/app/'
	}];

	var scripts_files = [{
		expand: true,
		flatten: true,
		src: ['scripts/**/*.js'],
		dest: 'static/scripts/'
	}];

	var css_source_files = [{
		expand: true,
		src: ['styles/**/*.css'],
		dest: 'static/styles/',
		flatten: true
	}];

	var angular_files = [{
		src: 'node_modules/@angular/common/bundles/common.umd.min.js',
		dest: 'static/scripts/ext/angular.common.js',
	},{
		src: 'node_modules/@angular/core/bundles/core.umd.min.js',
		dest: 'static/scripts/ext/angular.core.js',
	},{
		src: 'node_modules/@angular/compiler/bundles/compiler.umd.min.js',
		dest: 'static/scripts/ext/angular.compiler.js',
	},{
		src: 'node_modules/@angular/forms/bundles/forms.umd.min.js',
		dest: 'static/scripts/ext/angular.forms.js',
	},{
		src: 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js',
		dest: 'static/scripts/ext/angular.platform-browser.js',
	},{
		src: 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
		dest: 'static/scripts/ext/angular.platform-browser-dynamic.js',
	},{
		src: 'node_modules/systemjs/dist/system.src.js',
		dest: 'static/scripts/ext/system.js',
	},{
		src: 'node_modules/zone.js/dist/zone.js',
		dest: 'static/scripts/ext/zone.js',
	},{
		src: 'node_modules/reflect-metadata/Reflect.js',
		dest: 'static/scripts/ext/Reflect.js',
	},{
		expand: true,
		cwd: 'node_modules/rxjs/',
		src: ['**/*.js'],
		dest: 'static/scripts/ext/rxjs/'
	}];

	var fontawesome_files = [{
		expand: true,
		cwd: 'node_modules/font-awesome/fonts',
		src: ['**/*.*'],
		dest: 'static/fonts/'
	},{
		src: 'node_modules/font-awesome/css/font-awesome.min.css',
		dest: 'static/styles/font-awesome.css'
	}];

	var jquery_files = [{
		src: 'node_modules/jquery/dist/jquery.min.js',
		dest: 'static/scripts/ext/jquery.js'
	}];

	grunt.initConfig({
		exec: {
			tsc: {
				cmd: "tsc"
			}
		},
		
		copy: {
			scripts: { files: scripts_files },
			css: { files: css_source_files },
			app: { files: app_files	},
			angular: { files: angular_files	},
			fontawesome: {files: fontawesome_files },
			jquery: {files: jquery_files}
		},

		clean: {
			init: ['static/scripts'],
			end: ['app/**/*.js','app/**/*.js.map']
		},

		sass: {
			all: {
				files: [{
					expand: true,
					src: ['styles/*.scss'],
					dest: 'static/styles/',
					ext: '.css',
					flatten: true
				}]
			}
		},
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('debug', [
		'clean:init',
		'exec:tsc',
		'sass:all',
		'copy:scripts',
		'copy:css',
		'copy:app',
		'copy:angular',
		'copy:fontawesome',
		'copy:jquery',
		'clean:end'
	]);

	grunt.registerTask('release', [
		'clean:init',
		'exec:tsc',
		'sass:all',
		'copy:scripts',
		'copy:css',
		'copy:app',
		'copy:angular',
		'copy:fontawesome',
		'copy:jquery',
		'clean:end'
	]);
};