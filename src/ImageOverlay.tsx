import "./ImageOverlay.css"

// The overlay shown when the user clicks on an image
function ImageOverlay({ path, setOverlay }: { path: string, setOverlay: Function }) {
	if (path)
		return <section id='image-overlay'>
			<button type='button' id='image-overlay-close'
				onClick={() => {
					setOverlay('');
				}}
			></button>
			<img id='image-overlay-image' src={path} />
		</section>
	return <section id='image-overlay' style={{display: 'none'}}></section>
}

export default ImageOverlay