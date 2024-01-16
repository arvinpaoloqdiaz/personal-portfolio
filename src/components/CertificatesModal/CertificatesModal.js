import "./CertificatesModal.css";
import {Modal, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
import CertificatesList from "../../assets/data/CertificatesList.js";
export default function CertificatesModal(){
	const [show,setShow] = useState(false);
	const [certs,setCerts] = useState("");

	function getCerts(){
		let certsArr = CertificatesList.map((entries,index) => {
			return(
				<li key={`cert-${index}`} className="cert__item">
				<a href={entries.link} target="_blank">{entries.title}</a>
				<div>Issued by <span>{entries.from}</span></div>
				<div>Issued on <span>{entries.date}</span></div>
				<div>Credential ID: <span>{entries.credential_id}</span></div>
				</li>
			)
		})
		setCerts(certsArr);
	}
	useEffect(() => {
		getCerts();
	},[])
	return(
		<>
			<Button onClick={() => setShow(true)} className="modal__button">
			Certifications
			</Button>

			<Modal
			show={show}
			onHide={() => setShow(false)}
			dialogClassName="modal-90w"
			aria-labelledby="modal-styling-title"
			>
			<Modal.Header closeButton>
			<Modal.Title id="modal-styling-title" className="modal__title">
			Certifications
			</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<ol>
			{certs}
			</ol>
			</Modal.Body>
			</Modal>
		</>
	)
}