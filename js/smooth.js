'use strict';
let nav = document.getElementById('nav');

window.onload = function() {
	let anchors = document.querySelectorAll('._scroll-to');

	for(let i = 0, length = anchors.length; i < length; i++) {
		anchors[i].addEventListener('click', function(e) {
			body.style.overflow = 'auto';
			let class_anchors = anchors[i].className.split('');
			let blockid = '';
			for(let i = 0, length = class_anchors.length; i < length; i++) {
				if (class_anchors[i] == '_' && class_anchors[i] == 's' && class_anchors[i + 1] == '-') {
					for(let index = i + 3, length = class_anchors.length; index < length; index++) {
						if (class_anchors[index] !== '' && class_anchors[index] !== ' ') {
							blockid = blockid + class_anchors[index];
						} else {
							break;
						}
					}
				}
			}

			let scroll = document.getElementById(blockid).offsetTop - nav.offsetHeight;

			window.scrollTo({
				top: scroll,
				behavior: 'smooth',
			});
		});
	}
}