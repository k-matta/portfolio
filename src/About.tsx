import './About.css'
import image from './assets/Code_Icon.avif'

// The "about me" section
function About() {
	return <section id='about'>
		<h1>Karl Matta</h1>
		<section id='about-container'>
			<p id='about-text'>
				I'm a Computer Engineering student at McMaster University. Since first learning to code a few years ago, I have worked hard to grow and improve my skills, working on many personal projects and challenging myself to learn and do more with code.
			</p>
			<img id='about-img' src={image} />
		</section>
	</section>
}

export default About