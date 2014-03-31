AG JS分析代码嵌入说明
=====
*注意事项*
----
* 每个页面应只嵌入一份代码
* 当需要嵌入多份代码时需要确保一个页面只有一份代码运行
* 按钮点击代码可不受上述限制，只需要保证每个按钮只触发一次追踪记录
* 点击按钮（超链接等）如发生跳转应尽量保证嵌入代码有足够的运行时间发出请求记录数据
 1. 可以对超链接添加`target='_blank'` 属性，保证弹出窗口而不是当前窗口跳转
 2. 必须跳转类型应尽量保证点击后跳转前在当页有足够时间进行数据发送
*页面嵌入，到达页面发送*
----
直接在页面中嵌入代码即可。如下：

    <html>
        <head></head>
        <body>
        	[some html content]
		    <!--请将js代码嵌入到html中body标签结束之前。（整个body部分最后边）-->
		    <script type='text/javascript'>
		    var _agt=_agt||[];
		    _agt.push(['_atscu','AG_432045_DROD']);
		    _agt.push(['_atsdomain','$网站主域$']);/*请将$网站主域$替换为您嵌入代码的真实主域，例如：example.com*/
		    (function(){
		    var ag=document.createElement('script'); 
		     ag.type='text/javascript'; 
		     ag.async = true;
		    ag.src=(document.location.protocol=='https:'?'https':'http')+'://'+'t.agrantsem.com/js/ag.js';
		    var s=document.getElementsByTagName('script')[0]; 
		     s.parentNode.insertBefore(ag,s);})();
		    </script>
	    </body>
    </html>

*页面嵌入，点击按钮触发示例：*
---
html页面简单嵌入按钮点击代码后：

    <html>
        <head></head>
        <body>
    		<a href='' id="link" class='classTest'>test</a>
    	    <a href='' id='asd' class='classTest'>classTest</a>
		    <!--请将js代码嵌入到html中body标签结束之前。（整个body部分最后边）-->
		    <script type='text/javascript'>
		    var _agt=_agt||[];
		    function ag_432045_drod_ats101(){
		    _agt=[];
		    _agt.push(['_atscu','AG_432045_DROD']);
		    _agt.push(['_atsdomain','$网站主域$']);/*请将$网站主域$替换为您嵌入代码的真实主域，例如：example.com*/
		    _agt.push(['_atsev','101']);
		    _agt.push(['_atsusr','$用户名$']);/* 请将$用户名$替换为真实的用户名*/
		    (function(){
		    var ag=document.createElement('script'); 
		     ag.type='text/javascript'; 
		     ag.async = true;
		    ag.src=(document.location.protocol=='https:'?'https':'http')+'://'+'t.agrantsem.com/js/ag.js';
		    var s=document.getElementsByTagName('script')[0]; 
		     s.parentNode.insertBefore(ag,s);})();
		    }
		    </script>
	    </body>
    </html>

_需要在上述页面中点击超链接（`id='link'`）时触发上述代码中的函数：_`ag_432045_drod_ats101()`

两种方式：
1. 修改超链接`<a href="" id="link" onclick='ag_432045_drod_ats101();'>test</a>`
2. 对超链接进行动态绑定事件：

__如果按钮（超链接）是动态生成的（如：第三方的聊天工具，商桥、商务通、TQ等）:__
  
1. 可以使用jQuery提供的动态绑定事件的方法`$(document).on('click','selector',function(){ag_432045_drod_ats101();})`;
2. 也可以使用如下函数对元素进行动态绑定点击事件：`_addEvent(document.getElementById('testid'),function(e){ag_432045_drod_ats101();})`，
使用`_addEvent(document.getElementsByClassName('classTest'),function(e){ag_432045_drod_ats101();})`则上述html页面中两个超链接点击都会触发函数`ag_432045_drod_ats101()`

函数代码：

	function _addEvent(nodes,fn){
		var ns=[];
		if(nodes){
			if(nodes instanceof Node){
				ns.push(nodes);
			}else if(nodes instanceof NodeList){
				for(var i in nodes){
					ns.push(nodes[i]);
				}
			}else{
			}
		}
		var handle=function(e){
			var target=e.target || e.srcElement;
			for(var i in ns){
				if(ns[i].contains(target)){
					fn(e);
					break;
				}
			}
		};
		if(document.attachEvent){
			document.attachEvent('onclick',function(e){
				handle(e);
			});
		}else if(document.addEventListener){
			document.addEventListener('click',function(e){
				handle(e);
			});
		}
	}

----
*FAQ:*
----
#####__1. 页面需要嵌入两段代码，如何操作？__
_对其中一段代码加上当前地址的判断，例如`if(window.location.href.indexOf('index.html')==-1){[落地页运行代码]}else{}`_
#####__2. ？__