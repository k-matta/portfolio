import { createElement, ReactNode } from 'react'
import * as gallery from './Gallery'
import './Project.css'

type projInfo = {
	title: string;
	stack: string;
	info: string;
}

// The full Project section with both project info and an accompanying gallery
function Project({ projectInfo, galleryInfo, id, folder, setOverlay }: { projectInfo: projInfo, galleryInfo: Array<gallery.imgData>, id: string, folder: string, setOverlay: Function } ) {
	return <section className="project" id={id}>
		<section className="project-info">
			<h2 className="project-title">{projectInfo.title}</h2>
			<p className="stack">{projectInfo.stack}</p>
			<p className="info">{parseLinks(projectInfo.info)}</p>
		</section>
		<gallery.Gallery imageData={galleryInfo} folder={folder} setOverlay={setOverlay} />
	</section>
}

// Converts links and line breaks into proper JSX components
function parseLinks(text: string) {
	const links = text.matchAll(/(\[([^\]]+)\]\(([^\)]+)\)|\<br\>)/g);
	const infoItems: Array<ReactNode | string> = [];
	let index = 0;
	for (const link of links) {
		infoItems.push(text.slice(index, link.index))
		index = link.index + link[0].length;
		link[0] == "<br>" ? infoItems.push(createElement('br', {key: link.index})) : infoItems.push(createElement('a', {href: link[3], key: link.index}, link[2]));
	}
	infoItems.push(text.slice(index));
	return infoItems;
}

export default Project;