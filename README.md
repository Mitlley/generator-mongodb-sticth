# Generator MongoDB Atlas - Stitch

This project was created for scaffold a Stitch app. Once you have created the app, you can deploy it with Gulp on three diferents environments (dev, stage, prod) to MongoDB Atlas as three separated Stitch apps.

## Installation

In case you haven't installed the generator yet:

```bash
$ npm install -g yeoman generator-mongodb-stitch
```

Using the generator:

```bash
$ yo mongodb-stitch
```

Provide app name and MongoDB Atlas project id as the yeoman ask you so.

Once the generator has finished the process, you will find the basic structure of your app and the gulpfile for dpeloyment.

## Deployment

You can deploy to tree diferents environments, in the practice that's three diferentes stitch apps on the Atlas project.

Feel free to deploy to any env at any time `gulp deploy:dev`, `gulp deploy:stage` or `gulp deploy:prod`.

For instance
```bash
$ gulp deploy:prod
```

Will dpeloy in your Atlas proyect the stitc app named ***app-name*-prod**.

Developed by [@mitlley](https://gitlab.com/mitlley).
