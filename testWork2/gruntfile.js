module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "assets/css/style.main.css": "assets/css/style.main.less"
                }
            }
        },


        uglify: {
            my_target: {
                files: {
                    'assets/js/script.min.js': ['assets/js/script.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/css/*.less', 'assets/js/script.js'],
                tasks: ['less', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['less', 'uglify', 'watch']);

};