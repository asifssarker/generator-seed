'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SeedGenerator = module.exports = function SeedGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    //testing the location of stuff
    this.AssetPath = 'client';

    require('crypto').randomBytes(16, function(ex, buf) {
        this.randomSessionKey = buf.toString('hex');
    }.bind(this));



};

util.inherits(SeedGenerator, yeoman.generators.Base);

SeedGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'applicationName',
        message: 'What is the name of this appication?',
    }];

    this.prompt(prompts, function(props) {
        this.applicationName = props.applicationName;

        cb();
    }.bind(this));
};



SeedGenerator.prototype.folders = function folders() {
    this.mkdir('build');
};

SeedGenerator.prototype.app = function app() {

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('client/views/index.html', 'client/views/index.html');
    this.template('client/js/app.js', 'client/js/app.js');
    this.template('server/index.js', 'server/index.js');
    this.template('client/js/controllers/login.js', 'client/js/controllers/login.js');
    this.template('client/js/controllers/main.js', 'client/js/controllers/main.js');
    this.template('client/views/partials/login.html', 'client/views/partials/login.html');
    this.template('client/views/partials/main.html', 'client/views/partials/main.html');
    //don't want to template this as it's got lots of variables templated for the grunt file itself.
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    //client directory and contents
    this.directory('client/css', 'client/css');
    this.directory('client/fonts', 'client/fonts');
    this.directory('client/images', 'client/images');
    this.directory('client/views', 'client/views');
    this.directory('server/controllers', 'server/controllers');
    this.directory('server/models', 'server/models');
    this.directory('server/routes', 'server/routes');
    this.directory('server/views', 'server/views');
    this.directory('scripts', 'scripts');
    this.directory('test', 'test');

};


SeedGenerator.prototype.projectfiles = function projectfiles() {
    this.template('editorconfig', '.editorconfig');
    this.template('jshintrc', '.jshintrc');
    this.template('_bowerrc', '.bowerrc');
};