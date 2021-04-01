'use strict';
let body = document.querySelector('body');
let fixed_padding = document.getElementsByClassName('fixed-padding');
let header = document.getElementById('header');

/* Burger */

let check = document.getElementById('burg-check');
let burg_link = document.getElementsByClassName('burg-link');

if (check.checked) {
	burgBodyLock();
} else {
	burgBodyUnLock();
}

for(let i = 0, length = burg_link.length; i < length; i++) {
	burg_link[i].addEventListener('click', function(e) {
		if (check.checked) {
			check.checked = false;
			burgBodyUnLock();
		}
	});
}

check.addEventListener('click', function(e) {
	let popupActive = document.querySelector('.popup.open');

	if (popupActive) {
		closePopup(popupActive, false);
	}

	if (check.checked) {
		burgBodyLock();
	} else {
		burgBodyUnLock();
	}
});

document.documentElement.addEventListener('click', function(e) {
	if ((!e.target.closest('.burger') && check.checked) || (e.target.closest('.black-bg') && check.checked)) {
		check.checked = false;
		burgBodyUnLock();
	}

	if (!e.target.closest('.service-block')) {
		for(let i = 0, length = content.length; i < length; i++) {
			$(content[i]).slideUp();
			serviceTap[i] = false;
		}
	}
});

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			if (fixed_padding[i].classList.contains('nav') && fixed_padding[i].classList.contains('fixed')) {
				paddingValue = paddingValue + 20;
			}
			fixed_padding[i].style.paddingRight = paddingValue + 'px';
			paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			if (fixed_padding[i].classList.contains('nav') && fixed_padding[i].classList.contains('fixed')) {
				fixed_padding[i].style.paddingRight = '20px';
				continue;
			}
			fixed_padding[i].style.paddingRight = '0px';
		}
	}

	body.style.paddingRight = '0px';
	body.classList.remove('lock');
}

/* Parallax */

let offsetY = (pageYOffset * .5);
header.style.backgroundPosition = 'center ' + offsetY + 'px';

window.addEventListener('scroll', function(e) {
	offsetY = (pageYOffset * .5);
	header.style.backgroundPosition = 'center ' + offsetY + 'px';
});

/* Accordion */

let service = document.querySelectorAll('.service-block');
let content = document.querySelectorAll('.service-content-wrap');
let prevService;
let serviceTap = [];

for(let i = 0, length = content.length; i < length; i++) {
	serviceTap[i] = false;

	$(content[i]).slideUp(0);
	$(service[i]).click(function(e) {
		if (prevService != undefined && prevService != i) {
			$(content[prevService]).slideUp();
			serviceTap[i] = false;
		}

		prevService = i;

		if (serviceTap[i] == false) {
			$(content[i]).slideDown();
			serviceTap[i] = true;
		} else {
			$(content[i]).slideUp();
			serviceTap[i] = false;
		}
	});
}

/* Slider */

$(document).ready(function() {
	$('.customers-slider').on('init', function(slick) {
		let customersSlides = document.querySelectorAll('.customers-slide-text');
		let slideTheHeight;

		for(let i = 0, length = customersSlides.length; i < length; i++) {
			if (slideTheHeight != undefined) {
				if (slideTheHeight < customersSlides[i].offsetHeight) {
					slideTheHeight = customersSlides[i].offsetHeight;
				}
			} else {
				slideTheHeight = customersSlides[i].offsetHeight;
			}

			if (i + 1 == length) {
				for(let i = 0, length = customersSlides.length; i < length; i++) {
					customersSlides[i].style.height = slideTheHeight + 'px';
				}
			}
		}
	});

	$('.customers-slider').slick({/*
		autoplay: true,*/
		vertical: true,
		verticalSwiping: true,
		slidesToShow: 2,
		adaptiveHeight: true,
		prevArrow: $('.customers-prev'),
		nextArrow: $('.customers-next'),
	});
});

/* Tabs */

let teamTabBtn = document.querySelectorAll('.team-tabs-btn');
let teamTab = document.querySelectorAll('.team-tab');
let prevTab;

for(let i = 0, length = teamTabBtn.length; i < length; i++) {
	if (teamTabBtn[i].classList.contains('active')) {
		prevTab = i;
		teamTab[i].classList.add('active');
	}

	teamTabBtn[i].addEventListener('click', function(e) {
		if (prevTab != undefined && i != prevTab) {
			teamTabBtn[prevTab].classList.remove('active');
			teamTab[prevTab].classList.remove('active');
		}

		teamTabBtn[i].classList.add('active');
		teamTab[i].classList.add('active');
		prevTab = i;
	});
}

/* Fixed Menu */

let nav = document.getElementById('nav');
let hide = false;
let prevScroll;

function fixedMenu() {
	if (pageYOffset <= 105) {
		nav.classList.remove('fixed-padding');
		nav.style.paddingRight = '0px';
		hide = false;
		nav.classList.remove('fixed');
	}

	if (pageYOffset > 105) {
		nav.classList.add('fixed');
		nav.classList.add('fixed-padding');
		nav.style.transform = 'translate(0, -110%)';
		nav.style.paddingRight = '20px';
	}

	if (pageYOffset > prevScroll && pageYOffset > 105) {
		if (hide == false) {
			nav.style.opacity = '0';
			hide = true;
		}
		nav.style.transform = 'translate(0, -110%)';
	}

	if (pageYOffset <= prevScroll) {
		nav.style.opacity = '1';
		nav.style.transform = 'none';
	}

	prevScroll = pageYOffset;
}

fixedMenu();

window.addEventListener('scroll', fixedMenu);

/* Popup */

let popup_btn = document.getElementsByClassName('popup-btn');
let unlock = true;
let timeout = 500;

if (popup_btn.length > 0) {
	for(let i = 0, length = popup_btn.length; i < length; i++) {
		popup_btn[i].addEventListener('click', function(e) {
			if (!check.checked) {
				let class_popup = popup_btn[i].className.split('');
				let popupid = '';

				for(let i = 0, length = class_popup.length; i < length; i++) {
					if (class_popup[i] == 'o' && class_popup[i + 1] == 'p' && class_popup[i + 2] == '-') {
						for(let index = i + 3, length = class_popup.length; index < length; index++) {
							if (class_popup[index] != '' && class_popup[index] != ' ') {
								popupid = popupid + class_popup[index];
							} else {
								break;
							}
						}
					}
				}

				openPopup(document.getElementById(popupid));
			}
		});
	}
}

let close_popup = document.getElementsByClassName('close-popup');

if (close_popup.length > 0) {
	for(let i = 0, length = close_popup.length; i < length; i++) {
		close_popup[i].addEventListener('click', function(e) {
			closePopup(close_popup[i].closest('.popup'));
		});
	}
}

function openPopup(elem) {
	check.checked = false;
	burgBodyUnLock();

	if (nav.classList.contains('fixed')) {
		nav.style.transform = 'translate(0, -110%)';
	}

	if (elem && unlock && !check.checked) {
		let popupActive = document.querySelector('.popup.open');

		if (popupActive) {
			closePopup(popupActive, false);
		} else {
			bodyLock();
		}

		elem.classList.add('open');
		elem.addEventListener('click', function(e) {
			if (!e.target.closest('.popup-body')) {
				closePopup(e.target.closest('.popup'));
			}
		});
	}
}

function closePopup(elem, doUnlock = true) {
	if (unlock) {
		elem.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth;

	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			if (fixed_padding[i].classList.contains('nav') && fixed_padding[i].classList.contains('fixed')) {
				paddingValue = paddingValue + 20;
			}
			fixed_padding[i].style.paddingRight = paddingValue + 'px';
			paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
		}
	}

	body.style.paddingRight = paddingValue + 'px';
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (fixed_padding.length > 0) {
			for(let i = 0, length = fixed_padding.length; i < length; i++) {
				if (fixed_padding[i].classList.contains('nav') && fixed_padding[i].classList.contains('fixed')) {
					fixed_padding[i].style.paddingRight = '20px';
					continue;
				}
				fixed_padding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if (e.which === 27) {
		closePopup(document.querySelector('.popup.open'));
	}
});

/* Smooth */

window.onload = function() {
	let anchors = document.querySelectorAll('._scroll-to');

	for(let i = 0, length = anchors.length; i < length; i++) {
		anchors[i].addEventListener('click', function(e) {
			let class_anchors = anchors[i].className.split('');
			let blockid = '';
			for(let i = 0, length = class_anchors.length; i < length; i++) {
				if (class_anchors[i] == '_' && class_anchors[i + 1] == 's' && class_anchors[i + 2] == '-') {
					for(let index = i + 3, length = class_anchors.length; index < length; index++) {
						if (class_anchors[index] !== '' && class_anchors[index] !== ' ') {
							blockid = blockid + class_anchors[index];
						} else {
							break;
						}
					}
				}
			}

			function scrollValue() {
				if (document.getElementById(blockid).offsetTop > pageYOffset) {
					return document.getElementById(blockid).offsetTop;
				}

				if (document.getElementById(blockid).offsetTop <= pageYOffset) {
					return document.getElementById(blockid).offsetTop - nav.offsetHeight;
				}
			}

			let scroll = scrollValue();

			window.scrollTo({
				top: scroll,
				behavior: 'smooth',
			});
		});
	}
}

/* Active */

let menu = document.querySelector('.nav-menu');
let menu_txt = document.querySelectorAll('.top-menu .nav-menu-link');
let heightV = 0;
let widthV = 0;
let body_height = 0;
let scroll = [];
let max_scroll = [];
let prevMenu;

function active_else() {
	heightV = document.body.clientHeight;
	widthV = document.body.clientWidth;
	body_height = document.body.scrollHeight;

	for(let i = 0, length = menu_txt.length; i < length; i++) {
		let class_name = menu_txt[i].className.split('');
		let blockId = '';

		for(let i = 0, length = class_name.length; i < length; i++) {
			if (class_name[i] == '_' && class_name[i + 1] == 's' && class_name[i + 2] == '-') {
				for(let index = i + 3, length = class_name.length; index < length; index++) {
					if (class_name[index] !== '' && class_name[index] !== ' ') {
						blockId = blockId + class_name[index];
					} else {
						break;
					}
				}
			}
		}

		scroll[i] = document.getElementById(blockId).offsetTop - nav.offsetHeight;
		max_scroll[i] = document.getElementById(blockId).offsetHeight + scroll[i];
	}

	for(let i = 0, length = menu_txt.length; i < length; i++) {
		if (i == 0 && pageYOffset >= scroll[i] || i > 0 && pageYOffset >= scroll[i] && pageYOffset > scroll[i - 1]) {
			if (!(prevMenu == undefined)) {
				menu_txt[prevMenu].classList.remove('active');
			}

			if (pageYOffset <= max_scroll[i]) {
				menu_txt[i].classList.add('active');
				prevMenu = i;
			}
		} else {
			menu_txt[i].classList.remove('active');
		}
	}
}

active_else();

window.addEventListener('scroll', function(e) {
	if (!(menu.style.display == 'none')) {
		if (document.body.clientHeight == heightV && document.body.clientWidth == widthV && document.body.scrollHeight == body_height) {
			for(let i = 0, length = menu_txt.length; i < length; i++) {
				if (i == 0 && pageYOffset >= scroll[i] || i > 0 && pageYOffset >= scroll[i] && pageYOffset > scroll[i - 1]) {
					if (!(prevMenu == undefined)) {
						menu_txt[prevMenu].classList.remove('active');
					}

					if (pageYOffset <= max_scroll[i]) {
						menu_txt[i].classList.add('active');
						prevMenu = i;
					}
				} else {
					menu_txt[i].classList.remove('active');
				}
			}
		} else {
			active_else();
		}
	}
});

/* Aminate Page */

let animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
	function animItemsFunc() {
		for(let i = 0, length = animItems.length; i < length; i++) {
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItems[i].offsetHeight / animStart;

			if (animItems[i].offsetHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > offset(animItems[i]).top - animItemPoint) && pageYOffset < (offset(animItems[i]).top + animItems[i].offsetHeight)) {
				animItems[i].classList.add('active');
			}
		}
	}
	function offset(elem) {
		let rect = elem.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
	}

	window.addEventListener('scroll', animItemsFunc);
	setTimeout(animItemsFunc, 300);
}