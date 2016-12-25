// 小伙子!! 老牛!!
!(function(window,document,$){
	'use strict'
	var globalTimer;
	//模拟默认参数
	var defaultConfig = {
		//轮播部分
		carousel : {
			'effect' : 'none',
			'easing' : 'easeBoth',
			'interval' : 3,
			'triggerType' : 'mouse',
			'activeIndex' : 0,
			'duration' : 0.5,
			'autoplay' : true,
			'nextBtnCls':'next',
			'prevBtnCls' : 'prev',
			'activeTriggerCls' : 'active',
			'navCls' : 'tab-list',
			'contentCls':'container-item',
		},
		//老牛插件部分 
		cowPlug:{
			'panel' : '#cow-panel',
			'first' : true,
			'input' : ['effect','triggerType','easing','interval','duration'],
			'screenHeight' : 380,
			'msg' : {
				'welcome' : '欢迎你又回来了',
				'add': '你增加了一张小图,赶紧添加链接吧',
				'dis' : '你好6,竟然删了一张小图',
				'foucsError' : '搞毛,你还没选图',
				'foucsSucess' : '干的漂亮,请添加链接',
				'srcError' : '图片链接有问题,我不给你加,你查查',
				'hrefError' : '链接地址有问题,我不给你加,你查查',
				'hrefSucess' : '恭喜你,链接都加上,可以提交了',
				'sub' : '新轮播已激活,满意后点击【代码】获取',
				'code' : '你已经获取到了代码,别忘记保存哦!',
				'save' : '保存成功咯,欢迎下次再来,bye~'
			},
			'easing' : {
				'easeBoth' : '0.47,0.46,0.82,0.82',
				'easeIn' : '0.63, 0.32, 0.81, 0.61',
				'easeOut' : '0.3,0.39,0.8,1.06',
				'easeOutStrong' : '0.17,0.6,0.52,0.95',
				'easeBothStrong' : '0.71,0.05,0.41,0.95',
				'easeInOutBack' : '0.48,0.47,0.41,-0.64',
				'backOut' : '0.42,1.64,0.17,0.16',
				'elasticOut' : '0,1.81,1,-0.99'
			} 
		}
	};

	/*******************************

			模拟淘宝轮播插件
			类型:父类

	********************************/
	function xiaohuo(){
		alert(cao)
	}
	//轮播构造函数
	function CowCarousel(carousel,option,height){
		this._obj = carousel;
		this._height = height;
		this._option = $.extend('deep',defaultConfig.carousel,option);
		this._nowIndex = this._lastIndex = this._option.activeIndex;  
		this.config(this._option);
	};
	//轮播构造函数原型
	CowCarousel.prototype = {
		//构造器名
		_constructor : 'CowCarousel',
		//配置参数
		config : function(op){
			this._container = this.fn.getObj(op.contentCls,this._obj);
			this._img = this._container.children();
			this._length = this._img.length;
			this._prev = this.fn.getObj(op.prevBtnCls,this._obj);
			this._next = this.fn.getObj(op.nextBtnCls,this._obj);
			this._active = op.activeTriggerCls;
			this._tab = this.fn.getObj(op.navCls).children();
			this._tab.eq(this._nowIndex).addClass(this._active).siblings().removeClass(this._active);
			this._constructor != 'CowCarousel' && this.init();
			this.handler(op.triggerType.replace(/mouse/,'mouseenter'),eval(op.duration*1000));
		},
		//事件处理
		handler : function(event,duration){
			var This = this;
			//tab按键事件
			this._tab.off().on(event,function(){
				if (This._nowIndex == $(this).index()) return;
				This._nowIndex = $(this).index();
				This.move(duration,This._option.easing);
				This.tabFn();
			});
			//右按键事件
			this._next.off().on('click',function(){
				This._nowIndex++;
				This._nowIndex%=This._length;
				This.move(duration,This._option.easing);
				This.tabFn();
			});
			//左按键事件
			this._prev.off().on('click',function(){
				This._nowIndex = (This._nowIndex == 0)?This._length-1:--This._nowIndex;
				This.move(duration,This._option.easing);
				This.tabFn();
			});
			//自动轮播事件
			if (this._option.autoplay !== true) return; 
			this.autoplay(This,duration);
			this._obj.off().hover(function(){
				globalTimer && clearInterval(globalTimer);
			},function(){
				This.autoplay(This,duration,This._option.easing);
			});

		},
		//tab事件
		tabFn : function(){
			this._tab.eq(this._nowIndex).addClass(this._active);
			this._tab.eq(this._lastIndex).removeClass(this._active);
			this._lastIndex = this._nowIndex;
		},
		//自动轮播
		autoplay : function(This,duration,easing){
			globalTimer && clearInterval(globalTimer);
			globalTimer = setInterval(function(){
				This._nowIndex++;
				This._nowIndex%=This._length;
				This.move(duration,easing);
				This.tabFn();
			},this._option.interval*1000);
		},
		//公用函数
		fn : {
			//获取obj
			getObj : function(name,parent){
				name = new RegExp(/^[\\.\\#]/).test(name)?name:'.' + name;
				return this.typeString(name)?$(name,parent):name.nodeType == 1?$(name):null;
			},
			//判断字符串
			typeString : function(string){
				return 'string' == typeof(name);
			}
		}
	};

	/*******************************

			无效果类轮播
			类型:子类
			继承:模拟淘宝轮播插件

	********************************/

	//无效果类构造函数
	function CowDisplay(carousel,option,height){
		CowCarousel.call(this,carousel,option,height);
	};
	//无效果类构造函数原型	
	CowDisplay.prototype = $.extend('deep',CowCarousel.prototype,{
		//构造器名
		_constructor : 'CowDisplay',
		//初始化
		init : function (){
			this._img.eq(this._nowIndex).css('display','block').siblings().css('display','none');
		},
		//移动
		move : function(){
			this._img.eq(this._nowIndex).css('display','block');
			this._img.eq(this._lastIndex).css('display','none');
		}
	});

	/*******************************

			淡入淡出轮播
			类型:子类
			继承:模拟淘宝轮播插件

	********************************/

	//淡入淡出类构造函数原型
	function CowFade(carousel,option,height){
		CowCarousel.call(this,carousel,option,height);
	};
	//淡入淡出类构造函数原型	
	CowFade.prototype = $.extend('deep',CowCarousel.prototype,{
		//构造器名
		_constructor : 'CowFade',
		//初始化
		init : function (){
			this._container.css({'position':'relative','width':1920,'height':this._height,'left':0,'top':0});
			this._img.css({'display':'block','position':'absolute'});
			this._img.eq(this._nowIndex).css('z-index','9').siblings().css('opacity',0);
		},
		//移动
		move : function(duration,easing){
			this._img.eq(this._nowIndex).css('z-index',9).stop().animate({'opacity':'1'},duration,easing);
			this._img.eq(this._lastIndex).stop().animate({'opacity':'0'},duration,easing,function(){
				$(this).css('z-index',1);
			});
		}
	});

	/*******************************

			左右滚动轮播
			类型:子类
			继承:模拟淘宝轮播插件

	********************************/

	//scrollx类构造函数
	function CowScrollX(carousel,option,height){
		CowCarousel.call(this,carousel,option,height);
	};
	//scrollx类构造函数原型	
	CowScrollX.prototype = $.extend('deep',CowCarousel.prototype,{
		//构造器名
		_constructor : 'CowScrollX',
		//初始化
		init : function (){
			this._size  = 1920;
			this._container.css({'position':'absolute','width':this._length*this._size,'height':this._height,'left':this._size*this._nowIndex,'top':0});
			this._img.css({'position':'relative','float':'left','opacity':1});
		},
		//移动
		move : function(duration,easing){
			var This = this;
			this._container.stop().animate({'left':-1*this._nowIndex*this._size},duration,easing);
		}
	});

	/*******************************

			上下滚动轮播
			类型:子类
			继承:模拟淘宝轮播插件

	********************************/

	//scrolly类构造函数
	function CowScrollY(carousel,option,height){
		CowCarousel.call(this,carousel,option,height);
	};
	//scrolly类构造函数原型	
	CowScrollY.prototype = $.extend('deep',CowCarousel.prototype,{
		//构造器名
		_constructor : 'CowScrollY',
		//初始化
		init : function (){
			this._size  = this._height;
			this._container.css({'position':'absolute','width':1920,'height':this._length*this._size,'left':0,'top':this._size*this._nowIndex});
			this._img.css({'position':'relative','height':this._height,'float':'auto','opacity':1});
		},
		//移动
		move : function(duration,easing){
			var This = this;
			this._container.stop().animate({'top':-1*this._nowIndex*this._size},duration,easing);
		}
	});

	/*******************************

			主体插件部分
			类型:父类

	********************************/

	//老牛插件构造函数
	function CowChange(obj,option){
		this._code = obj;
		this._option = $.extend(true,'deep',defaultConfig.cowPlug,option);
		this.config(obj);
	}
	//老牛插件原型
	CowChange.prototype = {
		//构造器名
		_constructor : 'CowChange',
		//配置参数
		config : function(obj){
			this._carousel = this.fn.getObj('.J_TWidget');
			this._head = $(this._option.head);
			this._srcShow = this._head.find('.src');
			this._hrefShow = this._head.find('.href');
			this._codeWrapper = this._head.find(this._option.codeWrapper);
			this._btn = this._head.find(this._option.btn).children();
			this._panel = this.fn.getObj(this._option.panel);
			this._container = this._panel.find(this._option.container);
			this._nav = this.fn.getObj(this._option.nav);
			this._input = this._panel.find('.cow-input');
			this._img = this._carousel.find('.p-img');
			this._src = this.fn.getAttr(this._img,'src');
			this._href = this.fn.getAttr(this._img.parent(),'href');
			this._msg = new Msg(this._option.dialog,true);
			this.init(this._carousel);
		},
		//初始化
		init : function(carousel){
			this.carouselShunt(carousel);
			this._showPlane = new ShowPlane(this._srcShow,this._hrefShow,this._container,this._msg,this._src,this._href,this._img.length);
			this._navPlane = new NavPlane(this._srcShow,this._hrefShow,this._nav,this._msg)
			this.handler();
			this._msg.println(defaultConfig.cowPlug.msg.welcome,true);
			this.stopLink(this._nav);
		},
		//分流轮播
		carouselShunt : function(carousel){
			var option = eval('(' + carousel.data('widget-config') + ')'),
				key = defaultConfig.cowPlug.input;
				$.each(this._input,function(i){
					$(this).val(option[key[i]]);
				});
				this._carousel.cowBanner.call(this,this._carousel,option.effect);
		},
		//btn事件处理
		handler : function(){
			var This = this,
				msg = defaultConfig.cowPlug.msg;
			//右上角功能按键事件
			this._btn.on('click',function(){
				switch($(this).data('fn')){
					case'link': 
						This.fc.link(This,msg);
						break;
					case'save': 
						This.fc.save();
						This._msg.println(msg.save,true);
						break;
					case'sub': 
						This.fc.sub.call(This,msg);
						break;
					case'code': 
						This.fc.code.call(This,this);
						This._msg.println(msg.code,true);
						break;
				}
			});
			//点击复制
			this._codeWrapper.find('textarea').on('click',function(){
				this.select();
				document.execCommand("Copy");
				alert("已复制好，可贴粘。");
			})
		},
		//dom节点重组
		domRebulid : function(src,href,effect,duration,easing){
			var str1 = '',
				str2 = '',
				item = this._carousel.find('.container-item'),
				list = this._carousel.find('.tab-list'),
				length = this._showPlane.fn.getLength.call(this._showPlane),
				bool = false,i;
			if(effect == 'fade' || effect == 'scrollx' || effect == 'scrolly'){
				for (i=0;i<length;i++){
					str1+='<li><div class="previewer-container previewer-'+i+'"><a href="'+href[i]+'" target="_blank"><img class="p-img" src="'+src[i]+'" /></a></div></li>';
					str2+='<li class="list-1 active"><div class="tab"><img src="'+src[i]+'" /></div></li>'
				};
			}else if(effect == 'drawback'){
				for (i=0;i<length;i++){
					str1+='<li></li>';
					str2+='<li class="drawback list-'+i+' active"><div class="tab"><img src="'+src[i]+'" /></div><div class="previewer-container" style="transition-duration:'+duration+'s; transition-timing-function:cubic-bezier('+defaultConfig.cowPlug.easing[easing]+');"><a href="'+href[i]+'" target="_blank"><img class="p-img" src="'+src[i]+'" /></a></div></li>'
				};
				bool = !bool;
			}else if(effect == 'shades'){
				for(i=0;i<length;i++){
					var strList = [];
					for(var j=0;j<10;j++){
						strList.push("<div class='l'><div class='b b"+ j +"' style = 'background:url("+src[i]+") 0 "+ j*(-38) +"px;transition-duration:"+duration+"s;'></div></div>");
					}
					str1+='<li></li>';
					str2+="<li class='shades list-"+i+" active'><div class='tab'><img src='"+src[i]+"' /></div><a href='"+href[i]+"' target='_blank'><div class='"+  easing +" previewer-container'>"+ strList.join('') +"</div><img class='p-img' style='display:none;' src="+src[i]+"></li>"
				}
				bool = !bool;
			}
			this.carouselPos.call(this,item,list,str1,str2,length,bool);
		},
		//轮播布局特殊处理
		carouselPos : function(item,list,str1,str2,length,bool){
			var width = length * 143,
				left = Math.max(Math.floor((1856-width)/2),636);
			item.empty().append(str1);
			list.empty().append(str2).parent().css({'width':width,'left':left,'margin-left':0});
			if(!bool) return;
			$.each(list.find('.previewer-container'),function(i){
				$(this).css('left',((-143*i)-left-38));
			})
		},
		//停止链接
		stopLink : function(dom){
			var href = dom[0].getElementsByTagName('a'),
				length = href.length,i;
			for(i=0;i<length;i++){
				href[i].onclick = function(e){
					return false;
				};
			}
		},
		//各类功能事件
		fc : {
			//加链接按钮
			link : function(This,msg){
				$('body').data('target')?This._showPlane.addLink(msg):This._navPlane.addLink(msg);
			},
			//保存按钮
			save : function(){
				var data = document.getElementsByTagName('html')[0].outerHTML.replace(/&quot;/g,"'"),
					time = new Date().toLocaleString(),
					name = timeStr(time.substr(0,10).replace(/\//g,'-'));			
				export_raw(name+'.html',data);	
				function export_raw(name, data) {
				   var urlObject = window.URL || window.webkitURL || window,
				  	   export_blob = new Blob([data]),
				   	   save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
				   save_link.href = urlObject.createObjectURL(export_blob);
				   save_link.download = name;
				   fake_click(save_link);
				};
				function fake_click(obj) {
				    var ev = document.createEvent("MouseEvents");
				    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				    obj.dispatchEvent(ev);
				};
				function timeStr(value){
					return value.replace(/\s[\u4e00-\u9fa5]/g,"");
				}
			},
			//提交按钮
			sub : function(msg){
				var This = this,
					option = $.extend({},defaultConfig.carousel),
					key = defaultConfig.cowPlug.input,
					li = this._showPlane._containerLi,
					src = new Array(),
					href = new Array();
				$.each(li,function(){
					src.push($(this).attr('data-src'));
					href.push($(this).attr('data-href'));
				});
				$.each(this._input,function(i){
					if($(this).val()) option[key[i]] = $(this).val();
				});
				this.domRebulid(src,href,option.effect,option.duration,option.easing);
				this._carousel.attr('data-widget-config',JSON.stringify(option)).cowBanner.call(this,this._carousel,option.effect,option);
				if(!defaultConfig.cowPlug.first) this._msg.println(msg.sub,true);
			},
			//获取代码按钮
			code : function(btn){
				if(!btn.className){
					$(btn).addClass('active');
					this._codeWrapper.addClass('active');
				}else{
					$(btn).removeClass('active');
					this._codeWrapper.removeClass('active');
				};
			},
			//消息提示
			msg : function(This,str){
				This._dialog.animate({'right':180,'opacity':0},300,function(){
					$(this).animate({'right':142,'opacity':1},300).find('p').text(str);
				});
			}
		},
		//公用函数
		fn : {
			//配置字符串处理
			doStr : function(str){
				if(!this.typeString(str)) return;
				var hashMap = new Object,
					arrayList = str.split(',');
				for(var i in arrayList){
					var keyValue = arrayList[i].split(':'); 
					hashMap[keyValue[0]] = keyValue[1];
				};
				return hashMap;
			},
			//获取src
			getAttr : function(dom,attr){
				var arrayList = []
				$.each(dom,function(){
					arrayList.push($(this).attr(attr));
				})
				return arrayList;
			},
		},
	};

	CowChange.prototype.fn.getObj = CowCarousel.prototype.fn.getObj;
	CowChange.prototype.fn.typeString = CowCarousel.prototype.fn.typeString;

	/*******************************

			填加链接组件
			类型:父类

	********************************/

	//增加组件构造函数
	function LinkedObject(srcShow,hrefShow,container,msg){
		this.init(srcShow,hrefShow,container,msg);
	};

	//增加组件构造函数原型
	LinkedObject.prototype = {
		//构造器名
		_constructor : 'LinkedObject',
		//初始化
		init : function(srcShow,hrefShow,container,msg){
			this._srcShow = srcShow;
			this._hrefShow = hrefShow;
			this._container = container;
			this._msg = msg;
			container[0].className == 'sideNav-wrapper' && this.fn.getImgLi.call(this,'img');
		},
		//共同事件处理
		exe : function(This){
			var msg = defaultConfig.cowPlug.msg; 
			//点击更换焦点
			this._containerLi.on('mousedown',function(ev){
				focus.call(this,ev);
			});
			$('.add',this._container).on('mousedown',function(ev){
				focus.call($(this).find('img'),ev);
			});
			function focus(ev){
				This.focus.call(this,This);
				This._constructor == 'ShowPlane' && This.drug.call(this,This,ev);
			}
		},
		//功能函数
		fn : {
			//获取长度
			getLength : function(){
				return this._length;
			},
			//获取/重置小图数组
			getImgLi : function(type){
				this._containerLi = this._container.find(type);
				this._containerDis = this._containerLi.find('span');
				this._length = this._containerLi.length;
			},
			//判断链接准确性
			linkJud : function(value,type){
				var regExp1 = /^\/\//,
					regExp2 = /\/\//,
					regExp3 = /(.jpg)$/,
					bool = regExp2.test(value),
					newStr = regExp1.test(value)?'https:' + value:value;
				if(type == 'src') newStr = regExp3.test(newStr)?newStr:newStr+'.jpg';
				return [newStr,bool];
			},
			//判断是否加焦点
			activeJud : function(name){
				return (this._container.find(name).length == 0)? false:true;
			},
			//获取input信息
			getInputData : function(msg,This){
				var src = this.linkJud(This._srcShow.val(),'src'),
					href = this.linkJud(This._hrefShow.val(),'href');
				if(!src[1]){		
					This._msg.println(msg.srcError,true);
					alert('看我说的！');
					throw new Error('your src miss //');
					return; 
				}
				if(!href[1]){
					This._msg.println(msg.hrefError,true);
					alert('看我说的！');
					throw new Error('your href miss //');
					return; 
				} 
				return {src : src[0],href : href[0]};
			},
			//判断字符串
			typeString : CowCarousel.prototype.fn.typeString,
		}
	};

	/*******************************

			链接组件小图
			类型:子类
			继承:链接组件

	********************************/

	//链接组件小图构造函数
	function ShowPlane(srcShow,hrefShow,container,msg,src,href,imgLength){
		LinkedObject.call(this,srcShow,hrefShow,container,msg);
		this._src = src;
		this._href = href;
		this._addImg = this._container.next();
		this.handler(imgLength);
		this.exe(this);
	}; 

	//链接组件小图原型
	ShowPlane.prototype = $.extend('deep',LinkedObject.prototype,{
		//构造器名
		_constructor : 'ShowPlane',
		//处理事件
		handler : function(length){
			var This = this,
				msg = defaultConfig.cowPlug.msg; 
			this._showPlane(length);
			//增加小图按钮
			this._addImg.on('click',function(){
				This._containerLi.removeClass('active');
				This.addPic(This,msg);
				This._msg.println(msg.add,true);
			});
			//消除小图按钮
			this._containerDis.on('click',function(){
				This.delet.call($(this),This);
				This._msg.println(msg.dis,true);
			});
			//图片src焦点
			this._srcShow.on('focus',focusFn);
			//链接href焦点
			this._hrefShow.on('focus',focusFn);
			//处理焦点
			function focusFn(){
				if($('body').data('target') !== void 0) return;
				var bool = This.fn.activeJud.call(This,'.active');
				if(bool){
					This._msg.println(msg.foucsSucess,true);
				}else{
					This._msg.println(msg.foucsError,true);
					alert('看我说的！')
					throw new Error('please choose pic first');
				}
			};
		},
		//小图显示
		_showPlane : function(length){
			var str = '';	
			for(var i=0;i<length;i++){
				str+= '<li data-src="'+this._src[i]+'" data-href="'+this._href[i]+'" style="left:'+(i*160)+'px"><div class="perview-container"><img draggable="false" src='+this._src[i]+' /></div><span></span></li>'
			};
			this._container.empty().append(str).css('width',length*160);
			this.fn.getImgLi.call(this,'li');
		},
		//增加小图
		addPic : function(This,msg){
			var $li = $('<li class=\'active\'>').css('left',This._length*160),
				$div = $('<div>').attr('class','perview-container'),
				$span = $('<span>'),
				img = new Image(),
				self = this;
			img.src = 'image/1.jpg';
			img.draggable = false;
			img.onload = function(){
				$span.appendTo($li);
				$div.append(img).appendTo($li);
				This._container.append($li);
			};
			This._container.animate({'width':(This._length+1)*160},function(){
				This.fn.getImgLi.call(This,'li');
			});
			$('body').data('target',1);
			this._srcShow.val('');
			this._hrefShow.val('');
			$li.on({
				'mousedown':function(ev){self.drug.call(this,This,ev,msg)},
				'click':function(){self.focus.call(this,This)}
			});
			$span.on('click',function(){
				self.delet.call($(this),This);
				This._msg.println(msg.dis,true);
			});
		},
		//焦点事件
		focus : function(This){
			$(this).addClass('active').siblings().removeClass('active');
			This._srcShow.val($(this).attr('data-src'));
			This._hrefShow.val($(this).attr('data-href'));
			$('body').data('target',1);
			This._msg.println('目标第'+($(this).index()+1)+'张图,请加链接',false);
		},
		//消除小图
		delet : function(This){
			var i = $(this).parent().index(),
				$p = $(this).parent();
			$.each($p.nextAll(),function(){
				$(this).animate({'left':($(this).index()-1)*160});
			});
			$p.remove();
			This.fn.getImgLi.call(This,'li');
			This._container.animate({'width':(This._length)*160});
		},
		//小图挪动事件
		drug : function(This,ev,msg){
			var $obj = $(this),	
				stX = ev.pageX,
				objX = $(this).index()*160,
				self = This._fc,
				lastI = $(this).index(),
				lastX = stX,
				maxLength = (This._length-1)*160,
				stTime = new Date(),
				nowI;
			$(window).on('mousemove',function(ev){
				var pageX = ev.pageX,
					moveX = pageX - stX,
					nowX = Math.min(Math.max(objX + moveX,0),maxLength),
					minsX = pageX - lastX;
					nowI = parseInt(nowX/160);
				ev.stopPropagation();
				$obj.css({'left':nowX,'z-index':2});
				if (lastI != nowI){	
					if(minsX>0){
						$obj.next().stop().animate({'left':(nowI-1)*160});
						$obj.insertAfter($obj.next());
					}else{
						$obj.prev().stop().animate({'left':(nowI+1)*160});
						$obj.insertBefore($obj.prev());
					}
					lastX = pageX;
					lastI = nowI;
				};
			}).on('mouseup',function(){
				var plusTime = new Date() - stTime,
					res = echo(plusTime);
				$(this).off('mousemove')
				$obj.stop().animate({'left':nowI*160}).css('z-index',1);
				This.fn.getImgLi.call(This,'li');
				if(res && This.fn.typeString(res)) This._msg.println('本次移动花费'+ (plusTime/1000).toFixed(2) +res);
				$(this).off('mouseup');
			});
			//判定手速
			function echo(t){
				if(t<150){
					return false;
				}else if(t>=150&&t<500){
					return '秒,手速堪比千年污妖王';
				}else if(t>=500&&t<1200){
					return '秒,手速一般般';
				}else if(t>=1200&&t<2000){
					return '秒,手速太慢了';
				}else if(t>=2000){
					return '秒,老年人了吧';
				}
			};	
		},
		//添加链接
		addLink : function(msg){
			var inputData = this.fn.getInputData(msg,this);
			this._containerLi.filter('.active').attr({'data-src':inputData.src,'data-href':inputData.href}).find('img').attr('src',inputData.src);
			this._msg.println(msg.hrefSucess,true);
		},
	});
	
	/*******************************

			链接组件侧导航
			类型:子类
			继承:链接组件

	********************************/

	//链接侧导航构造函数
	function NavPlane(srcShow,hrefShow,container,msg){
		LinkedObject.call(this,srcShow,hrefShow,container,msg);
		this._nowFocus = null;
		this.handler();
		this.exe(this);
	};

	//链接侧导航构造函数原型
	NavPlane.prototype = $.extend('deep',LinkedObject.prototype,{
		//构造器名
		_constructor : 'NavPlane',
		//处理事件
		handler : function(){
			var This = this;
			//点击弹出侧导航栏
			this._container.find('.category').off().on('click',function(e){
				//if(e.clientX >= 372) return;
				if(e.target.tagName == "DIV") return;
				$(this).toggleClass('active').siblings().removeClass('active');
			})
			//增减图片
			this._containerLi.next().off().on('mousedown',function(){
				$(this).hasClass('none')?This.addPic.call($(this),This.fn.getPar,This):This.delet.call($(this),This.fn.getPar,This);
			})
		},
		//增加小图
		addPic : function(getPar,This){
			var dom = getPar($(this)).addClass('caonima');
			dom.find('span').removeClass('none');
			dom.hasClass('gt-product') && This.focus.call($(this).prev(),This);
		},
		//删除小图
		delet : function(getPar,This){
			var dom = getPar($(this)),
				siblings = null,
				Switch = false;
			if(dom.hasClass('brand-block')){
				siblings = dom.siblings();
				if(dom.index() == 5){
					This.appendAdd(dom);
					Switch = !Switch;
				}
				dom.remove();
				$.each(siblings,function(){
					$(this).index()%2?$(this).removeClass('lt'):$(this).addClass('lt');
				});
				Switch && This.fn.getImgLi.call(This,'img');
				return;
			}
			dom.removeClass('caonima').find('a').removeAttr('href').find('span').addClass('none').prev().removeAttr('src').css('display','none');
			if(dom.index()==2) dom.next().insertBefore(dom);
		},
		//焦点事件
		focus : function(This){
			This._containerLi.removeClass('navActive');
			$(this).addClass('navActive');
			This._srcShow.val($(this).attr('src'));
			This._hrefShow.val($(this).parent().attr('href'));
			$('body').data('target',0);
			This._msg.println('请对变淡的图片或草泥马进行操作',true);
			This._nowFocus = $(this);
		},
		//添加链接
		addLink : function(msg){
			var inputData = this.fn.getInputData(msg,this),
				dom = this.fn.getPar(this._nowFocus),
				str,index;
			this._nowFocus.removeAttr('style').removeClass('navActive').attr('src',inputData.src).parent().attr('href',inputData.href);
			this._msg.println(msg.hrefSucess,true);
			dom.removeClass('caonima');
			if(dom.hasClass('add')){
				index = dom.index();
				str = index%2?'':'lt';
				dom[0].className = 'brand-block ' + str;
				if(index>4) return;
				this.appendAdd(dom);
				this.fn.getImgLi.call(this,'img');
				this.handler();
			} 
		},
		//添加新增加符
		appendAdd : function(dom){
			dom.parent().append("<div class='add'><a href='' target='_blanket'><img style='display:none'/><span class='delete none'></span></a></div>");
		}
	});
	NavPlane.prototype.fn.getPar = function(dom){
		return dom.parent().parent();
	}

	/*******************************

			提示消息类组件
			类型:父类

	********************************/

	//提示消息类构造函数
	function Msg(className,bool){
		this._dialog = this.fn.getObj(className).find('p');
		bool === true && this.init();
		this._user = localStorage.getItem('cowUser');
	};

	//提示消息类构造函数原型
	Msg.prototype = {
		//初始化
		init : function(){
			while(this.fn.textUser()){
				var name = prompt("请填写你的大名");
				localStorage.setItem('cowUser',name);
			}
		},
		//打印
		println : function(str,bool){
			str = bool?this._user + ',' +str:str;
			if(this.fn.typeString(str)) this._dialog.text(str);
		},
		//公用函数
		fn : {
			textUser : function(){
				return localStorage.getItem('cowUser') === null;
			}
		}

	};

	Msg.prototype.fn.getObj = CowCarousel.prototype.fn.getObj;
	Msg.prototype.fn.typeString = CowCarousel.prototype.fn.typeString;

	/*******************************

			jQuery扩展

	********************************/

	$.fn.extend({
		cowChange : function(obj,option){
			if(!arguments.length) return;
			if(obj.data('plugName')!='cowChange') obj.data('plugName','cowChange',new CowChange(obj,option));
		},
		cowBanner : function(obj,str,config){
			var height = defaultConfig.cowPlug.screenHeight;
			switch (str){
				case'shades':
				case'drawback': 
					new CowDisplay(obj,config,height);
					break;
				case'fade': 
					new CowFade(obj,config,height);
					break;
				case'scrollx': 
					new CowScrollX(obj,config,height);
					break;
				case'scrolly': 
					new CowScrollY(obj,config,height);
					break;
			}
			this._codeWrapper.find('textarea').text(this._code.html());
			defaultConfig.cowPlug.first = false;
		}
	});
})(window,document,jQuery);