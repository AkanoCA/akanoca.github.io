(function () {
	'use strict';

	class Question {
		constructor(item, criteria) {
			this.name = item.question;
			this.options = item.options;
			this.child = criteria.child;
			this.family = criteria.family;
			this.opened = criteria.opened;
			this.emotional = criteria.emotional;
			this.time = criteria.time;
			this.centeredness = criteria.centeredness;
		}

		getQuestion() {
			let block = document.createElement('div');
			let dscrpt = document.createElement('span');

			block.classList.add('question', 'questions__question');

			dscrpt.classList.add('question__description');
			dscrpt.textContent = this.name;



			block.appendChild(dscrpt);

			if (this.options.child) block.appendChild(this.getBlock(this.child));
			if (this.options.family) block.appendChild(this.getBlock(this.family));
			if (this.options.opened) block.appendChild(this.getBlock(this.opened));
			if (this.options.emotional) block.appendChild(this.getBlock(this.emotional));
			if (this.options.time) block.appendChild(this.getBlock(this.time));
			if (this.options.centeredness) block.appendChild(this.getBlock(this.centeredness));

			return block;
		}

		getBlock(blocks) {
			let block = document.createElement('div');

			block.classList.add('question__block', blocks.class);

			for (let i = 0; i < blocks.scales.length; i++) {
				let scale = document.createElement('div');
				let scaleName = document.createElement('span');

				scaleName.classList.add('scale__name');
				scaleName.textContent = blocks.scales[i].name + ':';

				scale.classList.add('question__scale', 'scale');
				scale.appendChild(scaleName);

				for (let item of blocks.scales[i].criteria) {
					let scaleCriterion = document.createElement('div');
					let scaleLabel = document.createElement('label');
					let scaleCheck = document.createElement('input');
					let scaleDscrpt = document.createElement('span');

					scaleCheck.classList.add('scale__check');
					scaleCheck.type = 'checkbox';

					scaleDscrpt.classList.add('scale__description');
					scaleDscrpt.textContent = item;

					scaleLabel.classList.add('scale__label');
					scaleLabel.appendChild(scaleCheck);
					scaleLabel.appendChild(scaleDscrpt);

					scaleCriterion.classList.add('scale__criterion');
					scaleCriterion.appendChild(scaleLabel);


					scale.appendChild(scaleCriterion);
				}

				block.appendChild(scale);
			}

			return block;
		}

	}

	function renderList(arr, criteria) {

		for (let item of arr) {
			let block = new Question(item, criteria);

			questions.appendChild(block.getQuestion());
		}
	}


	class Result {
		constructor(arrQuest, blockName, webBlock) {
			this.arrQuest = arrQuest;
			this.blockName = blockName;
			this.webBlock = webBlock;
		}

		getBlock() {
			let resultBlock = document.createElement('div');
			let resultTitle = document.createElement('h3');

			resultBlock.classList.add('result__block');
			resultTitle.classList.add('result__title');

			resultTitle.textContent = this.webBlock;

			resultBlock.appendChild(resultTitle);
			resultBlock.appendChild(this.getScales());

			return resultBlock;
		}

		getScales() {
			let resultScales = document.createElement('div');
			resultScales.classList.add('result__scales');

			let scales = new Set();
			let questions = this.getQuestions();

			for (let item of questions) {
				scales.add(item.scale);
			}

			for (let item of scales) {
				let resultScale = document.createElement('span');
				resultScale.classList.add('result__scale');
				resultScale.textContent = item;

				resultScales.appendChild(resultScale);
				// resultScales.appendChild(this.getCriteria(questions, item));

				resultScales.appendChild(this.getCriteria(questions, item));

			}

			return resultScales;
		}

		getCriteria(questions, scale) {
			let resultCriteria = document.createElement('div');
			let webBlocks = [];
			let result;

			let blockName = this.blockName;
			if (blockName == 'childIdeal' || blockName == 'childReal') blockName = 'child';

			resultCriteria.classList.add('result__criteria');


			for (let item of questions) {
				if (item.scale == scale) webBlocks.push(document.querySelectorAll('.question')[item.key].querySelector(`.js_${blockName}`));
			}


			// for (let item of webBlocks) {
			// 	console.log('---------');
			// 	console.log(item);
			// }
			result = this.getResult(webBlocks);

			for (let key in result) {
				let blockCriteria = document.createElement('span');
				let i = 1;

				blockCriteria.classList.add('result__point');
				blockCriteria.textContent = key;
				resultCriteria.appendChild(blockCriteria);

				for (let key1 in result[key]) {
					let resultCriterion = document.createElement('div');
					let resultCriterionName = document.createElement('span');
					let resultValue = document.createElement('span');
					let val = Math.floor(result[key][key1])

					resultCriterion.classList.add('result__criterion');
					if (val > 0) resultCriterion.classList.add('result__positive');

					resultCriterionName.classList.add('result__name');
					resultValue.classList.add('result__value');

					resultCriterionName.textContent = `${key1} :`;
					resultValue.textContent = ' ' + val;


					resultCriterion.appendChild(resultCriterionName);
					resultCriterion.appendChild(resultValue);

					resultCriteria.appendChild(resultCriterion);

					i++;
				}
			}

			return resultCriteria;
		}

		getResult(wBlocks) {


			let arr = {};

			for (let item of wBlocks) { //итерируем каждый вопрос относящийся к шкале
				let scales = item.querySelectorAll('.scale');


				for (let item of scales) { //внутри вопроса находим каждую шкалу критериев
					let name = item.querySelector('.scale__name').textContent;

					if (!arr[name]) arr[name] = {};

					let criteria = item.querySelectorAll('.scale__criterion');

					for (let item of criteria) { // из шкалы выделяем каждый критерий
						let criterionName = item.querySelector('.scale__description').textContent;
						let inputCheck = item.querySelector('.scale__check');

						if (arr[name][criterionName] > 0) {
							if (inputCheck.checked) arr[name][criterionName] += 1;
						} else {
							arr[name][criterionName] = 0.1;
							if (inputCheck.checked) arr[name][criterionName] = 1;
						}
					}
				}
			}

			return arr;
		}

		getQuestions() {
			let questions = [];
			let blockName = this.blockName;

			arrQuestions.forEach(function (item, index) {
				if (item.options[blockName]) {
					questions.push({
						key: index,
						scale: item.scale
					});
				}
			});

			return questions;
		}
	}

	function renderResult(arrQuest) {
		let result = document.querySelector('.result');

		result.appendChild(new Result(arrQuest, 'childIdeal', 'Идеальный образ ребенка').getBlock());
		result.appendChild(new Result(arrQuest, 'childReal', 'Реальный образ ребенка').getBlock());
		result.appendChild(new Result(arrQuest, 'family', 'Образ отношений в семье').getBlock());
		result.appendChild(new Result(arrQuest, 'opened', 'Открытый блок').getBlock());
		result.appendChild(new Result(arrQuest, 'emotional', 'Эмоциональный знак отношения').getBlock());
		result.appendChild(new Result(arrQuest, 'time', 'Временная перспектива').getBlock());
		result.appendChild(new Result(arrQuest, 'centeredness', 'Характер центрированности высказывания').getBlock());
	}




	let questions = document.querySelector('.questions');

	let arrQuestions = [{
			question: '1. Когда я думаю о своем ребенке, то...',
			scale: 'Открытая шкала',
			options: {
				child: false,
				childIdeal: false,
				childReal: false,
				family: false,
				opened: true,
				emotional: true,
				time: true,
				centeredness: true,
			}
		},
		{
			question: '2. По сравнению с другими детьми его/ее возраста...',
			scale: 'Сравнительная оценка ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '3. Я люблю, когда мой ребенок...',
			scale: 'Позитивные особенности ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '4. Я хотел(а) бы, чтобы...',
			scale: 'Идеальные ожидания',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '5. Меня беспокоит в нем/ней...',
			scale: 'Возможные страхи, опасения',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '6. Мне бы хотелось, чтобы мой ребенок больше уделял внимания...',
			scale: 'Реальные требования',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '7. Я очень раздражаюсь, когда...',
			scale: 'Причины трудностей',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '8. Когда он/она рос (ла)...',
			scale: 'Амнестические данные',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '9. Моего ребенка интересует...',
			scale: 'Интересы, предпочтения ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '10. Мне приятно, когда мы с моим ребенком...',
			scale: 'Ситуация "мы-взаимодействия"',
			options: {
				child: false,
				childIdeal: false,
				childReal: false,
				family: true,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '11. Скорее всего, он/она...',
			scale: 'Открытая шкала',
			options: {
				child: false,
				childIdeal: false,
				childReal: false,
				family: false,
				opened: true,
				emotional: true,
				time: true,
				centeredness: true,
			}
		},
		{
			question: '12. Когда мы с ним/ней бываем среди других детей...',
			scale: 'Сравнительная оценка ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '13. Мне нравится в моем ребенке...',
			scale: 'Позитивные особенности ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '14. Я всегда мечтала о том, что...',
			scale: 'Идеальные ожидания',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '15. Я боюсь, что...',
			scale: 'Возможные страхи, опасения',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '16. Хотелось, чтобы он/она перестал(а)...',
			scale: 'Реальные требования',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '17. Мне не нравится в нем/ней...',
			scale: 'Причины трудностей',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '18. Когда он/она был(а) маленьким(ой)...',
			scale: 'Амнестические данные',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '19. Мой ребенок любит...',
			scale: 'Интересы, предпочтения ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '20. Мой ребенок и я...',
			scale: 'Ситуация "мы-взаимодействия"',
			options: {
				child: false,
				childIdeal: false,
				childReal: false,
				family: true,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '21. Я всегда замечал(а)...',
			scale: 'Открытая шкала',
			options: {
				child: false,
				childIdeal: false,
				childReal: false,
				family: false,
				opened: true,
				emotional: true,
				time: true,
				centeredness: true,
			}
		},
		{
			question: '22. Самое главное в характере моего ребенка...',
			scale: 'Значимые характеристики ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '23. Мой ребенок силен в..',
			scale: 'Значимые характеристики ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '24. Я был(а) бы рад(а), если бы...',
			scale: 'Идеальные ожидания',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '25. Мне бы не хотелось, чтобы…',
			scale: 'Возможные страхи, опасения',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '26. Мой ребенок достаточно способен, чтобы...',
			scale: 'Идеальные ожидания',
			options: {
				child: true,
				childIdeal: true,
				childReal: false,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '27. Думаю, что ему/ей мешает...',
			scale: 'Причины трудностей',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '28. Самое трудное, что пережил мой ребенок...',
			scale: 'Амнестические данные',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '29. Он/она предпочитает...',
			scale: 'Интересы, предпочтения ребенка',
			options: {
				child: true,
				childIdeal: false,
				childReal: true,
				family: false,
				opened: false,
				emotional: false,
				time: false,
				centeredness: false,
			}
		},
		{
			question: '30. Наши отношения с ребенком...',
			scale: 'Ситуация "мы-взаимодействия"',
			options: {
				child: false,
				childIdeal: false,
				childReal: false,
				family: true,
				opened: false,
				emotional: true,
				time: false,
				centeredness: false,
			}
		},
	];

	let arrScales = {
		child: {
			class: 'js_child',
			scales: [{
					name: 'Значимые характеристики, качества',
					criteria: ['личностные особенности', 'когнитивная сфера', 'коммуникативная сфера: навыки', 'эмоциональна сфера', 'самостоятельность', 'внешность, физическое развитие', 'самообслуживание, бытовые', 'здоровье', 'вкусовые предпочтения']
				},
				{
					name: 'Интересы, деятельностные предпочтения',
					criteria: ['природа(животные, растения)', 'культурные мероприятия', 'ТВ', 'компьютер; (математика, языки)', 'игра', 'продукивные виды деятельности', 'чтение', 'спорт, танцы', 'музыка, пение', 'интеллектуальные занятия', 'прогулки', 'обучение, поступление в детский сад / школу / вуз']
				},
				{
					name: 'Особенности отношений',
					criteria: ['Послушание', 'близость, симбиоз', 'совместность во взаимодействии', 'внешние влияния']
				},
				{
					name: 'Трудные жизненные ситуации',
					criteria: ['утрата, сепарация', 'развод, конфликт, переезд']
				},
				{
					name: 'Дополнительные категории',
					criteria: ['обобщенные высказывания', 'переживания родителей']
				},
			],
		},
		family: {
			class: 'js_family',
			scales: [{
					name: 'Интересы, деятельностные предпочтения',
					criteria: ['отдых, прогулки', 'совместная деятельность (без конкретизации вида деятельности)', 'бытовое взаимодействие', 'межличностное общение', 'культурные мероприятия', 'игра', 'продуктивные виды деятельности', 'чтение', 'музыка, пение', 'занятие, обучение']
				},
				{
					name: 'Характер отношения с ребенком',
					criteria: ['дружба', 'любовь', 'доверие', 'понимание', 'послушание / подчинение', 'близость, симбиоз']
				},
				{
					name: 'Дополнительные категории',
					criteria: ['обобщенные высказывания', 'шаблон "мы дружная семья"']
				}
			],
		},
		opened: {
			class: 'js_opened',
			scales: [{
				name: 'Открытая шкала',
				criteria: ['чувство принадлежности ребенка', 'условный симбиоз', 'личностные качества', 'коммуникативные качества', 'волевые качества', 'навыки самообслуживания', 'эмоциональные проявления', 'способности', 'обучение, профессия', 'внешность', 'детско-родительские отношения', 'послушание', 'сравнительная оценка', 'внешние влияния', 'телесный контакт', 'обобщенные высказывания', 'переживания родителя', 'сензитивность к состоянию ребенка']
			}],
		},
		emotional: {
			class: 'js_emotional',
			scales: [{
				name: 'Эмоциональный знак отношений',
				criteria: ['положительный', 'отрицательный', 'амбивалентный', 'нейтральный']
			}],
		},
		time: {
			class: 'js_time',
			scales: [{
				name: 'Временная перспектива образа',
				criteria: ['прошлое', 'настоящее', 'будущее']
			}],
		},
		centeredness: {
			class: 'js_centeredness',
			scales: [{
				name: 'Характер центрированности высказываний',
				criteria: ['на ребенке', 'на родителе', 'на отношениях родителя с ребенком']
			}]
		},

	};

	function toResetResult() {
		let result = document.querySelector('.result');
		let resultBlock = result.querySelectorAll('.result__block');

		for (let i = 0; i < resultBlock.length; i++) {
			result.removeChild(resultBlock[i]);
		}
	}

	let button = document.querySelector('.count');
	let reset = document.querySelector('.container__reset');
	let copy = document.querySelector('.result__copy')

	button.addEventListener('click', function () {
		toResetResult();
		renderResult(arrQuestions);

	});

	reset.addEventListener('click', function () {
		let inputs = document.querySelectorAll('.scale__check');

		for (let item of inputs) {
			item.checked = false;
		}

		toResetResult();
	});

	copy.addEventListener('click', function () {
		let textArea = document.createElement('textarea');
		let resultBlock = document.querySelector('.result');
		let results = resultBlock.querySelectorAll('.result__value');

		textArea.value

		textArea.classList.add('result__copy-area');

		for (let item of results) {
			textArea.value += (item.textContent + '\n')
		}

		resultBlock.appendChild(textArea);

		$('.result__copy-area').select();
		document.execCommand('copy');

		let copyArea = document.querySelector('.result__copy-area');

		console.log(copyArea);

		resultBlock.removeChild(copyArea);
	})



	renderList(arrQuestions, arrScales);

})();
//# sourceMappingURL=app.js.map
