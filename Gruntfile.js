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

	var ext_files = [{
		src: 'node_modules/@angular/common/bundles/common.umd.min.js',
		dest: 'static/scripts/ext/angular.common.js',
	},{
		src: 'node_modules/@angular/core/bundles/core.umd.min.js',
		dest: 'static/scripts/ext/angular.core.js',
	},{
		src: 'node_modules/@angular/compiler/bundles/compiler.umd.min.js',
		dest: 'static/scripts/ext/angular.compiler.js',
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

	grunt.initConfig({
		exec: {
			tsc: {
				cmd: "tsc"
			}
		},
		
		copy: {
			scripts: { files: scripts_files },
			app: { files: app_files	},
			ext: { files: ext_files	}
		},

		clean: {
			init: ['static/scripts'],
			end: ['app/**/*.js','app/**/*.js.map']
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('debug', [
		'clean:init',
		'exec:tsc',
		'copy:scripts',
		'copy:app',
		'copy:ext',
		'clean:end'
	]);

	grunt.registerTask('release', [
		'clean:init',
		'exec:tsc',
		'copy:scripts',
		'copy:app',
		'copy:ext',
		'clean:end'
	]);
};