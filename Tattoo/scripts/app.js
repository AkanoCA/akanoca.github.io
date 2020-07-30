$(document).on('click', '.menu__link', function() {
    var linkID = $(this).attr('href');
    $('html, body').animate({ 
      scrollTop: $(linkID).offset().top 
    }, 'slow');
  });

(function(){
    function toggleArrow(arrowHide, arrowShow) {
        arrowHide.classList.add('our-masters__arrow_hide');
        arrowShow.classList.remove('our-masters__arrow_hide');
    }


    var ourMasters = document.querySelector('.our-masters');
    var cards = ourMasters.querySelectorAll('.our-masters__card');
    var arrowR = ourMasters.querySelector('.our-masters__arrow_r');
    var arrowL = ourMasters.querySelector('.our-masters__arrow_l');

    console.log(cards[1]);
    arrowR.addEventListener('click', function(){
        toggleArrow(arrowR, arrowL);
        cards[0].classList.remove('our-masters__card_show');
        cards[1].classList.add('our-masters__card_show');

    });
    arrowL.addEventListener('click', function() {
        toggleArrow(arrowL, arrowR);
        cards[1].classList.remove('our-masters__card_show');
        cards[0].classList.add('our-masters__card_show');
    });
    
})();

var slides = document.querySelectorAll('.carousel__item');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,3500);

var next = document.querySelector('.carousel__arrow_r');
var previous = document.querySelector('.carousel__arrow_l');

next.addEventListener('click', function() {
    clearInterval(slideInterval);
    nextSlide();
});
previous.addEventListener('click', function(){
    clearInterval(slideInterval);
    previousSlide();
});
 
function nextSlide() {
    goToSlide(currentSlide+1);
}

function previousSlide() {
    goToSlide(currentSlide-1);
}

function goToSlide(n) {
    slides[currentSlide].className = 'carousel__item';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'carousel__item carousel__item_show';
}
ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [59.934943, 30.332316],
        zoom: 18,
        controls: ['geolocationControl', 'routeButtonControl', 'fullscreenControl', 'zoomControl']
    });

    myMap.geoObjects
        .add(new ymaps.Placemark([59.934943, 30.332316], {
            balloonContent: 'Tattoo art studio'
        },{
            preset: 'default#icon',
            iconColor: '#ff0000'
        }));

}
//# sourceMappingURL=app.js.map