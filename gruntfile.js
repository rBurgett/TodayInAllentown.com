module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
				all: ['js/main.js']
		},
		concat: {
			dist: {
				src: [
					'js/jquery-1.11.1.min.js',
					'js/handlebars.min.js',
					'js/main.js'
			],
			dest: 'js/build/production.js'
			}
		},
		jasmine: {
			pivotal: {
				src: 'js/main.js',
				options: {
					vendor: [
						'js/jquery-1.11.1.min.js',
						'js/handlebars.min.js'
					],
					specs: 'tests/jasmineSpecs.js',
				}
			}
		},
		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
			}
		},
		watch: {
			scripts: {
				files: ['js/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					spawn: false,
				},
			}
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-jshint');	
	grunt.loadNpmTasks('grunt-contrib-jasmine');	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify']);

};