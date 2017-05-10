/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'ext:': 'scripts/ext/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      omm: 'scripts/app',

      // angular bundles
      '@angular/core': 'ext:angular.core.js',
      '@angular/common': 'ext:angular.common.js',
      '@angular/compiler': 'ext:angular.compiler.js',
      '@angular/forms': 'ext:angular.forms.js',
      '@angular/platform-browser': 'ext:angular.platform-browser.js',
      '@angular/platform-browser-dynamic': 'ext:angular.platform-browser-dynamic.js',
//      '@angular/http': 'ext:angular.http.js',
//      '@angular/router': 'ext:angular.router.js',

      // other libraries
      'rxjs':                      'ext:rxjs',
//      'angular-in-memory-web-api': 'ext:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      omm: {
        main: './omm.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
