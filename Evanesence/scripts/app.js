(function(){
    let buttonBurger = document.querySelector('.nav__burger');
    let buttonCancel = document.querySelector('.nav__cancel');
    let navMob = document.querySelector('.nav__mobile');
    let navLinks = document.querySelectorAll('.nav__link_mob');

    buttonBurger.addEventListener('click', function() {
        navMob.style.display = 'flex';
        buttonBurger.style.display = 'none';
        buttonCancel.style.display = 'block';

        buttonCancel.addEventListener('click', function(){
            navMob.style.display = 'none';
            buttonBurger.style.display = 'block';
            buttonCancel.style.display = 'none';
        });

        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function(){
                navMob.style.display = 'none';
                buttonBurger.style.display = 'block';
                buttonCancel.style.display = 'none';
            });
        }
    });
})();
(function () {

	function addContent() {
        if((window.matchMedia('(max-width: 767px)').matches)) {
            groupDesc.textContent = '';
            groupDesc.insertAdjacentHTML("afterbegin", '<span class="group__description_accent">Evanescence</span> — это голос, который обязательно проникнет в вашу душу.');

        } else if (window.matchMedia('(max-width: 1204px)').matches) {
			groupDesc.textContent = '';
			groupDesc.insertAdjacentHTML("afterbegin", '<span class="group__description_accent">Evanescence</span> — это голос, который обязательно проникнет в вашу душу. Это музыка, которая тронет ваше сердце своей чистотой и искренностью. Это песни, от которых мурашки по коже, в которых каждый найдет частичку себя. Они способны вытащить из глубокой памяти ваше прошлое и открыть глаза на будущее.');
		} else {
			groupDesc.textContent = '';
			groupDesc.insertAdjacentHTML("afterbegin", '<span class="group__description_accent">Evanescence</span> — это голос, который обязательно проникнет в вашу душу. Это музыка, которая тронет ваше сердце своей чистотой и искренностью. Это песни, от которых мурашки по коже, в которых каждый найдет частичку себя. <br> Они способны вытащить из глубокой памяти ваше прошлое и открыть глаза на будущее.');
		}
	}
    let groupDesc = document.querySelector('.group__description');
    
    addContent();
    
	window.addEventListener('resize', function () {
		addContent();
	});
})();

(function() {

    function changeContent () {
        if(window.matchMedia('(max-width: 1500px)').matches){
            for (let i = 0; i < place.length; i++){
                place[i].textContent = placeDataShort[i+1];
            }
         } else {
             for (let i = 0; i < place.length; i++){
                 place[i].textContent = placeDataFull[i+1];
             }
         }
    }

    let place = document.querySelectorAll('.table__place');

    let placeDataFull = {
        1: 'Токио, Япония',
        2: 'Брюссель, Бельгия',
        3: 'Париж, Франция',
        4: 'Лондон, Великобритания',
        5: 'Берлин, Германия',
        6: 'Франкфурт-на-Майне, Германия',
        7: 'Цюрих, Швейцария',
        8: 'Милан, Италия',
        9: 'Мюнхен, Германия',
        10: 'Гамбург, Германия',
    };
    let placeDataShort = {
        1: 'Токио',
        2: 'Брюссель',
        3: 'Париж',
        4: 'Лондон',
        5: 'Берлин',
        6: 'Франкфурт',
        7: 'Цюрих',
        8: 'Милан',
        9: 'Мюнхен',
        10: 'Гамбург',
    };

        changeContent();

    window.addEventListener('resize', function(){
        changeContent();
    });
    
})();
(function() {
    function changeContent () {
        if(window.matchMedia('(max-width: 1500px)').matches){
            for (let i = 0; i < links.length; i++) {
                links[i].textContent = linksDataShort[i+1];
            }
        } else {
            for (let i = 0; i < links.length; i++) {
                links[i].textContent = linksDataFull[i+1];
            }
        }
    }
    
    let links = document.querySelectorAll('.more__link');
    let linksDataFull = {
        1: 'https://www.instagram.com/evanescenceofficial',
        2: 'https://vk.com/evanescence',
        3: 'http://evanescence.com',
        4: 'https://twitter.com/evanescence',
    };
    let linksDataShort = {
        1: 'evanescenceofficial',
        2: '@evanescence',
        3: 'evanescence.com',
        4: 'evanescence',
    };

    changeContent();

    window.addEventListener('resize', function() {
        changeContent();
    });
})();
(function () {

	function resizeHall(div) {
		hall.style.height = hallData['height'] / div + 'px';
		hall.style.width = hallData['width'] / div + 'px';

		for (let i = 0; i < hallTexts.length; i++) {
            hallTexts[i].style.fontSize = 20 / div + 'px';
			hallTexts[i].style.top = hallTextsData[i]['top'] / div + 'px';
			hallTexts[i].style.left = hallTextsData[i]['left'] / div + 'px';
		}

		for (let i = 0; i < hallImgs.length; i++) {
			hallImgs[i].style.top = hallImgsData[i]['top'] / div + 'px';
			hallImgs[i].style.left = hallImgsData[i]['left'] / div + 'px';
			hallImgs[i].style.height = hallImgsData[i]['height'] / div + 'px';
			hallImgs[i].style.width = hallImgsData[i]['width'] / div + 'px';
		}
	}


	let hall = document.querySelector('.hall');
	let hallTexts = document.querySelectorAll('.hall__text');
	let hallImgs = document.querySelectorAll('.hall__img');

	let hallData = {
		height: 541,
		width: 920,
	};

	let hallImgsData = [{
			top: 56,
			left: 259,
			height: 38,
			width: 400,
		},
		{
			top: 126,
			left: 206,
			height: 98.25,
			width: 513,
		},
		{
			top: 282,
			left: 716,

			height: 203.96,
			width: 143.65,
		},
		{
			top: 350,
			left: 472,
			height: 111.62,
			width: 288.15,
		},
		{
			top: 281,
			left: 63,
			height: 202.36,
			width: 143.65,
		},
		{
			top: 352,
			left: 160,
			height: 112.42,
			width: 289.85,
		},

		{
			top: 265,
			left: 468,
			height: 86,
			width: 295,
		},
		{
			top: 265,
			left: 157,
			height: 78,
			width: 298,
		},
		{
			top: 263,
			left: 344,
			height: 30.51,
			width: 232.05,
		},
	];

	let hallTextsData = [{
			top: 61,
			left: 430,
		},
		{
			top: 163,
			left: 415,
		},
		{
			top: 373,
			left: 819,
		},
		{
			top: 372,
			left: 608,
		},
		{
			top: 372,
			left: 94,
		},
		{
			top: 372,
			left: 300,
		},

		{
			top: 269,
			left: 606,
		},
		{
			top: 268,
			left: 304,
		},
		{
			top: 267,
			left: 457,
		},
	];

    if(window.matchMedia('(max-width: 737px)').matches) {
        resizeHall(2.6);
    } else if(window.matchMedia('(max-width: 1320px)').matches){
        resizeHall(1.7);
    } else if (window.matchMedia('(max-width: 1536px)').matches) {
        resizeHall(1.3);
    } else {
        resizeHall(1);
    }

    window.addEventListener('resize', function() {
        
        if(window.matchMedia('(max-width: 737px)').matches) {
            resizeHall(2.6);
        } else if(window.matchMedia('(max-width: 1320px)').matches){
            resizeHall(1.7);
        }
        else if (window.matchMedia('(max-width: 1536px)').matches) {
            resizeHall(1.3);
        } else {
            resizeHall(1);
        }
    });
    


})();

(function(){
    function changeContent () {
        if(window.matchMedia('(max-width: 1500px)').matches){
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].textContent = 'Купить';
                buttons[i].style.width = '100px';
            }
        } else {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].textContent = 'Купить билет';
                buttons[i].style.width = '140px';
            }
        }
    }

    function changeTitle() {

        if(window.matchMedia('(max-width: 1040px)').matches){
            rowTitle.style.display = 'none';
        } else  {
            rowTitle.style.display = '';
        }
        
        

    }


    let buttons = document.querySelectorAll('.price__button');
    let rowTitle = document.querySelector('.price__row_title');
    
    changeContent();
    changeTitle();

    window.addEventListener('resize', function(){
        changeContent();
        changeTitle();
    });
})();
//# sourceMappingURL=app.js.map
