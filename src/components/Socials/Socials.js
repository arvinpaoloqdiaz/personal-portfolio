import "./Socials.css";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import {faLinkedin, faGoogle, faCodepen, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Socials({socialsClass}){
	return(
		<div className={socialsClass[0]}>
		<div className={"socials-bar d-flex " + socialsClass[1]}>
		<span><a href="https://www.linkedin.com/in/arvin-paolo-diaz/" target="_blank"><div><FontAwesomeIcon icon={faLinkedin} className="linkedin"/></div><div>LinkedIn</div></a></span>
		<span><a href="mailto:arvinpaoloq.diaz@gmail.com" target="_blank"><div><FontAwesomeIcon icon={faGoogle} className="google"/></div><div>Gmail</div></a></span>
		<span><a href="https://codepen.io/Arvin-Paolo-Diaz" target="_blank"><div><FontAwesomeIcon icon={faCodepen} className="codepen"/></div><div>CodePen</div></a></span>
		<span><a href="https://github.com/arvinpaoloqdiaz" target="_blank"><div><FontAwesomeIcon icon={faGithub} className="github"/></div><div>GitHub</div></a></span>
		</div>
		</div>
	)
}