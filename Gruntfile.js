module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            development: {
                files: {
                    'dist/style.css': 'src/styles/style.less',
                    'dist/adaptive.css': 'src/styles/adaptive.less',
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['dist/adaptive.css', 'dist/style.css'],
                dest: 'dist/style.css',
            },
        },
        cssmin:{
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
            },
            target:{
                files:{
                    'dist/style.min.css': 'dist/style.css'
                }
            }
        },
        clean:[
            'dist/style.css', 'dist/adaptive.css'
        ]
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat', 'less','cssmin','clean']);
}