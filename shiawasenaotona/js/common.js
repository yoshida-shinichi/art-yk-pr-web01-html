$(function(){
	// #で始まるアンカーをクリックした場合に処理
	$('a[href^=#]').click(function() {
		// アンカーの値取得
		var href= $(this).attr("href");
		smoothScroll(href);
		return false;
	});
	function smoothScroll(href){
		// 移動先を取得
		var target = $(href == "#" || href == "" ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top;
		// スムーススクロール
		$('body,html').animate({scrollTop:position}, 600, 'swing');
	};
	
	const $window  = $(window);
	const clickEventType=((window.ontouchstart!==null)?'click':'touchend');
	
	//pc/sp
	var _device = 'pc';
	var _ww = 0;
	let _timer;
	$window.on('load resize',function(){
		if ( _ww != $window.width() ) {
			if ( $('.pc-only').eq(0).is(':visible') ) {
				_device = 'pc';
			} else {
				_device = 'sp';
			}
			clearTimeout(_timer);
			$('.album__slider__arrow').removeClass('-active');
			_timer = setTimeout(function(){
				$('.album__slider__arrow').height( $('.album__slider__item.-item1 .album__slider__thumb').height() ).addClass('-active');
			},2000);
			_ww = $window.width();
		}
	});
	
	//スクロール処理
	function scrollAnim() {
		var sT = $window.scrollTop() + $window.height() * 0.9;
		var count = 0;
		$('.-anim').each(function(i){
			var $this = $(this);
			if ( sT > $this.offset().top && $window.scrollTop() < $this.offset().top) {
				count++;
				TweenMax.fromTo($this , 0.8 , {
					opacity: 0,
					y: 100
				}, {
					opacity: 1,
					y: 0,
					ease: Power2.easeInOut,
					delay: 0.2 * count,
					onComplete: function(){
						$this.removeAttr('style');
					}
				});
				$this.removeClass('-anim');
			}
		});
	};
	
	$window.on('load scroll', function(e){
		scrollAnim();
	});
	
	// album
	const _duration = 0.3;
	$(document).on(clickEventType, '.album__slider__item.-item2', function() {
		albumPrev();
	});
	
	$(document).on(clickEventType, '.album__slider__arrow.-prev', function() {
		albumPrev();
	});
	
	let album = 0;
	
	function albumPrev(){
		if ( _device == 'pc' ) {
			album++;
			if ( album > $('.album__slider__item').length - 1 ) {
				album = 0;
			}
			$('.album__slider__items').append($('.album__slider__item').eq(0));
			$('.album__slider__item').removeClass('-item1');
			$('.album__slider__item').removeClass('-item2');
			$('.album__slider__item').removeClass('-item3');
			$('.album__slider__item').each(function(i) {
				$(this).addClass('-item' + ( i + 1 ));
			});
			TweenMax.fromTo('.album__slider__item.-item1' , _duration , {
				scale: 0.5,
				x: 290,
				y: -160
			}, {
				scale: 1,
				x: 0,
				y: 0,
				ease: Power2.easeInOut
			});
			TweenMax.fromTo('.album__slider__item.-item2' , _duration , {
				x: 250
			}, {
				x: 0,
				ease: Power2.easeInOut
			});
			TweenMax.fromTo('.album__slider__item.-item3' , _duration , {
				x: 250
			}, {
				x: 0,
				ease: Power2.easeInOut
			});
		} else {
			album--;
			if ( album < 0 ) {
				album = $('.album__slider__item').length - 1;
			}
			$('.album__slider__items').prepend($('.album__slider__item').eq(-1));
			$('.album__slider__item').removeClass('-item1');
			$('.album__slider__item').removeClass('-item2');
			$('.album__slider__item').removeClass('-item3');
			$('.album__slider__item').each(function(i) {
				$(this).addClass('-item' + ( i + 1 ));
			});
			TweenMax.fromTo('.album__slider__item.-item1' , _duration , {
				scale: 0.5,
				x: -290
			}, {
				scale: 1,
				x: 0,
				ease: Power2.easeInOut
			});
			TweenMax.fromTo('.album__slider__item.-item3' , _duration , {
				x: -250
			}, {
				x: 0,
				ease: Power2.easeInOut
			});
			TweenMax.fromTo('.album__slider__item.-item2' , _duration , {
				scale: 2,
				x: -250
			}, {
				x: 0,
				scale: 1,
				ease: Power2.easeInOut
			});
		}
		$('.album__bg__item').removeClass('-active').eq(album).addClass('-active');
	};
	
	$(document).on(clickEventType, '.album__slider__item.-item3', function() {
		albumNext();
	});
	
	$(document).on(clickEventType, '.album__slider__arrow.-next', function() {
		albumNext();
	});
	
	function albumNext(){
		if ( _device == 'pc' ) {
			album--;
			if ( album < 0 ) {
				album = $('.album__slider__item').length - 1;
			}
			$('.album__slider__items').prepend($('.album__slider__item').eq(-1));
			$('.album__slider__item').removeClass('-item1');
			$('.album__slider__item').removeClass('-item2');
			$('.album__slider__item').removeClass('-item3');
			$('.album__slider__item').each(function(i) {
				$(this).addClass('-item' + ( i + 1 ));
			});
			TweenMax.fromTo('.album__slider__item.-item1' , _duration , {
				scale: 0.5,
				x: -290,
				y: -160
			}, {
				scale: 1,
				x: 0,
				y: 0,
				ease: Power2.easeInOut
			});
			TweenMax.fromTo('.album__slider__item.-item2' , _duration , {
				scale: 2,
				x: -250,
				y: 160
			}, {
				scale: 1,
				x: 0,
				y: 0,
				ease: Power2.easeInOut
			});
			TweenMax.fromTo('.album__slider__item.-item3' , _duration , {
				x: -250
			}, {
				x: 0,
				ease: Power2.easeInOut
			});
		} else {
			album++;
			if ( album > $('.album__slider__item').length - 1 ) {
				album = 0;
			}
			$('.album__slider__items').append($('.album__slider__item').eq(0));
			$('.album__slider__item').removeClass('-item1');
			$('.album__slider__item').removeClass('-item2');
			$('.album__slider__item').removeClass('-item3');
			$('.album__slider__item').each(function(i) {
				$(this).addClass('-item' + ( i + 1 ));
			});
			TweenMax.fromTo('.album__slider__item.-item1' , _duration , {
				scale: 0.5,
				x: 290
			}, {
				scale: 1,
				x: 0,
				ease: Power2.easeInOut
			});
			TweenMax.fromTo('.album__slider__item.-item3' , _duration , {
				scale: 2,
				x: 250
			}, {
				scale: 1,
				x: 0,
				ease: Power2.easeInOut
			});
			TweenMax.fromTo('.album__slider__item.-item2' , _duration , {
				x: 250
			}, {
				x: 0,
				ease: Power2.easeInOut
			});
		}
		$('.album__bg__item').removeClass('-active').eq(album).addClass('-active');
	};
	
	
	
	var isTouch = ('ontouchstart' in window);
	var _beforeX = 0;
	var _touched = false;
	$('.album__slider__cover').on({
		'touchstart': function(e) {
			this.touchX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
			this.slideX = _beforeX = $(this).position().left;
			// タッチ処理を開始したフラグをたてる
			_touched = true;
		},
		'touchmove': function(e) {
			if (!_touched) return;
			this.slideX = this.slideX - (this.touchX - (isTouch ? event.changedTouches[0].pageX : e.pageX) );
			this.touchX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
		},
		'touchend': function(e) {
			// 過剰動作の防止
			e.preventDefault();
			if (!_touched) return;
			_touched = false;
			var _moveX = _beforeX - this.slideX;
			if (_moveX > 30) {
				albumNext();
			} else if (_moveX < -30) {
				albumPrev();
			}
		}
	});
	$(document).on('mouseup', function(){
		_touched = false;
	});
	
});
