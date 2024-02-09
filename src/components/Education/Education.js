import "./Education.css";
import EducationList from "../../assets/data/EducationList.js";
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

export default function Education(){
	const [educList, setEducList] = useState("");
	function isOdd(num){
		if(num%2 ===0){
			return false
		}
		return true
	}
	function getEducationList(){
		let educ = EducationList.toReversed()
		let educationArray= educ.map((entry,index) => {
			return(
				<div className={"children " + (isOdd(index)?"qualifications__grid__right":"qualifications__grid__left")} key={`educ-${index}`}>
				<div></div>
				<div key={index} className={"qualifications__width " + (isOdd(index) ? "qualifications__left" : "qualifications__right")} myValue={`${index+1}`}>
					<div className={"qualifications__container "+(isOdd(index)? "container__left":"container__right")}>
					<p className="fw-bold">{entry.title}</p>
					<p>{entry.subtitle}</p>
					<p><FontAwesomeIcon icon={faCalendar} /> {entry.date}</p>
					</div>
				</div>
				<div></div>
				</div>
			)
		})
		setEducList(educationArray);
	}
	useEffect(() => {
		getEducationList();
	},[])
	return(
		<div>
			{educList}
		</div>
	)
}