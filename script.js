'use strict';

//-------------HTM ELEMENTS-------------//

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector('.nav');

//-------------FUNCTIONS AND EVENT LISTENERS-------------//
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//----------TOP NAVIGATION---------//
document.querySelector(".nav__links").addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({behavior: 'smooth'});;
	}
});


//----------SCROLLING---------//
btnLearnMore.addEventListener('click', function(e) {
	const s1pos = section1.getBoundingClientRect();
	// console.log(s1pos);
	// console.log('Current scroll (x/y)', window.scrollX, window.scrollY);
	// console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
	// console.log(
	// 	'height/width viewport',
	// 	document.documentElement.clientHeight,
	// 	document.documentElement.clientWidth,
	// );

	// window.scrollTo({
	// 	left: s1pos.left + window.scrollX,
	// 	top: s1pos.top + window.scrollY,
	// 	behavior: 'smooth',
	// });
	//OR//
	section1.scrollIntoView({ behavior: 'smooth' });
});

//----------TABS---------//
tabsContainer.addEventListener('click', function (e) {
	const clicked = e.target.closest(".operations__tab");
	if (!clicked)
		return ;
	tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
	tabsContent.forEach(tab => tab.classList.remove('operations__content--active'));
	clicked.classList.add('operations__tab--active');
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList
		.add('operations__content--active');
});

const handleHover = function (e) {
	if (e.target.classList.contains('nav__link')) {
		const hovered = e.target;
		const siblings = hovered.closest('.nav').querySelectorAll('.nav__link');
		const logo = hovered.closest('.nav').querySelector('img');

		siblings.forEach(el => {
			if (el !== hovered)
				el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
	const [entry] = entries;
	if (entry.isIntersecting) {
		entry.target.classList.remove('section--hidden');
		observer.unobserve(entry.target);
	}
};

const obsOptions = {
	root: null,
	threshold: 0.2,
};

const sectionObserver = new IntersectionObserver(revealSection, obsOptions);

allSections.forEach(section => {
	sectionObserver.observe(section);
	section.classList.add('section--hidden');
});

const images = document.querySelectorAll('img[data-src]');

const revealImage = function(entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting)
		return;
	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener('load', function () {
		entry.target.classList.remove('lazy-img');
	});
	observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(revealImage, {
	root: null,
	threshold: 0,
	rootMargin: '+300px',
});

images.forEach(image => {
	imageObserver.observe(image);
});

//-------------SLIDER ELEMENT-------------//
const slider = function () {
	//--------HTML Elements--------//
	const slides = document.querySelectorAll('.slide');
	const slider = document.querySelector('.slider');
	const btnRight = document.querySelector('.slider__btn--right');
	const btnLeft = document.querySelector('.slider__btn--left');
	const dotContainer = document.querySelector('.dots');

	//--------Variables--------//
	let currSlide = 0;
	const maxSlides = slides.length;

	//--------Functions--------//
	const createDots = function() {
		slides.forEach(function(_, i) {
			dotContainer.insertAdjacentHTML(
				'beforeend',
				`<button class="dots__dot" data-slide="${i}"></button>` 
			);
		});
	};

	const activateDot = function(slide) {
		document
			.querySelectorAll('.dots__dot')
			.forEach(dot => dot.classList.remove('dots__dot--active'));
		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add('dots__dot--active');
	};

	const goToSlide = function(slide) {
		slides.forEach(
			(s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
		);
	};

	const nextSlide = function () {
		if (currSlide  === maxSlides - 1)
			currSlide = 0;
		else
			currSlide++;
		goToSlide(currSlide);
		activateDot(currSlide);
	};

	const prevSlide = function() {
		if (currSlide === 0)
			currSlide = maxSlides - 1;
		else
			currSlide--;
		goToSlide(currSlide)
		activateDot(currSlide);
	};

	//--------Function calls--------//
	const init = function () {
		goToSlide(0);
		createDots();
		activateDot(0);
	};

	init();

	//--------Event listeners--------//
	btnRight.addEventListener('click', nextSlide);
	btnLeft.addEventListener('click', prevSlide);

	//--Keyboard events for slider--//
	document.addEventListener('keydown', function(e) {
		e.key === 'ArrowLeft' && prevSlide();
		e.key === 'ArrowRight' && nextSlide();
	});

	dotContainer.addEventListener('click', function(e) {
		if (e.target.classList.contains('dots__dot')) {
			console.log(e);
			const slide = e.target.dataset.slide;
			goToSlide(slide);
			activateDot(slide);
		}
	});
};

slider();
