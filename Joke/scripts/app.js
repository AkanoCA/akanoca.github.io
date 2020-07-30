
$(document).ready(function () {

	var randomVal = Math.floor(Math.random() * 10) + 1;
	var audio = document.querySelector('.choice__audio');


	$('.cards__link').on('click', function(e){
		e.preventDefault();
		audio.play();

		
		$('.cards').toggleClass('cards__rotate');

		function link() {
			window.open('http://example.com');
		}

		setTimeout(link, 3000);
		
	});

});

$('.divination__attention_popup').on('click', function() {
    $('.attention').toggleClass('attention_show');
});
var audio = document.querySelector('.background__audio');
$('.background__head').on('mouseenter', function() {
    audio.play();
});

$('.background__head').on('mouseleave', function() {
    audio.pause();
});

$('.attention__button').on('click', function(){
    $('.attention').toggleClass('attention_show');
});
//# sourceMappingURL=app.js.map