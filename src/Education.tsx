import { createElement } from "react"
import "./Education.css"
import educationData from "./assets/ed.json"

// Generate the education section
function Education() {
	return <section id='education'>
		<h2 className='title'>Education</h2>
		{getEducation(educationData)}
	</section>
}

// The format of the data in ed.json
type EdData = {
	school: string,
	degree: string,
	years: string,
	awards: Array<string>
};

function getEducation(educationData: Array<EdData>) {
	const educationEls = [];

	// Extract data from the education file and format it for display
	for (const education of educationData) {
		const title = createElement('h3', { className: "education-title" }, education.school);
		const time = createElement("h3", { className: "education-time" }, education.years);
		const titleTime = createElement("section", { className: "title-time" }, title, time);

		const awards = [];
		for (const award of education.awards) awards.push(createElement('li', { className: "education-award" }, award));
		const achievementList = createElement('ul', { className: "education-awards" }, ...awards);
		const degreeInfo = createElement('p', { className: "education-details" }, education.degree);
		educationEls.push(createElement('section', { className: "education", key: education.school + education.degree }, titleTime, degreeInfo, achievementList));
	}
	return <section className="education-info">
		{educationEls}
	</section>
}

export default Education