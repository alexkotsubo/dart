'use strict';
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
});

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			fixed_padding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			fixed_padding[i].style.paddingRight = '0px';
		}
	}

	body.style.paddingRight = '0px';
	body.classList.remove('lock');
}