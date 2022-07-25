let input = document.querySelector('.toDoList__input-the-task');
const inputBtn =document.querySelector('.toDoList__btn')
const scrollDownBtn = document.querySelector('.bg-block__btn ');
let list = document.querySelector('.toDoList__list');
let listItems = document.querySelectorAll('.toDoList__list li');
let deleteBtn=document.querySelectorAll('.list-item__delete-btn')
let doneBtn =document.querySelectorAll('.list-item__check');

let listDone=document.getElementById('done');
let listDeleted=document.getElementById('deleted');

//let listItemName=document.querySelectorAll('.toDoList__list .list-item__name');

let tempHTML;
inputBtn.addEventListener('click', function(){
	tempHTML= `<li class="toDoList__list-item">
	<div class="list-item__name">${input.value}</div>
	<div class="list-item__btn-block">
	<input type='checkbox' name='isDone'value='done' class="list-item__check">
	<div class="list-item__delete-btn"></div>
	</div>
	</li>`;
	list.insertAdjacentHTML(
		"beforeend",
		tempHTML
		);
	updateList();
	for (let i =0; i<listItems.length; i++){
		deleteBtn[i].addEventListener('click', function(){
			tempHTML = listItems[i].cloneNode(true);
			listItems[i].classList.add('deleted');
			listDeleted.insertAdjacentHTML(
				'beforeend',
				tempHTML.outerHTML,
				);
			setTimeout(()=> {listItems[i].remove()},1);
		});
		doneBtn[i].addEventListener('click', function(){
			listItems[i].classList.add('done');
			setTimeout(()=> {listItems[i].remove()},1);
		});
	}
});

for (let i =0; i<listItems.length; i++){
	deleteBtn[i].addEventListener('click', function(){
		tempHTML = listItems[i].cloneNode(true);
		listItems[i].classList.add('deleted');
		listDeleted.insertAdjacentHTML(
			'beforeend',
			tempHTML.outerHTML,
			);
		setTimeout(()=> {listItems[i].remove()},1);
	});
	doneBtn[i].addEventListener('click', function(){
		listItems[i].classList.add('done');
		setTimeout(()=> {listItems[i].remove()},1);
	});
}

scrollDownBtn.addEventListener('click', () => window.scrollTo({
	top: window.innerHeight,
	behavior: 'smooth',
}));

function updateList(){
	listItems = document.querySelectorAll('.toDoList__list li');
	deleteBtn=document.querySelectorAll('.list-item__delete-btn')
	doneBtn=document.querySelectorAll('.list-item__check')
}
const sliderLine = document.querySelector('.toDoList__slider-line');
const sliderRow = document.querySelectorAll('.toDoList__row-item');
let currentBlock ='current';
let transformValue = document.querySelector('html').offsetWidth;
sliderRow[0].addEventListener('click', function(){
	sliderLine.style.transform=`translate(0, 0)`;
	currentBlock ='done';
	sliderRow.forEach(function(item){
		item.classList.remove('active');
	});
	sliderRow[0].classList.add('active');
})

sliderRow[1].addEventListener('click', function(){
	sliderLine.style.transform=`translate(${-transformValue}px, 0)`;
	currentBlock ='current';
	sliderRow.forEach(function(item){
		item.classList.remove('active');
	});
	sliderRow[1].classList.add('active');
})

sliderRow[2].addEventListener('click', function(){
	sliderLine.style.transform=`translate(${-2*transformValue}px, 0)`;
	currentBlock ='deleted';
	sliderRow.forEach(function(item){
		item.classList.remove('active');
	});
	sliderRow[2].classList.add('active');
})

window.addEventListener("resize", function(){
	transformValue=document.querySelector('html').offsetWidth;
	switch(currentBlock){
		case ("deleted"):
		sliderLine.style.transform=`translate(${-2*transformValue}px, 0)`;
		break;
		case ("done"):
		sliderLine.style.transform=`translate(0, 0)`;
		break;
		case ("current"):
		sliderLine.style.transform=`translate(${-transformValue}px, 0)`;
		break;
		
	}
	sliderLine.style.width = transformValue+'px';
});
