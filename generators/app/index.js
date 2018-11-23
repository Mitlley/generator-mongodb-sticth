'use strict';
var Generator = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('lodash');

module.exports = class extends Generator{
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  initializing() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick ' + chalk.red('MongoDB Atlas Sticth') + ' generator!'
    ));
  }

  async prompting() {
    var that = this;

    return this.prompt([{
      type: 'input',
      name: 'appName',
      message: 'What\'s the app name?',
      default: _.startCase(this.appname),
      validate: function(input){
        if(input.indexOf(' ') !== -1){
          return "App name can\'t contain spaces.";
        } else if(input.trim() == ""){
          return "App name it\'s required.";
        }

        return true;
      }
    },{
      type: 'input',
      name: 'projectId',
      message: 'What\'s the MongoDB Atlas project id?',
      default: that.config.get('projectId'),
      validate: function(input){
        if(input.trim() == ""){
          return "Project id it\'s required.";
        }

        return true;
      }
    }]).then(function (props) {
      that.log("So we are creating " + chalk.blue(props.appName));
      that.config.set({
        appName: props.appName,
        projectId: props.projectId
      });
      that.config.save();
      that.props = props;
    });
  }

  writing() {
    var props = this.props;

    var copy = this.fs.copy.bind(this.fs);
    var copyTpl = this.fs.copyTpl.bind(this.fs);
    var tPath = this.templatePath.bind(this);
    var dPath = this.destinationPath.bind(this);

    copy(tPath('_stitch.json'), dPath('stitch.json'));
    copy(tPath('_stitch.empty.json'), dPath('stitch.empty.json'));
    copy(tPath('_gitignore'), dPath('.gitignore'));
    copy(tPath('_gulpfile.js'), dPath('gulpfile.js'));
    copy(tPath('_package.json'), dPath('package.json'));
    copyTpl(tPath('_env'), dPath('.env'), props);
  }

  install() {
    this.installDependencies({bower: false});
  }
};
