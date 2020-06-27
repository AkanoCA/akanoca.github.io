(function () {
	"use strict";

	function createAuthors(arr) { //функция создания списка авторов с фамилией и инициалами
		function Separate(name) { //формирует объект с фамилией и инициалами
			let arr = name.split(' ');
			this.surname = arr[0];
			this.initials = arr[1];
		};

		let arrNames = arr.split(', '); // создает массив авторов полученных из инпута
		let authors = []; //массив объектов содержащих фамилию и инициалы 

		arrNames.forEach(function (item) {
			let author = new Separate(item);
			authors.push(author);
		});

		return authors;
	}

	function checkCity (city) {
		let cityArr = [
			{
				name: "москва",
				abb: "М.",
			},
			{
				name: "санкт-петербург",
				abb: "СПб.",
			},
		];

		let check = city.toLowerCase();

		cityArr.forEach(function(item){
			console.log(city);
			if (item.name == check) {
				city = item.abb;
			}
		});

		return city;
	}

	(function isBook() {
		let book = document.querySelector('.book');
		let bookButton = book.querySelector('.side__button');



		bookButton.addEventListener('click', function (e) {
			e.preventDefault();

			let arrAuthors = book.querySelector('.js_name').value;

			let authors = createAuthors(arrAuthors);

			let title = book.querySelector('.js_title').value;
			let city = book.querySelector('.js_city').value;
			city = checkCity(city);


			let publisher = book.querySelector('.js_publisher').value;
			let year = book.querySelector('.js_year').value;
			let pages = book.querySelector('.js_pages').value;
			let bookCheck = book.querySelector('.side__checkbox').checked;
			let reference = "";


			if (bookCheck && authors.length >= 3) {
				reference = `${authors[0].surname}, ${authors[0].initials} ${title} / ${authors[0].initials} ${authors[0].surname}, ${authors[1].initials} ${authors[1].surname}, ${authors[2].initials} ${authors[2].surname} [и др.]. &#8212 ${city}: ${publisher}, ${year} . &#8212 ${pages} с.`;
			} else if (!bookCheck && authors.length <= 3) {
				switch (authors.length) {
					case 1:
						reference = `${authors[0].surname}, ${authors[0].initials} ${title} / ${authors[0].initials} ${authors[0].surname}. &#8212 ${city}: ${publisher}, ${year}. &#8212 ${pages} с.`;
						break;
					case 2:
						reference = `${authors[0].surname}, ${authors[0].initials} ${title} / ${authors[0].initials} ${authors[0].surname}, ${authors[1].initials} ${authors[1].surname}. &#8212 ${city}: ${publisher}, ${year}. &#8212 ${pages} с.`;
						break;
					case 3:
						reference = `${authors[0].surname}, ${authors[0].initials} ${title} / ${authors[0].initials} ${authors[0].surname}, ${authors[1].initials} ${authors[1].surname}, ${authors[2].initials} ${authors[2].surname}. &#8212 ${city}: ${publisher}, ${year}. &#8212 ${pages} с.`;
						break;
				}
			} else {
				return alert("Необходимо написать первых 3х авторов");
			}


			

			

			arrBook.push(reference);
			arrBook.sort();
			
			let inputs = book.querySelectorAll('input');

			inputs.forEach(function(item){
				item.value = '';
			});
			book.querySelector('.side__checkbox').checked = false;

			renderList();
		});

	})();

	function renderList() { //выводит готовый список в блок вывода
		arrList.splice(0, arrList.length);
		arrList = arrList.concat(arrBook);

		while (outputList.firstChild) {
			outputList.removeChild(outputList.firstChild);
		}

		for (let i = 0; i < arrList.length; i++) {
			let li = document.createElement('li');
			li.innerHTML = arrList[i];
			output.querySelector('.output__list').appendChild(li);
		}
	}


	let source = document.querySelector('.literature__choice'); //селект
	let output = document.querySelector('.output'); // блок вывода 
	let outputList = output.querySelector('.output__list');
	let writes = document.querySelectorAll('.js_write'); // список блоков-источников
	let arrList = []; // основной списик
	let arrBook = []; // список по книгам


	source.addEventListener('change', function () { //смена блока-источника по выбору из списка
		writes.forEach(function (item) {
			item.style.display = "none";
		});

		writes[source.selectedIndex].style.display = "block";
	});



}());
//# sourceMappingURL=app.js.map
