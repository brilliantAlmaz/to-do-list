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
	if (document.querySelector('html').offsetWidth <=800){
		bgImage.src='img/bg-mobile.jpg';
		bgImageOverlay.style.display='block';
		console.log()
	}
	else{
		bgImage.src='img/bg.jpg';
	}
});

const bgImage=document.querySelector('.toDolist__bg-block img');
const bgImageOverlay = document.querySelector('.bg-block__black-overlay')
let input = document.querySelector('.toDoList__input-the-task'); //input box
const inputBtn =document.querySelector('.toDoList__btn') //input add button
const scrollDownBtn = document.querySelector('.bg-block__btn '); //background button that scrolls down to thework station
let list = document.querySelector('.toDoList__list'); //current list 
let listDone=document.getElementById('done'); //list with done tasks
let listDeleted=document.getElementById('deleted'); // list with deleted tasks
let listItems = list.children;
listItems = Array.from(listItems);
listItems.forEach((n, i) => n.id = i + 1)
let deleteBtn=document.querySelectorAll('.list-item__delete-btn') //button that deletes tasks from current list
let doneBtn =document.querySelectorAll('.list-item__check'); //button that marks tasks done
let listItemName=document.querySelectorAll('.toDoList__list .list-item__name'); //names of every tasks in current list

let tempHTML;
function funcInputBtn(){
	if (checkInput()){
		alert("You need to type something");
	}
	else{
		let inputValue = properString(input.value);
		tempHTML= `<li class="toDoList__list-item">
		<div class="list-item__name">${inputValue}</div>
		<div class="list-item__btn-block">
		<input type='checkbox' class="list-item__check">
		<div class="list-item__delete-btn"></div>
		</div>
		</li>`;
		list.insertAdjacentHTML(
			"beforeend",
			tempHTML
			);
		updateList();	
		console.log(listItems)
		//console.log(listItemName[listItemName.length-1])
		list.onclick = (e) =>{
			const target = e.target;
			//console.log(target)
			if (target.classList.contains('list-item__delete-btn')){
				targetListItem = target.parentNode.parentNode;
				tempHTML = `<li class="toDoList__list-item">
				<div class="list-item__name">${targetListItem.firstElementChild.innerHTML}</div>
				</li>`
				targetListItem.classList.add('deleted');
				listDeleted.insertAdjacentHTML(
					'beforeend',
					tempHTML
					)
				setTimeout(()=>{
					targetListItem.remove();
					updateList();	
					console.log(listItems);
				},300)
			}
			else if (target.classList.contains('list-item__check')){
				targetListItem = target.parentNode.parentNode;
				tempHTML = `<li class="toDoList__list-item">
				<div class="list-item__name">${targetListItem.firstElementChild.innerHTML}</div>
				</li>`
				targetListItem.classList.add('done');
				listDone.insertAdjacentHTML(
					'beforeend',
					tempHTML
					)
				setTimeout(()=>{
					targetListItem.remove();
					updateList();	
					console.log(listItems);
				},300)
			}
		}
		input.value="";
	}
}
function properString(s){
	let result='';
	for (i in s){
		if (s[i]=='<'){
			result+='&lt;';
		}
		else if (s[i]=='>'){
			result+='&gt;';
		}
		else{
			result+=s[i];
		}
	}
	return(result)
}
inputBtn.addEventListener('click', function(){
	funcInputBtn();
});

input.addEventListener('keydown', function(e){
	if (e.keyCode==13){
		funcInputBtn();
	}
})


scrollDownBtn.addEventListener('click', () => window.scrollTo({
	top: window.innerHeight,
	behavior: 'smooth',
}));




function updateList(){
	list = document.querySelector('.toDoList__list'); //current list 
	listItems = list.querySelectorAll('li');
	deleteBtn=document.querySelectorAll('.list-item__delete-btn');
	doneBtn=document.querySelectorAll('.list-item__check')
	listItemName=document.querySelectorAll('.toDoList__list .list-item__name');
	listDeleted=document.getElementById('deleted'); // list with deleted tasks
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

const clearDoneList = document.querySelector('.toDoList__done .toDoList__clear-btn')
const clearDeletedList = document.querySelector('.toDoList__deleted .toDoList__clear-btn')
clearDoneList.addEventListener('click', function(){
	let listDoneItems = document.querySelectorAll('.toDoList__done li')
	for (let i=0; i < listDoneItems.length;i++){
		listDoneItems[i].classList.add('done')
		setTimeout(()=>{listDoneItems[i].remove()},300);
	}
})
clearDeletedList.addEventListener('click', function(){
	let listDeletedItems = document.querySelectorAll('.toDoList__deleted li')
	for (let i=0; i < listDeletedItems.length;i++){
		listDeletedItems[i].classList.add('done')
		setTimeout(()=>{listDeletedItems[i].remove();},300);
	}
})

const form = document.querySelector('form');
form.addEventListener('submit', function(e){
	e.preventDefault();
});

function checkInput(){
	return input.value=="";
}

if (document.querySelector('html').offsetWidth <=800){
	bgImage.src='img/bg-mobile.jpg';
	bgImageOverlay.style.display='block';
	console.log()
}
else{
	bgImage.src='img/bg.jpg';
}