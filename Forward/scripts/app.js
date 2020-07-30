(function () {
	'use strcit'

	let parallaxWindow = document.querySelector('.header');
	let parallaxCouple = document.querySelector('.mouse-parallax__bg_couple');
	let parallaxForest = document.querySelector('.mouse-parallax__bg_forest');

	parallaxWindow.addEventListener('mousemove', function (e) {
		const docWidth = document.documentElement.clientWidth;
		const docHeight = document.documentElement.clientHeight;

		let X = e.clientX / docWidth;
		let Y = e.clientY / docHeight;


		parallaxCouple.style.transform = 'translate(-' + (X * 25) + 'px, -' + (Y * 25) + 'px)';
		parallaxForest.style.transform = 'translate(-' + (X * 10) + 'px, -' + (Y * 10) + 'px)';

	});
})();

$(document).ready(function(){
    $(".nav").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
    });
});
(function () {
function isCard(card) {

	
	let day = card.querySelector('.card__value');
	let buttonPlus = card.querySelector('.card__plus');
	let buttonMinus = card.querySelector('.card__minus');
	let premium = document.querySelector('.card__premium');
	let comfort = document.querySelector('.card__comfort');
	let econom = document.querySelector('.card__econom');
	let price = card.querySelector('.card__price-value');
	let buttonAltai = card.querySelector('.card__altai');
	let buttonSwed = card.querySelector('.card__swed');
	let buttonChina = card.querySelector('.card__china');

	addPrice();

	buttonPlus.addEventListener('click', function () {
		let numOfDay = +day.value;

		if (numOfDay < 5) {
			++numOfDay;
			day.value = numOfDay;

			checkActive(numOfDay);

		}
	});

	buttonMinus.addEventListener('click', function () {
		let numOfDay = +day.value;

		if (numOfDay > 1) {
			--numOfDay;
			day.value = numOfDay;
			checkActive(numOfDay);
		}
	});


	function checkActive(day) {
		if (day == 1) {
			buttonMinus.classList.add('card__change_unactive');
		} else if (day == 5) {
			buttonPlus.classList.add('card__change_unactive');
		} else {
			buttonMinus.classList.remove('card__change_unactive');
			buttonPlus.classList.remove('card__change_unactive');
		}
	}

	function addPrice() {

		let costs = {};

		switch (card) {
			case premium:
				costs = {
					Altai: '8 000',
					Swed: '12 000',
					China: '10 000',
				};

				changePrice(costs);
				break;

			case comfort:
				costs = {
					Altai: '4 000',
					Swed: '8 000',
					China: '5 000',
				};
				changePrice(costs);
				break;

			case econom:
				costs = {
					Altai: '2 000',
					Swed: '4 000',
					China: '2 000',
				};
				changePrice(costs);
				break;
			default:
				alert('Извините, у нас неисправности... Попробуйте позже');
		}

		function changePrice(cost) {


			buttonAltai.addEventListener('change', function () {
				price.textContent = cost.Altai;
			});

			buttonSwed.addEventListener('change', function () {
				price.textContent = cost.Swed;
			});

			buttonChina.addEventListener('change', function () {
				price.textContent = cost.China;
			});
		}
	}

}


let cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
	isCard(cards[i]);
}

})();
(function() {
function callPopup(button) {

	let popup = document.querySelector('.popup').content.cloneNode(true);
	let header = document.querySelector('.header');
	let thanks = document.querySelector('.thanks').content.cloneNode(true);

	button.addEventListener('click', function (e) {
		e.preventDefault();
		header.append(popup);

		popup = document.querySelector('.popup').content.cloneNode(true);

		let buttonClose = header.querySelector('.popup__close');
		let popupMask = header.querySelector('.popup__mask');
		let feedbackPopup = header.querySelector('.feedback_popup');
		let formPopup = header.querySelector('.feedback__form_popup');


		buttonClose.addEventListener('click', function () {
			header.removeChild(popupMask);
			header.removeChild(feedbackPopup);
		});

		popupMask.addEventListener('click', function () {
			header.removeChild(popupMask);
			header.removeChild(feedbackPopup);
		});

		formPopup.addEventListener('submit', function () {
			header.removeChild(feedbackPopup);
			header.append(thanks);

			let buttonThanks = header.querySelector('.button_thanks');
			let thanksPopup = header.querySelector('.thanks__wrap');

			buttonThanks.addEventListener('click', function (e) {
				e.preventDefault();

				header.removeChild(popupMask);
				header.removeChild(thanksPopup);
			});

			thanks = document.querySelector('.thanks').content.cloneNode(true);

		});
	});

}

function callThanks (form) {
	
	let popup = document.querySelector('.popup').content.cloneNode(true);
	let popupMask = popup.querySelector('.popup__mask');
	let thanks = document.querySelector('.thanks').content.cloneNode(true);
	let footer = document.querySelector('.footer');

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		footer.append(popupMask);
		footer.append(thanks);

		popup = document.querySelector('.popup').content.cloneNode(true);
		popupMask = popup.querySelector('.popup__mask');
		thanks = document.querySelector('.thanks').content.cloneNode(true);

		let footerMask = footer.querySelector('.popup__mask');
		let footerThanks = footer.querySelector('.thanks__wrap');
		let thanksButton = footer.querySelector('.button_thanks');

		thanksButton.addEventListener('click', function() {
			footer.removeChild(footerThanks);
			footer.removeChild(footerMask);
		});

	});
}

let buttonsEvent = document.querySelectorAll('.button__event');
let feedbackForm = document.querySelector('.feedback__form');

for (let i = 0; i < buttonsEvent.length; i++) {
	callPopup(buttonsEvent[i]);
}

callThanks (feedbackForm);

})();
//# sourceMappingURL=app.js.map