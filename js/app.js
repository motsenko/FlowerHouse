//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}

function sliders_bild_callback(params) { }

let slider_about = new Swiper('.product-slider__body', {
	observer: true,
	observeParents: true,
	autoHeight: false,
	spaceBetween: 0,
	slidesPerGroup: 1,
	speed: 800,
	loop: false,
	preloadImages: false,
	lazy: {
		loadOnTransitionStart: false,
		loadPrevNext: false,
	},
	watchSlidesProgress: true,
	watchSlidesVisibility: true,
	pagination: {
		el: '.product-slider__pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.product-slider__arrow_next',
		prevEl: '.product-slider__arrow_prev',
	},
	breakpoints: {
		320: {
			slidesPerColumn: 2,
			slidesPerView: 2,
		},
		992: {
			slidesPerColumn: 1,
			slidesPerView: 4,
		},
	},
});

let sliderProduct = new Swiper('.slider-product', {
	effect: 'fade',
	observer: true,
	observeParents: true,
	spaceBetween: 0,
	slidesPerView: 1,
	speed: 800,
	thumbs: {
		swiper: {
			el: '.secSlider-product__body',
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 25,
			slidesPerGroup: 1,
			speed: 800,
			direction: 'vertical',
			navigation: {
				nextEl: '.secSlider-product__arrow_next',
				prevEl: '.secSlider-product__arrow_prev'
			},
			breakpoints: {
				320: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 3,
				},
			},
		}
	},
});

//Menu
const openMenu = document.querySelector('.icon-menu');
const closeMenu = document.querySelector('.mobile-menu__close');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.querySelector("body");
if (openMenu != null) {
	openMenu.addEventListener('click', function(e) {
		e.stopPropagation();
		mobileMenu.classList.add('_active');
		body.classList.add("_lock");
	});
}
if (closeMenu != null) {
	closeMenu.addEventListener('click', function(e) {
		e.stopPropagation();
		mobileMenu.classList.remove('_active');
		body.classList.remove("_lock");
	});
}
document.addEventListener('click', function(e) {
	const target = e.target;
	const its_mobileMenu = target == mobileMenu || mobileMenu.contains(target);
	const its_closeMenu = target == closeMenu;
	const mobileMenu_is_active = mobileMenu.classList.contains('_active');
	if (!its_mobileMenu && !its_closeMenu && mobileMenu_is_active) {
		mobileMenu.classList.remove('_active');
		body.classList.remove("_lock");
	}
});
//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	let src_value = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
}
//Map
let map;
let marker;
let infoMap;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 49.97541447937802, lng: 36.23714294508476 },
    zoom: 17,
  });

	marker = new google.maps.Marker({
		position: { lat: 49.97541447937802, lng: 36.23714294508476 },
		map: map,
	});

	infoMap = new google.maps.InfoWindow({
		content: '<h3>Цветочный Дом</h3><p>- купить цветы в...</p>'
	});

	marker.addListener('click', function() {
		infoMap.open(map, marker);
	});
}
// auto height slider
window.addEventListener('resize', sliderHeight);
function sliderHeight() {
	let slideProduct = document.querySelector('.slider-product__slide');
	if (slideProduct !== null) {
		let styleProduct = getComputedStyle(slideProduct);
		let slideHeight = parseInt(styleProduct.paddingTop);
		let miniSliderProduct = document.querySelector('.secSlider-product__body');
		if (window.innerWidth < 768) {
			miniSliderProduct.style.height = slideHeight - 90 + 'px';
		} else {
			miniSliderProduct.style.height = slideHeight - 100 + 'px';
		}
	}
}
setTimeout(function () {
	sliderHeight();
}, 10);
//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();