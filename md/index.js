var marked = require('marked');
var fs = require('fs');
exports.list = function(callback){
	fs.readdir(__dirname,function(err,files){
		delete files[files.indexOf('index.js')];
		callback(err,files);
	});
}
exports.read=function(file,callback){
	fs.readFile(__dirname+'/'+file,function(err,data){
		callback(err,marked(String(data)));
	});
}