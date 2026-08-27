import { createElement } from "react"
import "./Skills.css"
import skillData from "./assets/skills.json"

type skillData = {
	name: string,
	skills: Array<string>
};

// Generates the skills section of the portfolio
function Skills() {
	return <section id='skills'>
		<h2 className='title'>Skills</h2>
		{getSkills(skillData)}
	</section>
}

// Fetches the list of skills from the JSON file and turns them into proper JSX elements
function getSkills(skillData: Array<skillData>) {
	const skillEls = [];
	for (const category of skillData) {
		const skillTitle = createElement('h3', { className: 'skill-title' }, category.name);
		const skills = [];
		for (const skill of category.skills) {
			skills.push(createElement('li', { className: "skill" }, skill));
		}
		const skillList = createElement('ul', { className: "skill-list" }, ...skills);
		skillEls.push(createElement('section', { className: "skill-section", key: category.name }, skillTitle, skillList));
	}
	return <section id="skill-container">
		{skillEls}
	</section>
}

export default Skills