"use strict";
window.addEventListener("DOMContentLoaded", function () {
	// tab logic start
	const tabsHeaders = document.querySelectorAll(".tabheader__item ");
	const tabsContents = document.querySelectorAll(".tabcontent");
	const tabsHeadersParent = document.querySelector(".tabheader__items");

	function hideTabContent() {
		tabsContents.forEach(tabContent => {
			tabContent.classList.add("hide");
			tabContent.classList.remove("show", "fade");
		});
		tabsHeaders.forEach(tabHeader => tabHeader.classList.remove("tabheader__item_active"));
	}

	function showTabContent(i = 1) {
		tabsContents[i].classList.add("show", "fade");
		tabsContents[i].classList.remove("hide");
		tabsHeaders[i].classList.add("tabheader__item_active");
	}

	hideTabContent();
	showTabContent();

	tabsHeadersParent.addEventListener("click", (e) => {
		if (e.target && e.target.matches(".tabheader__item")) {
			tabsHeaders.forEach((tabHeader, index) => {
				if (e.target === tabHeader) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});
	// tab logic end

	// timer logic start
	function getTimeRemaining(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date());
		let days, hours, minutes, seconds;

		if (total <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(total / (1000 * 60 * 60 * 24));
			hours = Math.floor((total / (1000 * 60 * 60) % 24));
			minutes = Math.floor((total / 1000 / 60) % 60);
			seconds = Math.floor((total / 1000) % 60);
		}

		return {
			total,
			days,
			hours,
			minutes,
			seconds
		}
	}

	function setZero(n) {
		return n >= 0 && n < 10 ? `0${n}` : n;
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const daysBlock = timer.querySelector("#days");
		const hoursBlock = timer.querySelector("#hours");
		const minutesBlock = timer.querySelector("#minutes");
		const secondsBlock = timer.querySelector("#seconds");
		const timerId = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);

			daysBlock.textContent = setZero(days);
			hoursBlock.textContent = setZero(hours);
			minutesBlock.textContent = setZero(minutes);
			secondsBlock.textContent = setZero(seconds);

			if (total <= 0) {
				clearInterval(timerId);
			}
		}
	}

	setClock(".timer", "2023-07-17 22:00:00");
	// timer logic end

	// modal logic start
	const modalTrigger = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");

	modalTrigger.forEach(btn => btn.addEventListener("click", openModal));

	function closeModal() {
		modal.classList.remove("show");
		modal.classList.add("hide");
		document.body.removeAttribute("style");
	}

	function openModal() {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden";
		// clearTimeout(modalTimerId);
	}

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			closeModal();
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.matches(".show")) {
			closeModal();
		}
	});

	// const modalTimerId = setTimeout(openModal, 600000);

	function showModalByScroll() {
		// if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
		// 	openModal();
		// 	window.removeEventListener("scroll", showModalByScroll);
		// }
		if (window.scrollY >= 2000) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);

	// modal logic end

	// used Class for menu cards => start
	// class MenuCard {
	// 	constructor(img, alt, title, descr, price, parentSelector) {
	// 		this.img = img;
	// 		this.alt = alt;
	// 		this.title = title;
	// 		this.descr = descr;
	// 		this.price = price;
	// 		this.parent = document.querySelector(parentSelector);
	// 		this.transfer = 27;
	// 		this.changeToUAH();
	// 	}

	// 	changeToUAH() {
	// 		this.price = +this.price * this.transfer;
	// 	}

	// 	render() {
	// 		const { img, alt, title, descr, price, parent } = this;
	// 		const element = document.createElement("div");
	// 		element.classList.add("menu__item");
	// 		element.innerHTML = `
				// <img src=${img} alt=${alt}>
				// <h3 class="menu__item-subtitle">${title}</h3>
				// <div class="menu__item-descr">${descr}</div>
				// <div class="menu__item-divider"></div>
				// <div class="menu__item-price">
				// 	<div class="menu__item-cost">Цена:</div>
				// 	<div class="menu__item-total"><span>${price}</span> грн/день</div>
				// </div>
	// 		`;

	// 		parent.append(element);
	// 	}
	// };

	// getData("http://localhost:8888/menu")
	// 	.then(data => data.forEach(({ img, altimg, title, descr, price }) => {
	// 		new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
	// 	}));

	// getData("http://localhost:8888/menu")
	// 	.then(data => createMenuCards(data));

	axios.get("http://localhost:8888/menu")
		.then(response => createMenuCards(response.data));

	function createMenuCards (data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			const element = document.createElement("div");
			element.classList.add("menu__item");
			const transfer = 27.59;

			function changeToUAH() {
				price = (parseFloat(price) * parseFloat(transfer)).toFixed(2);
			}

			changeToUAH();

			element.innerHTML = `
					<img src=${img} alt=${altimg}>
					<h3 class="menu__item-subtitle">${title}</h3>
					<div class="menu__item-descr">${descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${price}</span> грн/день</div>
					</div>
			`;

			document.querySelector(".menu .container").append(element);
		});
	}

	// used Class for menu cards => end

	// forms start
	const forms = document.querySelectorAll("form");

	function spinner () {
		return `
			<?xml version="1.0" encoding="utf-8"?>
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<g transform="rotate(0 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(30 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(60 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(90 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(120 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(150 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(180 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(210 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(240 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(270 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(300 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(330 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
				</rect>
			</g>
			<!-- [ldio] generated by https://loading.io/ --></svg>
		`;
	}

	const messages = {
		loading: spinner,
		success: "Thank you ! We will contact with you !",
		failure: "Sorry, but something went wrong !"
	};

	forms.forEach(form => bindPostData(form));

	async function postData (url, data) {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=utf-8"
			},
			body: data
		});

		if (!request.ok) {
			throw new Error();
		}

		return await request.json();
	}

	async function getData (url) {
		const request = await fetch(url);

		if (!request.ok) {
			throw new Error();
		}

		return await request.json();
	}

	function bindPostData (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const {loading, success, failure} = messages;

			const loader = document.createElement("div");
			loader.innerHTML = loading();
			form.append(loader);

			if (!navigator.onLine) {
				messagesModal(failure + ": " + "Please check your internet connection, and try again!");
				loader.remove();
				form.reset();
			}

			const empty = /^$/g;
			const phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
			let status = false;

			for (let i = 0; i < form.querySelectorAll("input").length; i++) {
				if (empty.test(form[i].value) || !phone.test(form[1].value)) {
					status = false;
					messagesModal("Please fill all fields, and on phone field please fill mobile number format");
					loader.remove();
					form.reset();
					break;
				} else {
					status = true;
				}
			}

			if (status) {
				const formData = new FormData(form);
				// const data = JSON.stringify(Object.fromEntries(formData.entries()))
				axios.post("http://localhost:8888/requests", Object.fromEntries(formData))
					.then(res => {
						console.log(res);
						messagesModal(success);
					})
					.catch(err => {
						messagesModal(failure + ": " + err);
					})
					.finally(() => {
						loader.remove();
						form.reset();
					});
			} else {
				console.log("status is false");
			}
		});
	}

	function messagesModal (message) {
		const prevModalDialog = document.querySelector(".modal__dialog");
		prevModalDialog.classList.add("hide");
		openModal();

		const messageModal = document.createElement("div");
		messageModal.classList.add("modal__dialog");
		messageModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close> &times; </div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector(".modal").append(messageModal);

		setTimeout(() => {
			messageModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModal();
		}, 2000);
	}

	// slider
	let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll(".offer__slide");
	const slider = document.querySelector(".offer__slider");
	const prev = document.querySelector(".offer__slider-prev");
	const next = document.querySelector(".offer__slider-next");
	const total = document.querySelector("#total");
	const current = document.querySelector("#current");
	const slidesWrapper = document.querySelector(".offer__slider-wrapper");
	const slidesField = document.querySelector(".offer__slider-inner");
	const width = window.getComputedStyle(slidesWrapper).width;

	checkForZero();

	slidesField.style.cssText = `
		display: flex;
		width: ${100 * slides.length}%;
		transition: all 0.5s;
	`;

	slidesWrapper.style.overflow = "hidden";

	slides.forEach(slide => slide.style.width = width);

	slider.style.position = "relative";

	const indicators = document.createElement("ul");
	const dots = [];
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;

		if (i === 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	next.addEventListener("click", () => {
		sliderLogic(+width.replace(/\D/g, "") * (slides.length - 1), true, false);
		checkForZero();
		dotsLogic();
	});

	prev.addEventListener("click", () => {
		sliderLogic(0, false, true);
		checkForZero();
		dotsLogic();
	});

	dots.forEach(dot => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");
			slideIndex = slideTo;
			offset = +width.replace(/\D/g, "") * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			checkForZero();
			dotsLogic();
		});
	});

	function checkForZero() {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
	}

	function dotsLogic () {
		dots.forEach(dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1;
	}

	function sliderLogic (statment, next = false, prev = false) {
		if (next === true && prev === false) {
			slideIndex === slides.length || slideIndex >= slides.length ? slideIndex = 1 : slideIndex++;
			offset === statment ? offset = 0 : offset += +width.replace(/\D/g, "");
		}

		if (next === false && prev === true) {
			slideIndex === 1 || slideIndex <= 1 ? slideIndex = slides.length : slideIndex--;
			offset === statment ? offset = +width.replace(/\D/g, "") * (slides.length - 1) : offset -= +width.replace(/\D/g, "");
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
	}
});