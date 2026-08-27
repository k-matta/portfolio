import { createElement, useState } from 'react'
import Header from './Header'
import ImageOverlay from './ImageOverlay'
import About from './About'
import Project from './Project'
import Education from './Education'
import Skills from './Skills'
import Footer from './Footer'
import './App.css'

export let overlayPath = '';

function App() {

	const [overlayPath, setOverlayPath] = useState('');

	function setOverlay(path: string) {
		setOverlayPath(path);
	}

	// Get all project folders from 'assets'
	const projectArray = import.meta.glob(`./assets/**/data.json`, { eager: true });
	const projectIDs = [];
	const projects = [];

	// Get the id of each project and create a Project React element from the images and JSON file in the folder
	for (const project in projectArray) {
		const folder = project.slice(9, project.indexOf('/', 9));
		const id = folder.slice(folder.indexOf('_')+1).toLowerCase().replaceAll("_", "-");
		const data = projectArray[project] as Record<string, any>;
		projects.push(createElement(Project, {projectInfo: data.default[0], galleryInfo: data.default.slice(1), id, folder, setOverlay, key: folder}));
		projectIDs.push(id);
	}

	// Generates the main page layout. The list of project IDs creates the dropdown list in the nav bar
	return (
		<>
			<Header ids={projectIDs} />
			<ImageOverlay path={overlayPath} setOverlay={setOverlay}/>
			<About />
			<hr id='projects'/>
			<h2 className='title'>Personal Projects</h2>
			{projects}
			<hr id='education-bar'/>
			<Education />
			<hr id='skills-bar'/>
			<Skills />
			<Footer />
		</>
	)
}

export default App