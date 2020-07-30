
$(document).ready(function () {
	$(".call__call-back_js").on("click", function () {
        $('.sale_popup').show();
        
        $(".sale_popup").find(".sale__button").on('click', function(){
            $('.sale_popup').hide();
        });
	});
});
(function () {

	$('.burger').on('click', function () {
		$('.menu').fadeToggle(150);
		$(this).toggleClass('burger__close');
	});

	$(window).scroll(function () {
		if ($(window).width() < 768) {
			var scrolled = $(window).scrollTop();

			if (scrolled > 100) {
				$('.menu').slideUp(150);
				$('.burger').removeClass('burger__close');
			}
		}

	});

})();

(function () {

	var menu = $('.menu');
	var link = $('.menu__link');
	var menuPos = menu.position().top + 'px';
	$(window).scroll(function () {

		if ($(window).width() > 767) {
			

			var scrolled = $(window).scrollTop();
			var headerHeight = $('.header').height();


			if (scrolled > headerHeight) {
				menu.addClass('menu_scroll');
			} else {
				menu.removeClass('menu_scroll');
			}

			if (scrolled > (headerHeight - 100) && scrolled > scrollPrev) {
				menu.addClass('menu_out');
			} else {
				menu.removeClass('menu_out');
			}

			if (scrolled > 200) {
				menu.css({
					'top': '0'
				});
			} else {
				menu.css({
					'top': menuPos
				});
			}

			scrollPrev = scrolled;
		}
	});

})();

$(document).ready(function () {
	$(".menu__item_main_js").on("click", "a", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({
			scrollTop: top
		}, 1000);
	});
});

ymaps.ready(function () {
	var myMap = new ymaps.Map("map", {
		center: [55.184901, 61.290183],
		controls: ['geolocationControl'],
		zoom: 15,
	});

	var myPlacemark = new ymaps.GeoObject({
		geometry: {
			type: "Point",
			coordinates: [55.184901, 61.290183]
		},
		properties: {
			iconCaption: 'Авантаж',
			balloonContent: 'Челябинск, ул.Чичерина, д.15',
		}
	});

	myMap.geoObjects.add(myPlacemark);
});

$(document).ready(function() {

    var firstItem = $('.accordeon__item:eq(0)');
    var firstButton = $(firstItem).find('.accordeon__button');
    var firstAnswer = $(firstItem).find('.accordeon__answer');

    firstAnswer.slideDown();
    firstButton.text('-');
    firstButton.css({'background-color' : '#FCD720'});


	$('.accordeon__button').on('click', function () {

        var wrap = $(this).next('.accordeon__wrap');
        var answer = $(wrap).find('>.accordeon__answer');
        var accordeon = $(this).closest('.accordeon');
        var otherAnswers = accordeon.find('>.accordeon__item>.accordeon__wrap>.accordeon__answer');
        var otherButtons = accordeon.find('>.accordeon__item>.accordeon__button');

        if (answer.is(':visible')) {
            answer.slideUp();
            $(this).text('+');
            $(this).css({'background-color' : '#fff'});

        } else {
            otherAnswers.slideUp();
            otherButtons.text('+');
            otherButtons.css({'background-color' : '#fff'});
            answer.slideDown();
            $(this).text('-');
            $(this).css({'background-color' : '#FCD720'});
        }

	});
});

(function () {


	function carousel(setting) {

		/* Scope privates methods and properties */
		let privates = {};
		let reset = false;

		/* Privates properties */
        privates.setting = setting;
        
		privates.sel = {
			"main": privates.setting.main,
			"wrap": privates.setting.wrap,
			"children": privates.setting.wrap.children,
			"prev": privates.setting.prev,
			"next": privates.setting.next
        };
        
        let wrapLength = privates.sel.children.length;

		privates.opt = {
			"position": 0,
			"max_position": wrapLength
		};

		// Control
		if (privates.sel.prev !== null) {
			privates.sel.prev.addEventListener('click', () => {
				this.prev_slide();
				reset = true;
			});
		}

		if (privates.sel.next !== null) {
			privates.sel.next.addEventListener('click', () => {
				this.next_slide();
				reset = true;
			});
		}

		this.prev_slide = () => {
			--privates.opt.position;

			if (privates.opt.position < 0) {
				privates.sel.wrap.classList.add('s-notransition');
				privates.opt.position = privates.opt.max_position - 1;
			}

			privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
		};


		// Next slide
		this.next_slide = () => {
			++privates.opt.position;

			if (privates.opt.position >= privates.opt.max_position) {
				privates.opt.position = 0;
			}

			privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
		};

	}


	var cards = document.querySelectorAll('.gallery__card');

    for (let i = 0; i < cards.length; i++) {
        writeData(cards[i]);
    }

	function writeData(card) {
        let main = card.querySelector('.gallery__viewport')
        let wrap = card.querySelector('.gallery__slider');
        let prev = card.querySelector('.gallery__svg_arrow_l');
        let next = card.querySelector('.gallery__svg_arrow_r');

        new carousel({
            "main": main,
            "wrap": wrap,
            "prev": prev,
            "next": next
        });
	}
	



})();

$(function(){
    $(".sale__phone").mask("+7 (9 9 9) 9 9 9-9 9-9 9");


    $('.sale__name').on('keypress', function() {
      var that = this;
  
      setTimeout(function() {
          var res = /[^а-яА-Я]/g.exec(that.value);
          that.value = that.value.replace(res, '');
      }, 0);
  });
  });

  
$(document).ready(function () {

	function checkQuantity(val, arrow) {
		if (val == 1 || val == 99) {
			$(arrow).addClass('calculator__svg_uncurrent');
		} else {
			$('.calculator__svg').removeClass('calculator__svg_uncurrent');
		}
	}

	var quantity = $('.calculator__room').val();

	$('.calculator__arrow-l_js').on('click', function () {
		if (quantity > 1) {
			--quantity;
			$('.calculator__room').val(quantity);
		}

		checkQuantity(quantity, this);
	});

	$('.calculator__arrow-r_js').on('click', function () {
		if (quantity < 99) {
			++quantity;
			$('.calculator__room').val(quantity);
		}

		checkQuantity(quantity, this);
	});

	$('.calculator__svg').on('mousedown', function () { //remove click selection
		return false;
	});


	$(function () {
		$(".calculator__phone").mask("+7 (9 9 9) 9 9 9-9 9-9 9");


		$('.calculator__user').on('keypress', function () {
			var that = this;

			setTimeout(function () {
				var res = /[^а-яА-Я]/g.exec(that.value);
				that.value = that.value.replace(res, '');
			}, 0);
		});
	});

});

$(document).ready(function () {

	$('.to-action__button').on('click', function () {
		$('.calculator').show();
        $('.to-action').hide();
        
        if ($(window).width() < 769) {
            $('.bar').hide();
            $('.burger').hide();
        }


        $('.calculator__close').on('click', function(){
            $('.calculator').hide();
            $('.to-action').show();

            if ($(window).width() < 769) {
                $('.bar').show();
                $('.burger').show();
            }
        });

        $(window).scroll(function(){
            var scrolled = $(window).scrollTop();
            var header = $('.header').height();
    
            if(scrolled>header) {
                $('.calculator').slideUp();
                $('.to-action').slideDown();

                if ($(window).width() < 769) {
                    $('.bar').show();
                    $('.burger').show();
                }
            }
        });
	});

});

(function () {


	function carousel(setting) {

		/* Scope privates methods and properties */
		let privates = {};
		let reset = false;

		let crs = this;


		/* Privates properties */
		privates.setting = setting;

		privates.sel = {
			"main": document.querySelector(privates.setting.main),
			"wrap": document.querySelector(privates.setting.wrap),
			"children": document.querySelector(privates.setting.wrap).children,
			"prev": document.querySelector(privates.setting.prev),
			"next": document.querySelector(privates.setting.next)
		};

		privates.opt = {
			"position": 0,
			"max_position": document.querySelector(privates.setting.wrap).children.length
		};

		// Control
		if (privates.sel.prev !== null) {
			privates.sel.prev.addEventListener('click', () => {
				this.prev_slide();
				reset = true;
			});
		}

		if (privates.sel.next !== null) {
			privates.sel.next.addEventListener('click', () => {
				this.next_slide();
				reset = true;
			});
		}

		this.prev_slide = () => {
			--privates.opt.position;

			if (privates.opt.position < 0) {
				privates.sel.wrap.classList.add('s-notransition');
				privates.opt.position = privates.opt.max_position - 1;
			}

			privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
		};


		// Next slide
		this.next_slide = () => {
			++privates.opt.position;

			if (privates.opt.position >= privates.opt.max_position) {
				privates.opt.position = 0;
			}

			privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
		};



		$(window).resize(function () {
			if (reset && $(window).width() > 1023) {
				privates.sel.wrap.style["transform"] = `translateX(0%)`;
				privates.opt.position = 0;
			}
		});


		//swipe

	}



	new carousel({
		"main": ".services",
		"wrap": ".services__wrap",
		"prev": ".services__svg_arrow_l",
		"next": ".services__svg_arrow_r"
	});


	$('.services__button').each(function (index, element) {
		$(this).on('click', function () {
			$('.calculator').show();
			$('.services').hide();

			$('.calculator__close').on('click', function () {
				$('.calculator').hide();
				$('.services').show();
			});
		});
	});


})();
//# sourceMappingURL=app.js.map
