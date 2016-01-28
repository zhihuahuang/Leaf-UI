var fs       = require('fs'),
    path     = require('path'),
    exec     = require('child_process').exec,
    stylus   = require('stylus'),
    CleanCSS = require('clean-css');

var async = require('async');

var banner = "/*! Leaf UI v0.2 */\n";

var config = {
    css: [{
        src: [
            'node_modules/normalize.css/normalize.css',
            'stylus/base.styl',
            'stylus/text.styl',
            'stylus/layout.styl',
        ],
        dest: "css/leaf-core.css",
    },{
        src: [
            'stylus/component.styl'
        ],
        dest: 'css/leaf-component.css'
    }]
};

function buildCSSFile(src, dest, callback) {
    var cssTask = [];
    
    for(var i in src) {
        if(/styl$/.test(src[i])) {
            (function(file){
                cssTask.push(function(cb){
                    fs.readFile(file, 'utf-8', function(er, data){
                        stylus(data).render(cb);
                    });
                });
            }(src[i]));
        }
        else if(/css$/.test(src[i])) {
            (function(file){
                cssTask.push(function(cb) {
                    fs.readFile(file, 'utf-8', cb);
                });
            }(src[i]));
        }
    }
    
    async.parallel(cssTask, function(err, results) {
        fs.writeFile(dest, results.join('\n'), callback);
    });
}

function miniCSS(css, options) {
    options = options || {
        keepBreaks: false,
		semanticMerging: true,
    };
    return new CleanCSS(options).minify(css).styles;
}

function miniCSSFile(src, dest, callback) {
    fs.readFile(src, function(err, data) {
       fs.writeFile(dest, miniCSS(data), callback); 
    });
}

for(var i in config.css) {
    var css = config.css[i];
    buildCSSFile(css.src, css.dest, function(){
        miniCSSFile(css.dest, css.dest.replace(/css$/, 'min.css'), function() {
            console.log(config.css[i].dest + ' done!'); 
        });
    });
}
