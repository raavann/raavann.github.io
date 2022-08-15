<script lang="ts">

import { onMount } from "svelte";
import { letterSlide, maskSlide } from "../animations";
import { aboutAnchor, clickables, loadPagePromise, slickScrollInstance } from "../store";
import { loadImage } from "../utils";

// DOM Node binds for animations
let aboutSection1Container, aboutSection2Container;
let githubLink, emailLink
let profilePicContainer;
let title, paragraph, image, links;

let allowParagraphDecoratorAnimation = false;

// Initialised custom animations for use with svelte transitions
let textAnimationIn = letterSlide().in;
let maskAnimationIn = maskSlide().in;

// Section two promise which when resolved will trigger svelte animations
let section2InViewResolve;
let section2InViewPromise = new Promise((resolve) => section2InViewResolve = resolve);

onMount(async () => {
	// Wait for page to load
	await loadPagePromise;
	// Set navbar about link's y location to top of aboutContainer
	$aboutAnchor = aboutSection1Container;
	
	// Register links as clickables for cursor dot
	clickables.update(value => [...value, githubLink, emailLink]);

	// Add parallax scrolling offsets to slickScroll
	$slickScrollInstance.addOffset({
		element: profilePicContainer,
		speedY: 0.8
	});

	section1IntroAnimations();
	section2IntroAnimations();
});



// About section before skills
function section1IntroAnimations() {
	// Scroll activated animations powered by anime instead of svelte transitions
	const titleAnimate = letterSlide().in(title, { 
		useAnime: true, 
		delay: 15 
	});
	const paragraphAnimate = letterSlide().in(paragraph, { 
		useAnime: true, 
		delay: 2 
	});
	const linkAnimate = maskSlide().in(links, { 
		delay: 500 
	});
	const imageAnimate = maskSlide().in(image, {
		duration: 1200,
		maskStyles: [
			{ property: "width", value: "100%"},
			{ property: "height", value: "100%"}
		]
	});

	// Run animations when intersection obeserver detects aboutSection1Container to be in scroll view
	let observer = new IntersectionObserver((entries) => { 
		entries.forEach(entry => {
			if (entry.isIntersecting) {

				titleAnimate.anime();
				paragraphAnimate.anime();
				linkAnimate.anime();
				imageAnimate.anime("easeInOutQuint");
				allowParagraphDecoratorAnimation = true;
				
				observer.disconnect();
			}
		});
	}, { root: null, threshold: 0.4 });
	
	observer.observe(aboutSection1Container);
}

// Skills and awards section
function section2IntroAnimations() {
	// Resolve animations promise when intersection obeserver detects aboutSection2Container to be in scroll view
	let observer = new IntersectionObserver((entries) => { 
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				section2InViewResolve();
				
				observer.disconnect();
			}
		});
	}, { root: null, threshold: 0.4 });
	
	observer.observe(aboutSection2Container);
}


</script>
	

<div id="content-container" class="about" bind:this={aboutSection1Container}>
	<h1 style="padding-left: 20px" class:active={allowParagraphDecoratorAnimation}>About</h1>

	<div class="content-wrapper">
		<p class="smallText" style="text-align: left;">Hie there, I'm </p><br><h1 class = "title" bind:this={title}>raavann</h1> <br> <p class="smallText">it's my pen-name</p>
		<p class = "paragraph" class:active={allowParagraphDecoratorAnimation} bind:this={paragraph}>
			<span style="text-decoration:underline"><br>I'm an aspiring software developer, currently in my final year, doing my major in Information Technology from IET-DAVV, Indore. <br><br>
				Besides brainstorming on crazy ideas, you can also talk to me about Anime anytime, I'll be sure to reply if I'm alive.<br> Also, I'm a sweet-tooth~
		</p>
		<div class="social-button-wrapper">
			<div bind:this={links}>
				<span class="button" bind:this={emailLink}><a href="mailto:itsraavann@gmail.com" target="_blank" class="clickable sublink link">Email Me</a></span>
				<span class="button" bind:this={githubLink}><a href="https://github.com/raavann" target="_blank" class="clickable sublink link">Github</a></span>
			</div>
		</div>
	</div>
	<div class="profile-image" bind:this={profilePicContainer}>
		{#await loadImage("https://i.imgur.com/d5LUvCN.jpg") then src}
			<img bind:this={image} src="{src}" alt="raavannProfile" class="profile-pic">
		{/await}
	</div>
</div>

<div class="horizontal-flex" bind:this={aboutSection2Container}>
	{#await section2InViewPromise then _}
		<ul class="list first">
			<li class="list-title">
				<div in:textAnimationIn={{ initDelay: 400 }}>Stuff i use a lot..</div>
			</li>
			<li>
				<div in:textAnimationIn={{ initDelay: 550 }}>Front-end</div>
				<div class="flex-item" in:maskAnimationIn={{ delay: 600 }}>

					<i class="devicon-html5-plain"></i>
					<i class="devicon-css3-plain"></i>
					<i class="devicon-javascript-plain"></i>
					<i class="devicon-react-original"></i>
				</div>
			</li>
			<li>
				<div in:textAnimationIn={{ initDelay: 650 }}>Libraries</div>
				<div class="flex-item" in:maskAnimationIn={{ delay: 700 }}>
					<i class="devicon-threejs-original"></i>
				</div>
			</li>
			<li>
				<div in:textAnimationIn={{ initDelay: 750 }}>Back-end</div>
				<div class="flex-item" in:maskAnimationIn={{ delay: 800 }}>

					<i class="devicon-nodejs-plain"></i>
					<i class="devicon-postgresql-plain"></i>
					<i class="devicon-mongodb-plain"></i>					
					<i class="devicon-express-original"></i>

				</div>
			</li>
			<li>
				<div in:textAnimationIn={{ initDelay: 850 }}>Languages</div>
				<div class="flex-item" in:maskAnimationIn={{ delay: 900 }}>
					<i class="devicon-cplusplus-plain"></i>
					<i class="devicon-python-plain"></i>
				</div>
			</li>
		</ul>

		<ul class="list first">
			<li class="list-title">
				<div in:textAnimationIn={{ initDelay: 400 }}>Stuff i use somewhat..</div>
			</li>
			<li>
				<div in:textAnimationIn={{ initDelay: 650 }}>Mobile</div>
				<div class="flex-item" in:maskAnimationIn={{ delay: 700 }}>
					<i class="devicon-kotlin-plain"></i>
					<i class="devicon-flutter-plain"></i>
				</div>
			</li>
			<li>
				<div in:textAnimationIn={{ initDelay: 750 }}>Back-end</div>
				<div class="flex-item" in:maskAnimationIn={{ delay: 800 }}>
					<i style="font-size: 3rem" class="devicon-nginx-original"></i>
				</div>
			</li>
			<li>
				<div in:textAnimationIn={{ initDelay: 850 }}>Design</div>
				<div class="flex-item" in:maskAnimationIn={{ delay: 900 }}>
					<i class="devicon-figma-plain"></i>
				</div>
			</li>
		</ul>
	{/await}
</div>


<style lang="sass">

@import "../consts.sass"
@include textStyles()

i
	font-size: 1.5rem

#content-container.about
	display: flex
	flex-direction: row
	justify-content: space-between
	overflow: hidden
	padding: 0 5vw
	margin-top: 40vh
	position: relative
	padding-bottom: 5vh

	.profile-image
		width: 70%
		overflow: hidden
		margin-top: -30vh
		position: relative

		img
			height: 80%
			width: 90%
			border-radius: 0.5vh
			object-fit: cover

	.content-wrapper
		box-sizing: border-box
		width: 50%
		height: 100%
		margin: 0 2vw
		padding-right: 4vw
		display: flex
		flex-direction: column
		justify-content: center
		margin-top: 5vh
		box-sizing: border-box
		z-index: 2

		@media only screen and (max-width: 750px)
			&
				width: 80%

				h1
					font-size: 25vw !important

		h1
			font-size: 20vh
			font-weight: 400

		.paragraph
			margin-top: 10vh
			margin-left: 13vw
			position: relative
			width: 60%
			line-height: 1.5rem

			@media only screen and (max-width: 750px)
				&
					width: 100%
					margin-left: 5vw

			&::before
				content: ""
				position: absolute
				height: 1px
				width: 0
				right: 115%
				top: 15%
				background-color: white
				transition: width 0.6s ease

			&.active::before
				width: 10vw
				

		.social-button-wrapper
			font-size: 3vh
			margin-left: 13vw
			margin-top: 4vh
			display: inline-block

			*:not(:last-child)
				margin-right: 2vw

			@media only screen and (max-width: 750px)
				&
					margin-left: 5vw


	@media only screen and (max-width: 950px)
		.right-container
			margin-top: 3vh
			justify-content: flex-start !important

		.profile-image
			display: none

.horizontal-flex
	display: flex
	flex-direction: row
	justify-content: space-between
	padding: 0 13vw
	margin-top: 12vh
	width: 100%
	box-sizing: border-box

	@media only screen and (max-width: 1080px)
		flex-direction: column
		padding: 0 8vw

	.list
		list-style-type: none
		text-align: left

		@media only screen and (max-width: 1080px)
			margin-top: 10vh

		li.list-title
			letter-spacing: 0.6vh
			font-size: 1.3vh
			font-weight: bold

		li
			font-family: $font
			text-transform: uppercase
			font-size: 2vh
			letter-spacing: 0.5vh
			padding: 2vh 0
			border-bottom: 1px solid #444
			display: flex
			flex-wrap: wrap
			flex-direction: row
			justify-content: space-between
			align-items: center
			column-gap: 5vw
			row-gap: 3vh

			img
				height: 2.3vh

</style>