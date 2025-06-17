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

// Convert English digits to Bangla digits
function toBanglaNumber(num) {
	const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
	return String(num).replace(/\d/g, (d) => banglaDigits[d]);
}
// Achievements Counter
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("#achieve-numbers h2").forEach((el) => {
		const target = +el.getAttribute("data-target");
		const obj = { val: 0 };
		gsap.to(obj, {
			val: target,
			duration: 3,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#achievements",
				start: "top 70%",
			},
			onUpdate: () => {
				const rounded = Math.floor(obj.val);
				el.textContent =
					toBanglaNumber(rounded.toLocaleString("en-US")) + "+";
			},
		});
	});
});
