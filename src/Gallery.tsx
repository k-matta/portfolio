import { createElement, JSX } from 'react'
import arrow from './assets/arrowhead.png'
import LoadingGallery from './LoadingGallery'
import './Gallery.css'

export type imgData = {
	key: string;
	title: string;
	caption: string;
};

// Create the image galleries for the projects list
export function Gallery({ imageData, folder, setOverlay }: { imageData: Array<imgData>, folder: string, setOverlay: Function }) {
	// Handle missing images
	if (!imageData || !imageData.length) return <LoadingGallery />

	// Create gallery
	return <section className='gallery'>
		<h2 className="image-title">Images</h2>
		<section className='gallery-and-arrows'>
			<section className='gallery-display'>
				{createImages(imageData, folder, setOverlay)}
			</section>
			<button
				type="button"
				className="left gallery-arrow"
				onClick={(event) => {
					// Get the gallery object
					const gallery = event.currentTarget.parentElement!.firstElementChild!.firstElementChild as HTMLElement; // Non-null assertion can be used because the gallery's structure is strictly defined here.
					// Get the current transform amount as a string
					const strTransform = gallery.style.transform;
					// Get the current transform amount as a number, then shift by one image to the left
					let numTransform = Number(strTransform.slice(16, strTransform.indexOf('%')));
					numTransform += 100;

					// If moving beyond the first image, wrap to the end
					if (numTransform > 0) numTransform -= (imageData.length)*(100);
					
					// Apply the transform
					gallery.style.transform = `translateX(calc(${numTransform}% - ${numTransform/(-5)}px))`;
				}}
				>
				<img src={arrow} width="40px" height="40px"/>
			</button>
			<button
				type="button"
				className="right gallery-arrow"
				onClick={(event) => {
					
					// Get gallery and transform amount, then shift by one image to the right
					const gallery = event.currentTarget.parentElement!.firstElementChild!.firstElementChild as HTMLElement;
					const strTransform = gallery.style.transform;
					let numTransform = Number(strTransform.slice(16, strTransform.indexOf('%')));
					numTransform -= 100;

					// If moving beyond the last image, wrap to the start
					if (numTransform <= imageData.length*(-100)) numTransform = -(Math.abs(numTransform)%(imageData.length*(100)));

					// Apply the transform
					gallery.style.transform = `translateX(calc(${numTransform}% - ${numTransform/(-5)}px))`;
				}}
				>
				<img src={arrow} width="40px" height="40px"/>
			</button>
		</section>
	</section>
}

// Create the image elements with their captions based on the provided JSON data
function createImages(images: Array<imgData>, folder: string, setOverlay: Function): JSX.Element {
	const figures = [];
	for (let image of images) {
		const capTitle = createElement('span', {className: 'caption-title'}, image.title);
		const caption = createElement('figcaption', { className: 'gallery-caption' }, capTitle, createElement('br'), image.caption, createElement('br'), createElement('span', {className: "image-count"}, `${images.indexOf(image)+1}/${images.length}`));
		const imageEl = createElement('img', { src: `./${image.key}`, className: 'gallery-image', onClick: () => {setOverlay(`./${image.key}`)} });
		figures.push(createElement('figure', { className: 'gallery-figure', key: `${image.key + Math.random()}` }, imageEl, caption));
	}

	// The transform property powers the gallery's ability to switch between images
	return (
		<section style={{transform: `translateX(0%)`}} className='gallery-images'>
			{figures}
		</section>
	);
}
