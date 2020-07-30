$(document).ready(function(){
    $(".bar__side-l").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });
});



function Carousel(setting) {

	/* Scope privates methods and properties */
	let privates = {};

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
	if(privates.sel.prev !== null) {
		privates.sel.prev.addEventListener('click', () => {
			this.prev_slide();
		});
	}

	if(privates.sel.next !== null) {
		privates.sel.next.addEventListener('click', () => {
			this.next_slide();
		});
    }
    
    this.prev_slide = () => {
        --privates.opt.position;
    
        if(privates.opt.position < 0) {
            privates.sel.wrap.classList.add('s-notransition');
            privates.opt.position = privates.opt.max_position - 1;
        }
    
        privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
    };
    
    
    // Next slide
    this.next_slide = () => {
        ++privates.opt.position;
    
        if(privates.opt.position >= privates.opt.max_position) {
            privates.opt.position = 0;
        }
    
        privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
    };

}



new Carousel({
	"main": ".carousel",
	"wrap": ".carousel__wrap",
	"prev": ".cards__arrow_prev",
	"next": ".cards__arrow_next"
});
(function () {

	function current(input, button) {

		if (input.checked) {
			button.classList.add('radio__current');
			checkButton = button;
		}

		input.addEventListener('change', function () {
			checkButton.classList.toggle('radio__current');
			button.classList.toggle('radio__current');
			checkButton = button;
		});

	}

	let radio = document.querySelector('.radio');
	let radioInput = radio.querySelectorAll('.radio__input');
	let radioButton = radio.querySelectorAll('.radio__button');
	let checkButton;


	for (let i = 0; i < radioInput.length; i++) {
		current(radioInput[i], radioButton[i]);
	}
})();

(function () {

	$('.accordion__svg').on('click', function () {

		var findQuestion = $(this).prev('.accordion__answer');
		var findWrapper = $(this).closest('.accordion');
		var findSvg = $(this).closest('.accordion__item').find('.accordion__svg');

		if (findQuestion.is(':visible')) {
			findQuestion.slideUp();
			findSvg.css({
				'transform': 'rotate(0deg) translate(-50%, -50%)'
			});
		} else {
            findWrapper.find('>.accordion__item>.accordion__answer').slideUp();
            findWrapper.find('>.accordion__item>.accordion__svg').css({
				'transform': 'rotate(0deg) translate(-50%, -50%)'
			});
			findQuestion.slideDown();
			$(findQuestion).next('.accordion__svg').css({
				'transform': 'rotate(-90deg) translate(50%, -50%)'
			});
		}
	})
})();
//# sourceMappingURL=app.js.map
