var fs       = require('fs'),
    path     = require('path'),
    exec     = require('child_process').exec,
    stylus   = require('stylus'),
    CleanCSS = require('clean-css');

var banner = "/*! Leaf UI v0.2 */\n";

var config = {
	"leaf-core": {
		in: [
			'./stylus/base.styl',
			'./stylus/text.styl',
			'./stylus/layout.styl',
		],
		out: "css/",
		minimize: true,
	}
}

function stylusify(styl, calllback) {
	stylus(styl)
		.render(function(err, css) {
			if(err) {
				console.log(err);
				process.exit(-1);
			}
			calllback(css);
		});
}

function minify(css) {
	return new CleanCSS({
		keepBreaks: false,
		semanticMerging: true,
	}).minify(css).styles;
}

function inputFile(path) {
	return fs.readFileSync(path, 'utf-8');
}

function outputCSS(path, css) {
	fs.writeFile(path, banner + css, 'utf8', function(err){
		console.log(path + ' Done!');
	});
}

var normalizeCSS = fs.readFileSync(__dirname + '/node_modules/normalize.css/normalize.css', 'utf8');
var normalizeMinCSS = minify(normalizeCSS);

for(i in config) {
	var name = i;
	var files = config[i].in;
	var dir = __dirname + '/' + (config[i].out || 'css/');
	var minimize = config[i].minimize || true;
	
	(function(){
		var cssList = [],
			minCSSList = [];
	
		var finish = 0;

		function buildCSS() {
			if(finish != files.length) {
				return;
			}

			outputCSS(dir + i + '.css', normalizeCSS + cssList.join(""));
			outputCSS(dir + i + '.min.css', normalizeMinCSS + minCSSList.join(""));
		}

		for(j in files) {
			var stylus = inputFile(files[j]);
			(function(key) {
				stylusify(stylus, function(css) {
					cssList[key] = css;
					minCSSList[key] = minify(css);
					finish++;
					buildCSS();
				});
			}(j));
		}		
	}());	
}