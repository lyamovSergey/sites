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
                    "dist/style.main.css": "css/style.less"
                }
            }
        },


        uglify: {
            my_target: {
                files: {
                    'js/script.min.js': ['js/script.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['css/*.less', 'js/script.js'],
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