import "./SmallCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar, faDiagramProject, faMedal } from '@fortawesome/free-solid-svg-icons';
import CertificatesModal from "../CertificatesModal/CertificatesModal.js";

export default function SmallCard({title, quantity, subtitle, icon}){
	return(
		<div className="text-center card pt-3 mt-3 pb-4">
			<FontAwesomeIcon icon={icon} className="icon my-2"/>
			<p className="h5">{title}</p>
			<div>
			<span className="me-1 quantity">
				{quantity}
			</span>
			<span>
				 {subtitle}
			</span>
			</div>
		</div>
	)
}