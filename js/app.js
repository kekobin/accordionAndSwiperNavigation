$(function() {
	//整体的导航（menu部分）
	var swiper = new Swiper('.swiper-container');

	$("#menu").on("click", function() {
		$(".swiper-container").css({
			"-webkit-transform": "scale(0.4,0.4)",
			"-moz-transform": "scale(0.4,0.4)",
			"-ms-transform": "scale(0.4,0.4)",
			"-o-transform": "scale(0.4,0.4)",
			"transform": "scale(0.4,0.4)"
		});
	});

	$(".swiper-slide").on("click", function(e) {
		var isCurrent = $(this).hasClass("swiper-slide-active");

		if(isCurrent) {
			$(".swiper-container").css({
				"-webkit-transform": "scale(1,1)",
				"-moz-transform": "scale(1,1)",
				"-ms-transform": "scale(1,1)",
				"-o-transform": "scale(1,1)",
				"transform": "scale(1,1)"
			});
		} else {
			$(this).addClass("swiper-slide-active")
				.siblings().removeClass("swiper-slide-active");
		}

		var prevIndex = $(".swiper-slide-prev").index();
		var nextIndex = $(".swiper-slide-next").index();
		var currentIndex = $(".swiper-slide-active").index();

		$(".swiper-slide-prev").removeClass("swiper-slide-prev");
		$(".swiper-slide-next").removeClass("swiper-slide-next");

		if(currentIndex === prevIndex) {
			$(".swiper-slide").eq(prevIndex-1).addClass("swiper-slide-prev");
			$(".swiper-slide").eq(nextIndex-1).addClass("swiper-slide-next");
		} else {
			$(".swiper-slide").eq(prevIndex+1).addClass("swiper-slide-prev");
			$(".swiper-slide").eq(nextIndex+1).addClass("swiper-slide-next");
		}

		swiper.slideTo(currentIndex, 300);
	});

	//首页
	var myScroll = new IScroll('#firstWrapper', {
		mouseWheel: true
	});

	//accordion part
	$(".ag-content-customer-ele").on("mouseenter mouseleave", function(e) {
		var w = $(this).width();
		var h = $(this).height();
		var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
		var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
		var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
		if (e.type == 'mouseenter') {
			// 0:up - 1:right - 2:down - 3:left
			if (direction == 0) {
				$(this).find('div').css({
					'top': '-470px',
					'left': '0px'
				}).animate({
					'top': 0
				}, {
					queue: false,
					duration: 300
				});
			} else if (direction == 2) {
				$(this).find('div').css({
					'top': '470px',
					'left': '0px'
				}).animate({
					'top': 0
				}, {
					queue: false,
					duration: 300
				});
			} else if (direction == 1) {
				$(this).find('div').css({
					'top': '0px',
					'left': '167px'
				}).animate({
					'left': 0
				}, {
					queue: false,
					duration: 300
				});
			} else if (direction == 3) {
				$(this).find('div').css({
					'top': '0px',
					'left': '-167px'
				}).animate({
					'left': 0
				}, {
					queue: false,
					duration: 300
				});
			}
			$(this).find('span').css('color', '#fff');
			$(this).find('img').animate({
				'left': $(this).find('img').attr('data-hover')
			}, {
				queue: false,
				duration: 200
			});
		} else {
			if (direction == 0) {
				$(this).find('div').animate({
					'top': -470
				}, {
					queue: false,
					duration: 300
				});
			} else if (direction == 2) {
				$(this).find('div').animate({
					'top': 470
				}, {
					queue: false,
					duration: 300
				});
			} else if (direction == 1) {
				$(this).find('div').animate({
					'left': 167
				}, {
					queue: false,
					duration: 300
				});
			} else if (direction == 3) {
				$(this).find('div').animate({
					'left': -167
				}, {
					queue: false,
					duration: 300
				});
			}
			$(this).find('span').css('color', '#262626');
			$(this).find('img').animate({
				'left': $(this).find('img').attr('data-normal')
			}, {
				queue: false,
				duration: 200
			});
		}
	});

	$(".ag-content-customer-ele").on('click', function(e) {
		var navIndex = $(e.target).parent().index();

		$('.ag-content-customer-wrap').css('background-color', '#469acb');

		$('.ag-content-customer-ele').animate({
			'width': 0
		}, 500);

		$('.ag-content-customer-ele-detail').animate({
			'width': 1002
		}, {
			duration: 500,
			complete: function() {
				$('.ag-content-customer-ele-detail ul li').eq(navIndex).click();
			}
		});
	});

	$('.ag-content-customer-ele-detail-return').on('click', function(e) {

		$('.ag-content-customer-wrap').css('background-color', '#f1f1f1');

		$('.ag-content-customer-ele').animate({
			'width': 167
		}, 500);

		$('.ag-content-customer-ele-detail').css('overflow', 'hidden')
			.animate({
				'width': 0
			}, 500);

		$('.ag-content-customer-ele-detail-display').hide();
	});

	$('.ag-content-customer-ele-detail ul li').on('click', function() {

		$('.ag-content-customer-ele-detail ul li').removeClass('current');
		$(this).addClass('current');
		$('.ag-content-customer-ele-detail').css('overflow', 'visible');

		var disIndex = $(this).index();
		$('.ag-content-customer-ele-detail-display').hide().eq(disIndex).show();

		// IE
		if ("ActiveXObject" in window) {
			$('.ag-content-customer-ele-detail-display-left').css({
				'left': '0px',
				'opacity': '1'
			}).eq(disIndex).animate({
				'left': 120
			}, {
				duration: 1000,
				easing: 'easeOutQuint'
			});

			$('.ag-content-customer-ele-detail-display-right').css({
				'right': '-120px',
				'opacity': '1'
			}).eq(disIndex).animate({
				'right': 0
			}, {
				duration: 1000,
				easing: 'easeOutQuint'
			});
		}
	});
});