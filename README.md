# online-mindmap

## Installation
### Sass
Install Sass following the [instructions for command line](http://sass-lang.com/install).

### Grunt-CLI
Install grunt-cli globally as described in ['Getting Started'](http://gruntjs.com/getting-started) page.
```
$ npm install -g grunt-cli
```
### NPM dependencies
Install Node.js dependencies with npm:
```
$ npm install
```

### Bower dependencies
Install scripts dependencies declared with Bower:
```
$ bower install
```

## Build and run project
### Build with Grunt
Grunt is used to build the project. It copies requiered external script, uglify project script, parse sass files, etc.
The project can be built in release or debug mode respectively with :
```
$ grunt release
```
```
$ grunt debug
```

### Run Express web server
The web application is started runing de index.js script and accesible in http://localhost:8080.
```
$ node index.js
```
