'use strict';

var chalk = require('chalk');
var exec = require('./lib/exec.js');
var conf = require('./lib/conf.js');

module.exports = function(grunt){

    grunt.registerTask('ec2_create_tag', 'Tags an instance with the provided name', function(id, name){
        conf.init(grunt);

        if (arguments.length < 2) {
            grunt.fatal([
                'You should provide an id, and the name you want to give to the instance.',
                'e.g: ' + chalk.yellow('grunt ec2_create_tag:id:name')
            ].join('\n'));
        }

        grunt.log.writeln('Naming EC2 instance %s as %s', chalk.cyan(id), chalk.cyan(name));

        var done = this.async();

        exec('aws ec2 create-tags --resources %s --tags Key=Name,Value=%s', [id, name], done);
    });
};
