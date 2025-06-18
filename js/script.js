// Initialize Lenis
document.addEventListener("DOMContentLoaded", () => {
	const lenis = new Lenis();
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
});

// Register Gsap Plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

// Main Menu
document.addEventListener("DOMContentLoaded", () => {
	// Menu BG
	const menuBg = document.getElementById("menu-bg");
	const isDesktop = window.innerWidth >= 1024;
	const triggerPoint = window.innerHeight * 0.5;
	let totalWidth = 0;
	if (isDesktop) {
		const menu = document.querySelector("#main-menu ul");
		const items = Array.from(menu.children);
		const wrapper = document.createElement("div");
		wrapper.className = "flex absolute right-1/2 bottom-1/2 translate-1/2 ";
		menu.insertBefore(wrapper, items[0]);
		// Move all except the last 2 items into the wrapper
		items.slice(0, -2).forEach((item) => wrapper.appendChild(item));
		totalWidth = wrapper.offsetWidth + 8;
		menuBg.style.width = `${totalWidth}px`;
	}
	window.addEventListener("scroll", () => {
		const y = window.scrollY;
		const isMobile = window.innerWidth <= 1023;
		let width;
		if (y >= triggerPoint) {
			width = "100%";
		} else {
			width = isMobile ? "40px" : `${totalWidth}px`;
		}
		gsap.to(menuBg, { width, duration: 0.5 });
	});
	// Menu BG Height
	const header = document.querySelector("header").offsetHeight + 8;
	menuBg.style.height = `${header}px`;

	// Menu Offcanvas
	if (window.innerWidth <= 1023) {
		// Setup GSAP timeline for mobile menu animation, paused initially
		let gsapTl = gsap.timeline({ paused: true });
		gsapTl.to("#main-menu", { right: 0, duration: 0.5 });
		// Animate menu items fading and sliding up with stagger
		gsapTl.from("#main-menu .menu-item a", {
			y: 30,
			opacity: 0,
			stagger: { amount: 0.25 },
		});
		gsapTl.to("#main-menu", { background: "#00000085" }, "-=.8");
		// Open menu on clicking menu-open button
		document.getElementById("menu-open").addEventListener("click", () => {
			gsapTl.timeScale(1).play();
		});
		// Close menu on clicking menu-close button, play animation faster
		document.getElementById("menu-close").addEventListener("click", () => {
			gsapTl.timeScale(1.5).reverse();
		});
	}
});

// Initialize Slider
document.addEventListener("DOMContentLoaded", () => {
	function initializeSwiper(selector) {
		return new Swiper(selector, {
			freeMode: true,
			loop: true,
			speed: 7000,
			spaceBetween: 30,
			autoplay: {
				delay: 0,
				pauseOnMouseEnter: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				640: {
					slidesPerView: 2,
				},
				1280: {
					slidesPerView: 3,
				},
				1536: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			},
		});
	}

	// Initialize Sliders
	initializeSwiper(".citySlider");
});

// On Hover Video Play
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".citySlider video").forEach((video) => {
		video.addEventListener("mouseenter", () => {
			video.currentTime = 0;
			video.play();
		});
		video.addEventListener("mouseleave", () => video.pause());
	});
});
