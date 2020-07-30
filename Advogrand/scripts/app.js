(function moreDetail() {

	function addCloseCheck(area){
		area.addEventListener('click', function () {
			var servicesPopup = services.querySelector('.popup');
			servicesPopup.remove();
		})
	}

	function addClickCheck(container, data) {
		container.addEventListener('click', function () {
			var popup = template.cloneNode(true);
			var closeButton = popup.querySelector('.close-button');
			var popupMask = popup.querySelector('.popup__mask');
			var popupHeading = popup.querySelector('.popup__heading');
			var popupImg = popup.querySelector('.popup__image');
			var popupDescription = popup.querySelector('.popup__description');
			var serviceDescription = container.querySelector('.services__description');

			popupHeading.textContent = serviceDescription.textContent;

			popupImg.src = data.imgUrl;
			popupImg.alt = popupHeading.textContent;

			popupDescription.textContent = data.description;

			addCloseCheck(closeButton);
			addCloseCheck(popupMask);

			services.appendChild(popup);
		});
	}

	var template = document.querySelector('.more-detail').content;
	var services = document.querySelector('.services');
	var service = services.querySelectorAll('.services__service');
	var dataBase = [
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		},
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		},
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		},
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		},
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		},
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		},
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		},
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		},
		{
			imgUrl: './static/services/lawer.png',
			description: 'sdsds ffsf df fff df ffsfs fds  dsfd  fdfs fdfs fsfs fsd fs sf gdfg'
		}
	]

	for (var i = 0; i < service.length; i++){
		addClickCheck(service[i], dataBase[i]);
	}
}());

(function ourVideos() {

	function addCloseCheck(area){
		area.addEventListener('click', function () {
			var Popup = freeConsult.querySelector('.popup');
			Popup.remove();
		})
	}

	function addClickCheck(container) {
		container.addEventListener('click', function (evt) {
			evt.preventDefault();
			var popup = template.cloneNode(true);
			var closeButton = popup.querySelector('.close-button');
			var popupMask = popup.querySelector('.popup__mask');


			addCloseCheck(closeButton);
			addCloseCheck(popupMask);

			freeConsult.appendChild(popup);
		});
	}

	var template = document.querySelector('.our-videos').content;
	var freeConsult = document.querySelector('.free-consult__container');
	var freeConsultVideo = freeConsult.querySelector('.free-consult__video');

	addClickCheck(freeConsultVideo);

}());

(function feedback () {
	function addCloseCheck(area) {
		area.addEventListener('click', function () {
			var Popup = feedback.querySelector('.popup');
			Popup.remove();
		})
	}

	function addClickCheck(container) {
		container.addEventListener('click', function (evt) {
			evt.preventDefault();
			var popup = template.cloneNode(true);
			var closeButton = popup.querySelector('.close-button');
			var popupMask = popup.querySelector('.popup__mask');


			addCloseCheck(closeButton);
			addCloseCheck(popupMask);

			feedback.appendChild(popup);
		});
	}

	function addContent(container, ID) {
		var image = container.querySelector('.feedback__preview');

		image.src = '//img.youtube.com/vi/' + ID + '/maxresdefault.jpg';
	}

	var template = document.querySelector('.our-videos').content;
	var feedback = document.querySelector('.feedback');
	var feedbackVideos = feedback.querySelector('.feedback__videos');
	var feedbackVideo = feedbackVideos.children;
	var feedbackVideosUrl = [
		'https://www.youtube.com/watch?v=ZNA1yum-YVE',
		'https://www.youtube.com/watch?v=YZ021Gy3DAY',
		'https://www.youtube.com/watch?v=k7SsPg7iKoM',
		'https://www.youtube.com/watch?v=_6WG8JkW0ZQ',
		'https://www.youtube.com/watch?v=mMuFjVxRl2c',
		'https://www.youtube.com/watch?v=GduFTeDOHQg',
		'https://www.youtube.com/watch?v=wPyMaL3_WJ4',
		'https://www.youtube.com/watch?v=eysmPMEcQns',
		'https://www.youtube.com/watch?v=F2icnCbIGko',
		'https://www.youtube.com/watch?v=00iZrqlNJL8',
		'https://www.youtube.com/watch?v=Epuis1uZcFA',
		'https://www.youtube.com/watch?v=KxQw_YqOm1Y',
		'https://www.youtube.com/watch?v=lDHOoccmYk8',
		'https://www.youtube.com/watch?v=hPpSIiRCVBk',
		'https://www.youtube.com/watch?v=jO-OLfWVMd4'
	]
	var feedbackVideosID = [];
	var youTube = 'https://www.youtube.com/watch?v=';

	for ( var i = 0; i < feedbackVideosUrl.length; i++) {
		var url = feedbackVideosUrl[i];
		var videoID = url.replace(youTube, '');
		feedbackVideosID[i] = videoID;
	}

	for (var i = 0; i <feedbackVideo.length; i++) {
		addContent(feedbackVideo[i], feedbackVideosID[i]);
		addClickCheck(feedbackVideo[i]);
	}

}());
