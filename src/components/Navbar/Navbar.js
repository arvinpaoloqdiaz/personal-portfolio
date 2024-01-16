import "./Navbar.css";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse,faUser,faClipboard, faScrewdriverWrench, faAddressBook } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({navRef}){
	const [isActive, setIsActive] = useState("home");
	 const handleClick = (e,page) => {
    setIsActive(page);
  };
	return(
		<nav ref={navRef}>
		    <div className="nav-logo"><a href="#Home"><span>AP</span><span>QD</span></a></div>
		    <ul className="nav-list">
		   	 
		      <li ><a href="#Home" ><span className="nav__item">Home</span><FontAwesomeIcon icon={faHouse} className="nav__icon"/></a></li>
		      <li ><a href="#About" ><span className="nav__item">About</span><FontAwesomeIcon icon={faUser} className="nav__icon"/></a></li>
		      <li ><a href="#Projects" ><span className="nav__item">Projects</span><FontAwesomeIcon icon={faClipboard} className="nav__icon"/></a></li>
		      <li ><a href="#Resources" ><span className="nav__item">Resources</span><FontAwesomeIcon icon={faScrewdriverWrench} className="nav__icon"/></a></li>
		      <li ><a href="#Footer" ><span className="nav__item">Contacts</span><FontAwesomeIcon icon={faAddressBook} className="nav__icon"/></a></li>
		    </ul>
		</nav>
	)
}

