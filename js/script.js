inputs=document.querySelectorAll('.time-input-block input');
inputOverflow=document.querySelector('.time-input__block-overflow');
startBtn=document.querySelector('.start-btn');
startBtnOverflow=document.querySelector('.start-btn-overblock');
clearBtn=document.querySelector('.clear-btn');
clearBtnOverflow=document.querySelector('.clear-btn-overblock');
repeatBtn=document.querySelector('.repeat-btn');
repeatBtnOverflow=document.querySelector('.repeat-btn-overblock');
popUp=document.querySelector('.pop-up');
popUpCloseBtn=document.querySelectorAll('.pop-up__exit-sign');
popUpBtn=document.querySelectorAll('.pop-up__btn');
popUpExplain=document.querySelector('.pop-up__explain');
html = document.querySelector('.container');
htmlOverflow = document.querySelector('.container__overflow')
var hours=0, minutes=0, seconds=0, time, timerCountDown, timeValue, repeatRead=true;
let started=false;
let audio = new Audio();
audio.src='audio/alarm.mp3';

//var audio = document.querySelector('#Audio');
//circle arguments
var radius;
var circumference;
var offset;
function setProgress(percent){
	offset = circumference - percent/100 * circumference;
	circle.style.strokeDashoffset = offset;
}
const circle = document.querySelector('.circle');
radius = circle.r.baseVal.value;
circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;
circle.style.transition=`all 1s linear 0s`;
//
buttonsReset();
startBtn.addEventListener('click', function(){
	if (checkInput()){
		repeatBtn.classList.remove('inactive');
		repeatBtnOverflow.classList.remove('inactive');
		if (started){
			pause();
			inputs.forEach(item => 	item.classList.add('paused'));
			startBtn.classList.add('inactive');
			startBtn.style.cursor='pointer';
		}
		else{
			inputOverflow.style.zIndex='-1';
			start();
			inputs.forEach(item => 	item.classList.remove('paused'));
			startBtn.classList.remove('inactive');
		}
		if (repeatRead){
			timeValue=time;
			repeatRead=false;
		}
	}
	else{
		clear();
		popUpExplain.style.top='0';
		html.style.filter='blur(5px)';
		htmlOverflow.style.zIndex='1';
	}
});
repeatBtn.addEventListener('click', function(){
	clear();
	buttonsReset();
	repeat();
	clearCircle();
});
function repeat(){
	started=true;
	startBtn.innerHTML='pause';
	clearBtn.classList.remove('inactive');
	clearBtnOverflow.classList.remove('inactive');
	time=timeValue;
	time++;
	timerCountDown=setInterval(function(){ //timer countdown
		if (time>0){ //if time is up (==0) the timer stops
			timeCounter();
			printTime();
		}
		else{
			clear();
			buttonsReset();
			popUp.style.top='0';
			html.style.filter='blur(5px)';
			htmlOverflow.style.zIndex='1';
			audio.play();
		}
	},1000);
}

function start(){
	started=true;
	startBtn.innerHTML='pause';
	clearBtn.classList.remove('inactive');
	clearBtnOverflow.classList.remove('inactive');
	inputsEmpty();
	time=getTime();
	timerCountDown=setInterval(function(){ //timer countdown
		if (time>0){ //if time is up (==0) the timer stops
			timeCounter();
			printTime();
		}
		else{
			clearInterval(timerCountDown);
			clear();
			repeatRead=true;
			buttonsReset();
			clearCircle();
			popUp.style.top='0';
			html.style.filter='blur(5px)';
			htmlOverflow.style.zIndex='1';
			audio.play();
		}
	},1000);
}
popUpCloseBtn.forEach(item => item.addEventListener('click', function(){
	popUp.style.top='-500%';
	popUpExplain.style.top='-500%';
	audio.pause();
	audio.currentTime=0;
	html.style.filter='blur(0px)';
	htmlOverflow.style.zIndex='0';
}));
popUpBtn.forEach(item => item.addEventListener('click', function(){
	popUp.style.top='-500%';
	popUpExplain.style.top='-500%';
	audio.pause();
	audio.currentTime=0;
	html.style.filter='blur(0px)';
	htmlOverflow.style.zIndex='0';
}));
function pause(){
	if (started){
		startBtn.innerHTML='continue';
		clearInterval(timerCountDown);
		inputOverflow.style.zIndex='1';
	}
	started=false;
}

clearBtn.addEventListener('click', function(){
	clearInterval(timerCountDown);
	clear();
	repeatRead=true;
	buttonsReset();
	clearCircle();
	inputOverflow.style.zIndex='-1';
});
function clearCircle(){
	circle.style.transition='all 0.2s ease 0s';
	setProgress(100);
}

function buttonsReset(){ //resets the visual design of buttons
	startBtn.innerHTML='start';
	startBtn.classList.remove('inactive');
	startBtnOverflow.classList.remove('inactive');
	clearBtn.classList.add('inactive');
	clearBtnOverflow.classList.add('inactive');
	inputs.forEach(item => 	item.classList.remove('paused'));
	setProgress(100);
}

function inputsEmpty(){
	if (inputs[0].value == ''){
		inputs[0].value='00';
	}
	if (inputs[1].value == ''){
		inputs[1].value='00';
	}
	if (inputs[2].value == ''){
		inputs[2].value='00';
	}
}

function clear(){ //clears the time and input boxes
	hours=0;
	minutes=0;
	seconds=0;
	inputs[0].value='';
	inputs[1].value='';
	inputs[2].value='';
	time=0;
	clearInterval(timerCountDown);
	started=false;
}

function getTime(){ //gets hours minutes and seconds
	hours=inputs[0].value;
	minutes=inputs[1].value;
	seconds=inputs[2].value;
	return +hours*3600 + +minutes*60 + +seconds;
}

function calcTimeHours(t){ //calculates current time in hours
	return Math.floor(t/3600);
}
function calcTimeMinutes(t){ //calculates current time in minutes
	return Math.floor(t/60)%60;
}
function calcTimeSeconds(t){ //calculates current time in seconds
	return Math.floor(t%60);
}

function timeCounter(){ //counts down the time
	time--;
	circle.style.transition='all 1s linear 0s';
	setProgress(time/timeValue * 100);
}

function printTime(){ //prints the curreent time into the input boxes
	if (calcTimeHours(time)<10) {
		inputs[0].value='0'+calcTimeHours(time);
	}
	else{
		inputs[0].value=calcTimeHours(time);
	}
	if (calcTimeMinutes(time)<10) {
		inputs[1].value='0'+calcTimeMinutes(time);
	}
	else{
		inputs[1].value=calcTimeMinutes(time);
	}
	if (calcTimeSeconds(time)<10) {
		inputs[2].value='0'+calcTimeSeconds(time);
	}
	else{
		inputs[2].value=calcTimeSeconds(time);
	}
}

function checkInput(){
	let isNumber;
	for (let i = 0; i<inputs.length; i++){
		if (((!(isNaN(+inputs[i].value))) || (inputs[i].value='')) && (!(inputs[i].value.includes(".", 0)))){
		}
		else{
			return false;
		}
	};
	return true;
}