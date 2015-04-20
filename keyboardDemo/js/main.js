require(
  [
    "libs/jquery-2.1.3.min",
    "libs/underscore-min",
    "libs/backbone-min",
    "libs/audiosynth",
    "app"
  ], function() {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});

requirejs.config({
    baseUrl: 'js',
    paths: {
        views: '/views',
        templates: '../templates'
    }
});
