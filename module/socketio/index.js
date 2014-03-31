/*
* socket.io receive and handle it.
*/
//var phantom=require('../phantomjs');
String.prototype.trim = function(){
	return this.replace(/^ +| +$/gi,'');
}
exports.handle=function(socket,io){
	socket.on('query',function(data){
		var req={};
		console.log(data);
		if(data && data.url){
			console.log("Check url is:"+data.url);
			
			try{
				require('../phantomjs').handle(data.url.trim(),data.selector.trim(),
				function(err,status,url){
					if(err){
						socket.emit('err',{status:-1});
					}else{
						socket.emit('finish',{status:status,url:url});
					}
				},
				function(request){
					req[request[0].url]=request[0];
				},
				function(response){
					if(response.stage=='end'){
						if(response.url in req){
							socket.emit('res',{url:response.url,req:req[response.url],res:response});
						}else{
							console.log(response.url);
						}
					}
					/*
					if(response.url in req){
						console.log("response:"+response.url);
						socket.emit('res',response.url);
					}else{
						console.log(response.url);
					}
					*/
				},
				function(ele){
					socket.emit('click',{ele:ele});
				});
			}catch(err){
				res.send(err);	
			}
			
		}else{
			var err={code:404,err:"url must be input to check."};
			console.log(err);
			socket.emit('finish',err);
		}
	});
}