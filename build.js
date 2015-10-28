var fs       = require('fs'),
    path     = require('path'),
    exec     = require('child_process').exec,
    stylus   = require('stylus'),
    CleanCSS = require('clean-css');

var banner = "/*! Legible UI v0.1 */\n";

// Load normalize.css
var normalizeCSS = fs.readFileSync(__dirname + '/lib/normalize.css/normalize.css', 'utf8');

function doStylus(stylusFile) {
    var fileName = path.basename(stylusFile).match(/(.*)\.styl$/)[1];
	//console.log(fs.readFileSync(__dirname + '/stylus/'+ stylusFile, 'utf8'));
    stylus(fs.readFileSync(__dirname + '/stylus/'+ stylusFile, 'utf8'))
        .render(function(err, css) {
            var combineCSS = normalizeCSS + banner + css;
        
            var outCSS = new CleanCSS({
                keepBreaks: true
            }).minify(combineCSS).styles;

            fs.writeFile(__dirname + '/css/' + fileName + '.css', outCSS, 'utf8', function(err){
                console.log(fileName + '.css Done!');
            });
        
            var minCSS = new CleanCSS({
                keepBreaks: false
            }).minify(combineCSS).styles;
        
            fs.writeFile(__dirname + '/css/' + fileName + '.min.css', minCSS, 'utf8', function(err){
                console.log(fileName + '.min.css Done!');
            });
        });
}


doStylus('legible.core.styl');
