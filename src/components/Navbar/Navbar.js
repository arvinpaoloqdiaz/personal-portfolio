import "./Navbar.css";
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse,faUser,faClipboard, faScrewdriverWrench, faAddressBook } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({activeSection}){
	const [isActive, setIsActive] = useState(activeSection);
	useEffect(()=> {
		setIsActive(activeSection)
	},[activeSection])
	return(
		<nav >
		    <div className="nav-logo"><a href="#Home"><span>AP</span><span>QD</span></a></div>
		    <ul className="nav-list">
		   	 
		      <li ><a href="#Home" className={(isActive === "Home")?"active":""}><span className="nav__item">Home</span><FontAwesomeIcon icon={faHouse} className="nav__icon"/></a></li>
		      <li ><a href="#About" className={(isActive === "About")?"active":""}><span className="nav__item">About</span><FontAwesomeIcon icon={faUser} className="nav__icon"/></a></li>
		      <li ><a href="#Projects" className={(isActive === "Projects")?"active":""}><span className="nav__item">Projects</span><FontAwesomeIcon icon={faClipboard} className="nav__icon"/></a></li>
		      <li ><a href="#Resources" className={(isActive === "Resources")?"active":""}><span className="nav__item">Resources</span><FontAwesomeIcon icon={faScrewdriverWrench} className="nav__icon"/></a></li>
		      <li ><a href="#Footer" ><span className="nav__item">Contacts</span><FontAwesomeIcon icon={faAddressBook} className="nav__icon"/></a></li>
		    </ul>
		</nav>
	)
}

