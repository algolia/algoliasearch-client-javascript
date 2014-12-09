var semver = require('semver'),
    f = require('util').format,
    jsFiles = [
      'src/version.js',
      'src/algoliasearch.js',
      'src/algoliasearch.helper.js',
      'src/algoliasearch.places.js',
      'vendor/json2.js'
    ];

module.exports = function(grunt) {
  grunt.initConfig({
    version: grunt.file.readJSON('package.json').version,

    buildDir: 'dist',

    banner: [
      '/*!',
      ' * algoliasearch <%= version %>',
      ' * https://github.com/algolia/algoliasearch-client-js',
      ' * Copyright 2014 Algolia SAS; Licensed MIT',
      ' */\n\n'
    ].join('\n'),

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      main: {
        options: {
          mangle: true,
          compress: true
        },
        src: jsFiles,
        dest: '<%= buildDir %>/algoliasearch.min.js'
      },
      jquery: {
        options: {
          mangle: true,
          compress: true
        },
        src: jsFiles.concat(['src/algoliasearch.jquery.js']),
        dest: '<%= buildDir %>/algoliasearch.jquery.min.js'
      },
      angular: {
        options: {
          mangle: true,
          compress: true
        },
        src: jsFiles.concat(['src/algoliasearch.angular.js']),
        dest: '<%= buildDir %>/algoliasearch.angular.min.js'
      }
    },

    concat: {
      options: {
      },
      main: {
        src: jsFiles,
        dest: '<%= buildDir %>/algoliasearch.js'
      },
      jquery: {
        src: jsFiles.concat(['src/algoliasearch.jquery.js']),
        dest: '<%= buildDir %>/algoliasearch.jquery.js'
      },
      angular: {
        src: jsFiles.concat(['src/algoliasearch.angular.js']),
        dest: '<%= buildDir %>/algoliasearch.angular.js'
      }
    },

    sed: {
      version: {
        pattern: '%VERSION%',
        replacement: '<%= version %>',
        path: ['<%= concat.main.dest %>', '<%= concat.jquery.dest %>', '<%= concat.angular.dest %>', '<%= uglify.main.dest %>', '<%= uglify.jquery.dest %>', '<%= uglify.angular.dest %>']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: ['src/*.js'],
      tests: ['test/*.js'],
      gruntfile: ['Gruntfile.js']
    },

    watch: {
      js: {
        files: jsFiles,
        tasks: 'build:js'
      }
    },

    jasmine: {
      js: {
        src: jsFiles,
        options: {
          specs: 'test/*_spec.js',
          timeout: 40000,
          template: 'SpecRunner.tmpl',
          templateOptions: {
            application_id: process.env.ALGOLIA_APPLICATION_ID,
            api_key: process.env.ALGOLIA_API_KEY
          },
          '--ssl-protocol' : 'tlsv1'
        }
      }
    },

    clean: {
      dist: 'dist'
    },

    connect: {
      server: {
        options: {
          port: 8888, keepalive: true
        }
      }
    },

    parallel: {
      dev: {
        tasks: [
          { grunt: true, args: ['server'] },
          { grunt: true, args: ['watch'] }
        ]
      }
    }
  });

  grunt.registerTask('manifests', 'Update manifests.', function(version) {
    var _ = grunt.util._,
        pkg = grunt.file.readJSON('package.json'),
        component = grunt.file.readJSON('component.json');

    component = JSON.stringify(_.extend(component, {
      name: pkg.name,
      version: version
    }), null, 2);

    pkg = JSON.stringify(_.extend(pkg, {
      version: version
    }), null, 2);

    grunt.file.write('package.json', pkg);
    grunt.file.write('component.json', component);
  });

  // aliases
  // -------

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['uglify', 'concat', 'sed:version']);
  grunt.registerTask('server', 'connect:server');
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('test', 'jasmine:js');
  grunt.registerTask('test:browser', ['jasmine:js:build']);
  grunt.registerTask('dev', 'parallel:dev');

  // load tasks
  // ----------

  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
