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
		totalWidth = wrapper.offsetWidth + 15;
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

// First View
document.addEventListener("DOMContentLoaded", () => {
	let gsapTl = gsap.timeline();
	// Menu
	if (window.innerWidth >= 1024) {
		gsapTl.from("#menu-bg", {
			y: -80,
			opacity: 0,
			duration: 0.4,
		});
		gsapTl.from(
			"#main-menu ul div",
			{
				y: -80,
				opacity: 0,
			},
			"-=0.48"
		);
	}
	// Hero Title
	const heroTtle = "#hero-title";
	new SplitText(heroTtle, {
		type: "lines",
		linesClass: "lineChild",
	});
	new SplitText(heroTtle, {
		type: "lines",
		linesClass: "lineParent",
	});
	gsapTl.fromTo(
		`${heroTtle} .lineChild`,
		{ yPercent: 100, opacity: 0 },
		{
			yPercent: 0,
			opacity: 1,
			duration: 0.5,
			stagger: 0.15,
			ease: "power3.out",
		},
		"-=0.1"
	);
	// Hero Search
	gsapTl.from(
		"#hero-home form",
		{
			width: 0,
			x: 25,
			duration: 0.5,
		},
		"-=0.1"
	);
	gsapTl.from("#hero-sub-title", {
		width: "31px",
		duration: 0.4,
	});
});

// Hero
document.addEventListener("DOMContentLoaded", () => {
	// Open Cursor
	const heroVid = document.getElementById("hero-video");
	const heroCrsr = document.getElementById("hero-cursor");
	heroVid.addEventListener("mouseenter", () => {
		gsap.to(heroCrsr, {
			scale: 1,
			opacity: 1,
		});
	});
	heroVid.addEventListener("mousemove", (e) => {
		gsap.to(heroCrsr, {
			x: e.pageX,
			y: e.pageY,
			duration: 0.6,
		});
	});
	heroVid.addEventListener("mouseleave", () => {
		gsap.to(heroCrsr, {
			scale: 0,
			opacity: 0,
		});
	});

	// Full Video
	let gsapTl = gsap.timeline({ paused: true });
	const heroFulVid = document.getElementById("hero-full-video");
	const closeVid = document.getElementById("close-cursor");
	gsapTl.to(heroFulVid, {
		width: "100vw",
		height: "100vh",
		rotate: 0,
		duration: 0.8,
	});
	gsapTl.to("#video-controls", {
		width: "90%",
	});
	// Open Video
	heroVid.addEventListener("click", () => {
		document.body.classList.add("overflow-hidden");
		closeVid.classList.add("lg:block");
		gsapTl.play();
		heroFulVid.muted = false;
		heroFulVid.play();
	});
	// Close Cursor
	heroFulVid.addEventListener("mousemove", (e) => {
		gsap.to(closeVid, {
			x: e.pageX + 5,
			y: e.pageY - 18,
			duration: 0.6,
		});
	});
	// Close Video
	heroFulVid.addEventListener("click", () => {
		heroFulVid.pause();
		heroFulVid.muted = true;
		gsapTl.reverse();
		document.body.classList.remove("overflow-hidden");
		closeVid.classList.remove("lg:block");
	});

	const playPause = document.getElementById("video-play");
	const progressBar = document.getElementById("video-progress-bar");
	const muteUnmute = document.getElementById("video-unmute");

	// Play/Pause toggle
	playPause.addEventListener("click", function () {
		if (heroFulVid.paused) {
			heroFulVid.play();
			playPause.innerHTML = `<path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd"/>`;
		} else {
			heroFulVid.pause();
			playPause.innerHTML = `<path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />`;
		}
	});
	// Update progress bar during video playback
	heroFulVid.addEventListener("timeupdate", function () {
		progressBar.value =
			(heroFulVid.currentTime / heroFulVid.duration) * 100;
	});
	// Seek video when user interacts with progress bar
	progressBar.addEventListener("input", function () {
		heroFulVid.currentTime =
			(progressBar.value / 100) * heroFulVid.duration;
	});
	// Mute/Unmute toggle
	muteUnmute.addEventListener("click", function () {
		if (heroFulVid.muted) {
			heroFulVid.muted = false;
			muteUnmute.innerHTML = `<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"/> <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z"/>`;
		} else {
			heroFulVid.muted = true;
			muteUnmute.innerHTML = `<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />`;
		}
	});
});
