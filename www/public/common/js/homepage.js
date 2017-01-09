(function(){

const menuMobileInner = document.querySelector('.hamburger-inner');

function toggleMenu(e){
	this.parentElement.classList.toggle('active');
	e.preventDefault();
}

function triggerAllAnimateIn(){
	const menu 			= document.querySelector('.menu'),
	  	  locked 		= document.querySelector('.locked'),
	  	  main 			= document.querySelector('.main-bg');
	  	  text 			= Array.from(document.querySelectorAll('.text-over > *'));

	var stagger = 1100;
	
	setTimeout(function(){
		menu.classList.remove('inactive');
	}, 0);

	setTimeout(function(){
		locked.classList.remove('locked');
		main.classList.remove('inactive');
	}, 700);

	text.forEach(function(title){
		setTimeout(function(){
			title.classList.remove('inactive');
		}, stagger);
		stagger += 300;
	});
}

function rotate(transition){
	const logoChildren = Array.from(document.querySelectorAll('.opening-logo > *'));
	if(transition.propertyName != 'transform') return;

	logoChildren.forEach(function(child){
		child.classList.remove('inactive');
	});
}

function triggerInitial(){
	const lines = Array.from(document.querySelectorAll('.line'));
	lines.forEach(function(line){
		line.classList.remove('inactive');
		line.addEventListener('transitionend', rotate);
	});
}

var scroll = (function (event){
	const offsetPercent = 0.3;
	var slide1 = false;
	var slide2 = false;
	return function triggerOnScrollEvents(event){
					 // is IE browser ? IE height : non-IE height
		const height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
		const pageY = window.pageYOffset;

		if(!slide1 && pageY > height*(1-offsetPercent) && pageY < height*(2-offsetPercent)){
			slide1 = true;
			document.querySelector('.hack-bg').classList.remove('inactive');
		}
		if(!slide2 && pageY > height * (2-offsetPercent) && pageY < height*(3-offsetPercent)){
			slide2 = true;
			document.querySelector('.school-bg').classList.remove('inactive');
		}
	}
})();



if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.onscroll = scroll;
menuMobileInner.addEventListener('click', toggleMenu);

setTimeout(triggerInitial, 200);
setTimeout(triggerAllAnimateIn, 1100);

})();
