AG JS分析代码嵌入说明
=====
*注意事项*
----
* 每个页面应只嵌入一份代码
* 点击按钮（超链接等）如发生跳转应尽量保证嵌入代码有足够的运行时间发出请求记录数据
 1. 可以对超链接添加`target='_blank'` 属性，保证弹出窗口而不是当前窗口跳转
 2. 必须跳转类型应尽量保证点击后跳转前在当页有足够时间进行数据发送

*嵌入代码示例：*
---
html页面简单嵌入按钮点击代码后：

    <html>
        <head></head>
        <body>
    		<a href='' id="link" class='classTest'>test</a>
    	    <a href='' id='asd' class='classTest'>classTest</a>
		<script>
		  (function(a,b,c,d){a[c]=function(){a[c]['ar']=a[c]['ar']||[];a[c]['ar'].push(arguments);};
		 var s=b.createElement('script');s.async = 1;s.src='//localhost/static/agtrack.js';
		 var r=b.getElementsByTagName('script')[0];r.parentNode.insertBefore(s,r);})();
		 })(window,document,'_agtjs','script')

		 _agtjs('loadEvent',{atsev:102,atssrv:function(){return document.getElementById('asd').innerHTML}}); 

		 _agtjs('clickEvent','#id .class(5) name[5]' handle,'');
		 _agtjs('trackPv');
		 _agtjs('trackCm');
		</script>

	    </body>
    </html>

如上述，_agtjs() 函数，第一个参数为需要追踪的事件类型，之后为事件的各参数，支持的事件：

1. loadEvent(params,filter)

	params  *类型*：Json对象，*key*:参数名，*value*：为传入的参数值，可以为一数值，也可为一有返回值的函数；
	filter:类型与当前页面url进行比较

2. clickEvent:
3. trackPv
4. trackCm


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