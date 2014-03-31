var path=__dirname+"/phantomjs";
var ph=require('node-phantom');
var jquery='http://code.jquery.com/jquery-1.11.0.min.js';
var target="";
exports.handle=function(url,ss,callback,reqfunc,resfunc,clickFunc){
	if(typeof url != 'string'){
		callback({code:-1,msg:'Error type of url,the input url is:'+url});
		return;
	}
	try{
		console.log("Go into process url function.");
		logout(url,ss,callback,reqfunc,resfunc,clickFunc);
	}catch(e){
		console.log("FEI:ERR:Failed to query request of the url:"+url);
		console.log(err);
	}
}

function logout(url,ss,callback,reqfunc,resfunc,clickFunc){
	try{
		ph.create(function(err,phantom){
			if(err) console.log("Failed create phantom,Err:"+err);
			console.log("Start to check the url:"+url);
			//phantom.settings({userAgent:"Mozilla/5.0 (compatible; AGCheckSpider/1.0; +http://www.agrantsem.com/) Safari/537.36"});
			phantom.createPage(function(err,page){
				if(err) console.log("Failed to create page,Err:"+err);
				pageOut(page,reqfunc,resfunc,callback);
				console.log("Open url:"+url);
				var selector=ss || '#main-navbar-about';
				page.open(url,function(){
					console.log("selector:"+selector);
					page.includeJs(jquery,function(err){
						return page.evaluate(function(selector) {
							var ele=$(selector);
							console.log("selector:"+selector);
							var x=ele.offset().left;
							var y=ele.offset().top;
							if(ele && ele[0]){
								return {x:x,y:y,e:ele[0].outerHTML};
							}
						},function(err,res){
							if(err) console.log("Error to execute some action:"+err);
							setTimeout(function(){
								console.log("selector:"+selector+"\tres:"+res);
								var isClick=false;
								if(typeof res !='undefined' && res.x){
									isClick=true;
								}
								clickFunc(res.e);
								if(isClick){
									page.sendEvent('click',res.x+2,res.y+2,function(err){
										if(err) console.log(err);
										//phantom.exit();
									});
								}
							}, 3000);
						},selector);
					});
				});
			});
			
		},{phantomPath:path});
	}catch(err){
		console.log("Failded to create phantom!");
		console.log(err);
	}
}

function pageOut(page,reqfunc,resfunc,callback){

	page.onResourceRequested = function(request) {
	   	//request.setHeader("User-Agent","Mozilla/5.0 (compatible; AGCheckSpider/1.0; +http://www.agrantsem.com/) Safari/537.36");
	    if(reqfunc){
	    	reqfunc(request);
	    }
	};

	page.onResourceReceived = function(response) {
		if(resfunc){
	    	resfunc(response);
	    }
	};
	page.onLoadFinished = function(status){
		callback(null,status,target);
	}
	page.onUrlChanged = function(targetUrl) {
		console.log('New URL: ' + targetUrl);
		target=targetUrl;
	};
	page.onConsoleMessage = function(msg, lineNum, sourceId) {
		console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
	};
}