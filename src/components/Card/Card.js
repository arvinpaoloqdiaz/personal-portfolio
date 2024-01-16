import "./Card.css";
import {useState, useEffect} from "react";
import {Col,Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCertificate } from '@fortawesome/free-solid-svg-icons';

export default function Card({title, entries, softSkill}){
	const [skillEntries,setSkillEntries] = useState("");
	function getEntries(){
		let entriesList = entries.map((entry,index) => {
			return(
				<Col xs={6} key={index} className="g-0 ps-4 pe-0 m-0">
				<div className="list__item"> <FontAwesomeIcon icon={faCertificate} className="bullet__icon"/>{entry}</div>
				</Col>
			)
		})
		setSkillEntries(entriesList);
	}
	useEffect(() => {
		getEntries();
	},[])
	return(
		<Col className="p-2" xs={12} md={softSkill ? false : 6} lg={softSkill ? false : 4}>
			<div className={"border custom-card h-100 p-2 " + (softSkill ? "soft__shadow" : "hard__shadow" )}>
			<Row><p className="text-center h4 py-3">{title}</p></Row>
			<Row className="h6  list__format">{skillEntries}</Row>
			</div>
		</Col>
	)
}