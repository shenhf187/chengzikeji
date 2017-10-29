$(function() {
	var mySwiper = $('.swiper-container').swiper({
		loop: false,
		speed: 1500,
		mode: 'vertical',
		resistance: '100%',
		mousewheelControl: true,
		pagination : '.pagination',
		paginationClickable :true,
		paginationElement : 'li',
		onFirstInit: function(swiper) { //Swiper2.x的初始化是onFirstInit   Swiper3的初始化是onInit
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		}
	});
	var Back = 0;

	var bgChange = setInterval(BackGround, 2500);
	//换背景的函数
	function BackGround() {
		if(Back == 3) {
			Back = 0;
		}
		
		$('.content1').css('background-color');
		$('.content1 div').removeClass('current-bg');
		$('.content1 div').eq(Back).addClass('current-bg');
		//console.log('test');
		Back++;
		//console.log(Back);
	}
	//划过 app开发 模块时的效果
	$('.content1-app').hover(
		function() {
			clearInterval(bgChange);
			//console.log("划入APP");
			$('.content1 div').removeClass('current-bg');
			$('.app-bg').addClass('current-bg');
			Back = $(this).index() + 1;
		},
		function() {
			//console.log("划出APP");
			setTimeout(function() {
				//console.log("调用定时器");
				clearInterval(bgChange);
				bgChange = setInterval(BackGround, 2500);
			}, 500)
		});
	//划过 weixin开发 模块时的效果
	$('.content1-weixin').hover(
		function() {
			clearInterval(bgChange);
			//console.log("划入微信");
			$('.content1 div').removeClass('current-bg');
			$('.weixin-bg').addClass('current-bg');
			Back = $(this).index() + 1;
		},
		function() {
			//console.log("划出微信");
			setTimeout(function() {
				//console.log("调用定时器");
				clearInterval(bgChange);
				bgChange = setInterval(BackGround, 2500);
			}, 500)
		});
	//划过 pc开发 模块时的效果
	$('.content1-pc').hover(function() {
			clearInterval(bgChange);
			//console.log("划入网页");
			$('.content1 div').removeClass('current-bg');
			$('.pc-bg').addClass('current-bg');
			Back = $(this).index() + 1;
		},
		function() {
			//console.log("划出网页");
			setTimeout(function() {
				//console.log("调用定时器");
				clearInterval(bgChange);
				bgChange = setInterval(BackGround, 2500);
			}, 500)
		});

	//第五屏动态效果
	var canvas = document.getElementById('myCanvas'),
		ctx = canvas.getContext('2d'),
		w = canvas.width = window.innerWidth, //屏幕宽度
		h = canvas.height = window.innerHeight, //屏幕高度
		hue = 217,
		stars = [],
		count = 0,
		maxStars = 1300; //星星数量

	var canvas2 = document.createElement('canvas'),
		ctx2 = canvas2.getContext('2d');
	canvas2.width = 100;
	canvas2.height = 100;
	var half = canvas2.width / 2,
		gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
	gradient2.addColorStop(0.025, '#CCC');
	gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
	gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
	gradient2.addColorStop(1, 'transparent');

	ctx2.fillStyle = gradient2;
	ctx2.beginPath();
	ctx2.arc(half, half, half, 0, Math.PI * 2);
	ctx2.fill();

	// End cache

	function random(min, max) {
		if(arguments.length < 2) {
			max = min;
			min = 0;
		}

		if(min > max) {
			var hold = max;
			max = min;
			min = hold;
		}

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function maxOrbit(x, y) {
		var max = Math.max(x, y),
			diameter = Math.round(Math.sqrt(max * max + max * max));
		return diameter / 2;
		//星星移动范围，值越大范围越小，
	}

	var Star = function() {

		this.orbitRadius = random(maxOrbit(w, h));
		this.radius = random(60, this.orbitRadius) / 8;
		//星星大小
		this.orbitX = w / 2;
		this.orbitY = h / 2;
		this.timePassed = random(0, maxStars);
		this.speed = random(this.orbitRadius) / 50000;
		//星星移动速度
		this.alpha = random(2, 10) / 10;

		count++;
		stars[count] = this;
	}

	Star.prototype.draw = function() {
		var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
			y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
			twinkle = random(10);

		if(twinkle === 1 && this.alpha > 0) {
			this.alpha -= 0.05;
		} else if(twinkle === 2 && this.alpha < 1) {
			this.alpha += 0.05;
		}

		ctx.globalAlpha = this.alpha;
		ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
		this.timePassed += this.speed;
	}

	for(var i = 0; i < maxStars; i++) {
		new Star();
	}

	function animation() {
		ctx.globalCompositeOperation = 'source-over';
		ctx.globalAlpha = 0.5; //尾巴
		ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
		ctx.fillRect(0, 0, w, h)

		ctx.globalCompositeOperation = 'lighter';
		for(var i = 1, l = stars.length; i < l; i++) {
			stars[i].draw();
		};

		window.requestAnimationFrame(animation);
	}

	animation();
})