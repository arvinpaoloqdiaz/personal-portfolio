import "./Work.css";
import WorkList from "../../assets/data/WorkList.js";
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

export default function Work(){
	const [workArr, setWorkArr] = useState("");
	function isOdd(num){
		if(num%2 ===0){
			return false
		}
		return true
	}
	function getWorkList(){
		let myWork = WorkList.toReversed()
		let myWorkArray= myWork.map((entry,index) => {
			return(
				<div className={"children " + (isOdd(index)?"qualifications__grid__right":"qualifications__grid__left")}>
				<div></div>
				<div key={index} className={"qualifications__width " + (isOdd(index) ? "qualifications__left" : "qualifications__right")} myValue={`${index+1}`}>
					<div className={"qualifications__container "+(isOdd(index)? "container__left":"container__right")}>
					<p className="fw-bold">{entry.company}</p>
					<p>{entry.position}</p>
					<p><FontAwesomeIcon icon={faCalendar} /> {entry.date}</p>
					</div>
				</div>
				<div></div>
				</div>
			)
		})
		setWorkArr(myWorkArray);
	}
	useEffect(() => {
		getWorkList();
	},[])
	return(
		<div>{workArr}</div>
	)
}