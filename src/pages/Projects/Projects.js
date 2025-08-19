import "./Projects.css";
import ProjectList from "../../assets/data/ProjectList.js";
import {useState, useEffect} from "react";
import {Row, Col, Container} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function Projects(){
	const [projectsList, setProjectsList] = useState("");
	const [selectedValue, setSelectedValue] = useState("all");
	function getProjects(){
		let projectsArr = ProjectList.map((entry,index) => {
			if(!entry.tags.includes(selectedValue)){
				return null
			}
			return(

				<Col xs={12} md={6} lg={3} key={`project-${index}`} className="my-3">
					<div className="h-100 projects__card">
					<p className="text-center m-3 h5">{entry.title}</p>
					<div className="projects__image__container">
					<img src={entry.image_link} className="img-fluid projects__image"/>
					<p className="projects__description">{entry.description}</p>
					</div>
					<div className="projects__btn">
					<a href={entry.button_link} target="_blank" className="projects__btn__project" rel="noreferrer">Project</a>
					<a href={entry.repo_link} target="_blank" className="projects__btn__repo" rel="noreferrer">Repository</a>
					</div>
					</div>
				</Col>
			)
		})
		setProjectsList(projectsArr);
	}
	useEffect(() => {
		getProjects()
	},[selectedValue])
	return(
	
		<Container className="pt-5">
		<Row>
			<h1 className="text-center my-5">Projects</h1>
		</Row>
		<Row>
			<Col className="dropdown__container">
			<select
			value={selectedValue}
			onChange ={e=> setSelectedValue(e.target.value)}
			className="projects__select"
			>
				<option value="all">All</option>
				<option value="frontend">Frontend</option>
				<option value="backend">Backend</option>
				<option value="full-stack">Full-stack</option>
				<option value="capstone">Capstone</option>
				<option value="personal">Personal</option>
			</select>
			<FontAwesomeIcon icon={faChevronDown} className="projects__dropdown__icon down"/>
			<FontAwesomeIcon icon={faChevronUp} className="projects__dropdown__icon up"/>
			</Col>
			<Col className="projects__subtitle">
			<p>Projects</p>
			</Col>
		</Row>
		<Row>
		{projectsList}
		</Row>
		</Container>
		
	)
}
