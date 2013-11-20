module.exports = function (grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jade: {
      dev: {
        options: {
          debug: false,
          pretty: false,
          data: {
            dev: true,
            title: "<%= pkg.title %>"
          }
        },
        files: [{
          expand: true,
          cwd: "views",
          src: "*.jade",
          dest: ".",
          ext: ".html"
        }]
      },
      release: {
        options: {
          debug: false,
          pretty: false,
          data: {
            dev: false,
            title: "<%= pkg.title %>",
            commit: grunt.option("commit")
          }
        },
        files: [{
          expand: true,
          cwd: "views",
          src: "*.jade",
          dest: ".",
          ext: ".html"
        }]
      }
    },
    stylus: {
      dev: {
        options: {
          compress: false
        },
        files: {
          "public/build/main.css": "public/style/main.styl"
        }
      },
      release: {
        options: {
          compress: true
        },
        files: {
          "public/build/main.css": "public/style/main.styl"
        }
      }
    },
    concat: {
      dev: {
        files: {
          "public/build/libs.js": ["public/js/libs/*.js"],
          "public/build/modules.js": ["public/js/modules/*.js"]
        }
      },
      release: {
        src: ["public/js/libs/*.js", "public/build/modules.min.js"],
        dest: "public/build/<%= pkg.name %>.min.js"
      }
    },
    uglify: {
      options: {
        banner: "/*! <%= pkg.title %> (c) <%= pkg.author.email %>, <%= grunt.template.today('yyyy') %> */\n"
      },
      modules: {
        files: {
          "public/build/modules.min.js": ["public/js/modules/*.js"]
        }
      }
    },
    watch: {
      dev: {
        options: {
          livereload: true
        },
        files: ["views/**/*.jade", "public/style/**/*.styl", "public/js/**/*.js"],
        tasks: ["jade:dev", "stylus:dev", "concat:dev"]
      }
    }
  });

  grunt.registerTask("default", ["jade:dev", "stylus:dev", "concat:dev", "watch:dev"]);
  grunt.registerTask("dev", ["jade:dev", "stylus:dev", "concat:dev"]);
  grunt.registerTask("release", ["jade:release", "stylus:release", "uglify:modules", "concat:release"]);
};
