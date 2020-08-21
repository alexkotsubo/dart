'use strict';
let menu = document.querySelector('.menu');
let menu_txt = document.querySelectorAll('.menu-links');
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
			if (class_name[i] == 's' && class_name[i + 1] == '-') {
				for(let index = i + 2, length = class_name.length; index < length; index++) {
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
				menu_txt[prevMenu].classList.remove('menu-active');
			}

			if (pageYOffset <= max_scroll[i]) {
				menu_txt[i].classList.add('menu-active');
				prevMenu = i;
			}
		} else {
			menu_txt[i].classList.remove('menu-active');
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
						menu_txt[prevMenu].classList.remove('menu-active');
					}

					if (pageYOffset <= max_scroll[i]) {
						menu_txt[i].classList.add('menu-active');
						prevMenu = i;
					}
				} else {
					menu_txt[i].classList.remove('menu-active');
				}
			}
		} else {
			active_else();
		}
	}
});