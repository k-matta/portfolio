import { createElement, useState } from "react"
import menu from './assets/menu_icon.png'
import arrow from './assets/arrowhead.png'
import close from './assets/close_arrow.png'
import './Header.css'

let index = 0;
let numProjects = 0;

function nextIndex(): number {
	return index++; // Keeps track of the element's tabIndex
}

// Create the header and nav bar for desktop and mobile devices
function Header({ ids }: { ids: Array<string> }) {
	const [mobileNavState, setMobileNavState] = useState(false);
	return <header>
		<h2>Portfolio</h2>
		<nav id='desktop-nav'>
			<a tabIndex={nextIndex()} className='nav-link'
				onKeyDown={(e)=> {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('about')!.getBoundingClientRect().top + window.pageYOffset - 51.6 }) // The non-null assertion is used liberally as all of these elements are guaranteed to exist by the project structure
				}}
				onClick={()=> {
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('about')!.getBoundingClientRect().top + window.pageYOffset - 51.6 })
				}}
			>About Me</a>
			<div tabIndex={nextIndex()} className='nav-link nav-projects'
				onMouseOver={()=> { // Display and hide the list of projects on hover
					document.getElementById('proj-links')!.style.maxHeight = '300px';
				}}
				onMouseOut={()=> {
					document.getElementById('proj-links')!.style.maxHeight = '0px';
				}}
				onFocus={()=> {
					document.getElementById('proj-links')!.style.maxHeight = '300px';
				}}
				onBlur={()=> {
					document.getElementById('proj-links')!.style.maxHeight = '0px';
				}}
				onKeyDown={(e)=> {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('projects')!.getBoundingClientRect().top + window.pageYOffset - 50 })
				}}
				onClick={()=> {
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('projects')!.getBoundingClientRect().top + window.pageYOffset - 50 })
				}}
			>Projects
				{genProjLinks(ids, index) /* Create the list of projects based on the ids discovered in App.tsx */ }
			</div>
			<a tabIndex={nextIndex()} className='nav-link'
				onKeyDown={(e)=> {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('education-bar')!.getBoundingClientRect().top + window.pageYOffset - 50 })
				}}
				onClick={()=> {
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('education-bar')!.getBoundingClientRect().top + window.pageYOffset - 50 })
				}}
			>Education</a>
			<a tabIndex={nextIndex()} className='nav-link'
				onKeyDown={(e)=> {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('skills-bar')!.getBoundingClientRect().top + window.pageYOffset - 50 })
				}}
				onClick={()=> {
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('skills-bar')!.getBoundingClientRect().top + window.pageYOffset - 50 })
				}}
			>Skills</a>
		</nav>
		<button type='button' id='mobile-nav-button' onClick={() => {
			if (mobileNavState) closeMobileNav(setMobileNavState);
			else openMobileNav(setMobileNavState);
		}}>
			<img src={mobileNavState ? close : menu}/>
		</button>
		<nav id='mobile-nav'>
			<a tabIndex={nextIndex()} className='nav-link'
				onKeyDown={(e)=> {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					closeMobileNav(setMobileNavState);
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('about')!.getBoundingClientRect().top + window.pageYOffset - 51.6 });
				}}
				onClick={()=> {
					closeMobileNav(setMobileNavState);
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('about')!.getBoundingClientRect().top + window.pageYOffset - 51.6 })
				}}
			>About Me</a>
			<button type='button' tabIndex={nextIndex()} className='nav-link nav-projects' id='projects-mobile'
				onClick={()=> {
					if (document.getElementById('projects-mobile')!.style.height.startsWith('calc')) {
						document.getElementById('projects-mobile')!.style.height = `3.5rem`;
						document.getElementById('nav-arrow')!.style.rotate = '90deg';
					} else {
						document.getElementById('projects-mobile')!.style.height = `calc(${numProjects*67.2}px + 3.5rem)`;
						document.getElementById('nav-arrow')!.style.rotate = '270deg';
					}
				}}
			>Projects <img id='nav-arrow' src={arrow}/>
				{genProjLinks(ids, index, true, setMobileNavState)}
			</button>
			<a tabIndex={nextIndex()} className='nav-link'
				onKeyDown={(e)=> {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					closeMobileNav(setMobileNavState);
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('education-bar')!.getBoundingClientRect().top + window.pageYOffset - 50 });
				}}
				onClick={()=> {
					closeMobileNav(setMobileNavState);
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('education-bar')!.getBoundingClientRect().top + window.pageYOffset - 50 });
				}}
			>Education</a>
			<a tabIndex={nextIndex()} className='nav-link'
				onKeyDown={(e)=> {
					if (e.key !== 'Enter' && e.key !== ' ') return;
					closeMobileNav(setMobileNavState);
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('skills-bar')!.getBoundingClientRect().top + window.pageYOffset - 50 });
				}}
				onClick={()=> {
					closeMobileNav(setMobileNavState);
					window.scrollTo({ behavior: 'smooth', top: document.getElementById('skills-bar')!.getBoundingClientRect().top + window.pageYOffset - 50 });
				}}
			>Skills</a>
		</nav>
	</header>
}

function genProjLinks(ids: Array<string>, index: number, mobile: boolean = false, setMobileNavState: Function = () => {}) {
	const linkEls = [];
	if (mobile) numProjects = ids.length;
	for (const id of ids) {
		linkEls.push(
			createElement(
				'a',
				{
					className: 'nav-link projects',
					key: id,
					tabIndex: nextIndex(),
					onClick: (e) => {
						e.stopPropagation();
						if (mobile) closeMobileNav(setMobileNavState);
						window.scrollTo({ behavior: 'smooth', top: document.getElementById(id)!.getBoundingClientRect().top + window.pageYOffset - 51.6 });
					},
					onKeyDown: (e) => {
						if (e.key !== "Enter" && e.key !== ' ') return;
						e.stopPropagation();
						if (mobile) closeMobileNav(setMobileNavState);
						window.scrollTo({ behavior: 'smooth', top: document.getElementById(id)!.getBoundingClientRect().top + window.pageYOffset - 51.6 });
					}
				},
				titleCase(id.replaceAll("-", " "))
			)
		);
	}
	if (mobile) return <div id='proj-links-mobile' style={{height: `${numProjects*67.2}px`}}>{linkEls}</div>;
	return <div id='proj-links'>{linkEls}</div>;
}

function titleCase(text: string): string {
	let words = text.split(' ');
	for (let word = 0; word < words.length; word++) {
		words[word] = words[word][0].toUpperCase() + words[word].slice(1);
	}
	return words.join(" ");
}

function openMobileNav(setMobileNavState: Function) {
	document.getElementById('mobile-nav')!.style.left = '0vw';
	setMobileNavState(true);
}

function closeMobileNav(setMobileNavState: Function) {
	document.getElementById('mobile-nav')!.style.left = '100vw';
	setMobileNavState(false);
	document.getElementById('projects-mobile')!.style.height = `3.5rem`;
	document.getElementById('nav-arrow')!.style.rotate = '90deg';
}

export default Header;