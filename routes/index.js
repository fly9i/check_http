var md=require('../md');
/*
 * GET home page.
 */
var phantom=require('../module/phantomjs');
exports.res = function(req, res){
	res.send("res");
	//res.render('index', { content: "JSON.stringify(req)" });
};

exports.index = function(req,res){
	res.render('index');
}
exports.editor = function(req,res){
	res.render('edit')
}
exports.marked = function(req,res){
	md.list(function(err,files){
		if(err) console.log(err);
		for(var i in files){
			md.read(files[i],function(err,data){
				if(err) console.log(err);
				res.render('marked',{mk:data,files:files,df:files[0]});;
			})
		}
	});
	
}