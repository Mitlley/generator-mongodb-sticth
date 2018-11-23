require('dotenv').config();
var fs = require('fs');
var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('deploy:dev', function (cb) {
  // Ceck that there is a dev file already
  fs.stat('sticth.dev.json', function(err, stat) {
    if(err == null) {
      // If file exists, load that conf
      fs.copyFile('sticth.dev.json', 'stitch.json', (err) => {});
    } else if(err.code === 'ENOENT') {
      // If file exists, load empty conf
      // That way we make sure to load a new project to MongoDB Atlas
      fs.copyFile('stitch.empty.json', 'stitch.json', (err) => {});
    } else {
        console.log('Error: ', err.code);
    }
  });

  var appName = process.env.APPNAME.trim() + "-dev";
  var commandStitchImport = "stitch-cli import --app-name=" + appName + " --project-id=" + process.env.PROJECTID + " -y";
  exec(commandStitchImport, function (err, stdout, stderr) {
    console.log(stdout);
    if(err == undefined || err == ""){
      // Backing up conf file for this env
      fs.copyFile('stitch.json', 'sticth.dev.json', (err) => {});
    }
    cb(err);
  });
})

gulp.task('deploy:stage', function (cb) {
  // Ceck that there is a dev file already
  fs.stat('sticth.stage.json', function(err, stat) {
    if(err == null) {
      // If file exists, load that conf
      fs.copyFile('sticth.stage.json', 'stitch.json', (err) => {});
    } else if(err.code === 'ENOENT') {
      // If file exists, load empty conf
      // That way we make sure to load a new project to MongoDB Atlas
      fs.copyFile('stitch.empty.json', 'stitch.json', (err) => {});
    } else {
        console.log('Error: ', err.code);
    }
  });

  var commandStitchImport = "stitch-cli import --app-name=" + process.env.APPNAME + "-stage --project-id=" + process.env.PROJECTID + " -y";
  exec(commandStitchImport, function (err, stdout, stderr) {
    console.log(stdout);
    if(err == undefined || err == ""){
      // Backing up conf file for this env
      fs.copyFile('stitch.json', 'sticth.stage.json', (err) => {});
    }
    cb(err);
  });
})

gulp.task('deploy:prod', function (cb) {
  // Ceck that there is a dev file already
  fs.stat('sticth.prod.json', function(err, stat) {
    if(err == null) {
      // If file exists, load that conf
      fs.copyFile('sticth.prod.json', 'stitch.json', (err) => {});
    } else if(err.code === 'ENOENT') {
      // If file exists, load empty conf
      // That way we make sure to load a new project to MongoDB Atlas
      fs.copyFile('stitch.empty.json', 'stitch.json', (err) => {});
    } else {
        console.log('Error: ', err.code);
    }
  });

  var commandStitchImport = "stitch-cli import --app-name=" + process.env.APPNAME + "-prod --project-id=" + process.env.PROJECTID + " -y";
  exec(commandStitchImport, function (err, stdout, stderr) {
    console.log(stdout);
    if(err == undefined || err == ""){
      // Backing up conf file for this env
      fs.copyFile('stitch.json', 'sticth.prod.json', (err) => {});
    }
    cb(err);
  });
})
