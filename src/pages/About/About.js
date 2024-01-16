import "./About.css";
import {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import grad from "../../assets/images/no-background-graduate.png";
import cv from "../../assets/documents/resume-arvin-paolo-diaz.pdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload, faSchool, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import HardSkills from "../../assets/data/HardSkills.js";
import SoftSkills from "../../assets/data/SoftSkills.js";
import Card from "../../components/Card/Card.js";
import Education from "../../components/Education/Education.js";
import Work from "../../components/Work/Work.js";

export default function About(){
	const[mySkills, setMySkills] = useState("");
	const[isEducation, setIsEducation] = useState(true);
	function getWork(){
		setIsEducation(false)
	}
	function skillCard(skills){
		let cardArray = skills.map((skill,index) => {
			return(
				<Card title={skill.title} entries={skill.entries} key={index} softSkill={false}/>
			)
		})
		setMySkills(cardArray);
	}
	useEffect(() => {
		skillCard(HardSkills);
	},[])
	return(
		<Container className="mt-5">
			<Row>
				<Col className="text-center">
					<h1>About Me</h1>
				</Col>
			</Row>
			<Row className="text-center">
				<Col className="align-self-center pe-3" xs={{order:2,span:12}} md={{order:1,span:6}}>
					<Row className="text-start">
						<p>I'm a career shifter from the Electronics Engineering Industry. It is a certainly a challenge to shift careers but a wise man once said :</p>
					</Row>
					<Row className="custom-quote text-end">
						
						  <blockquote >
						    <p className="">New situations can be intimidating. You lookin’ around and it’s all scary and different, but you know—meeting them head-on, charging into ‘em like a bull—that’s how we grow as people.</p>
						  </blockquote>
						  <figcaption className="blockquote-footer">
						    Rick Sanchez <cite title="Series Title">in Rick & Morty</cite>
						  </figcaption>
					</Row>
					<Row xs={{order:3,span:12}} className="mt-4">
						<a href={cv} download="Arvin Paolo Diaz - Resume" className="btn btn-accent mx-3 w-50">My Resume <FontAwesomeIcon icon={faDownload}/></a>
					</Row>
				</Col>
				<Col xs={{order:1,span:12}} md={{order:2,span:6}}>
					<img src={grad} className=" grad-img img-fluid"/>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col className="text-center">
					<h2>Skills</h2>
					<h6>Soft & Hard Skills</h6>
				</Col>
			</Row>
			<Row>
				
				{mySkills}
			</Row>
			<Row>
				<Card title={SoftSkills[0].title} entries={SoftSkills[0].entries} softSkill={true}/>
			</Row>
			<Row className="my-5">
				<Col className="text-center">
					<h2>Qualifications</h2>
					<h6>Current Experience</h6>
				</Col>
			</Row>
			<Row className="qualifications__tab">
				<span className={isEducation ? "h3 qualifications__active" : "h3"}><button onClick={e => {e.preventDefault(); setIsEducation(true)}}><div className={"qualifications__icon"}><FontAwesomeIcon icon={faSchool}/></div><div>Education</div></button></span>
				<span className={!isEducation ? "h3 qualifications__active" : "h3"}><button onClick={e => {e.preventDefault(); setIsEducation(false)}}><div className={"qualifications__icon"}><FontAwesomeIcon icon={faBriefcase}/></div><div>Work</div></button></span>
			</Row>
			{
				(isEducation)?
			<Row>
				<Col>
					<Education/>
				</Col>
			</Row>
			:
			<Row className="mt-5">
				<Col>
					<Work/>
				</Col>
			</Row>
			}
		</Container>
	)
}