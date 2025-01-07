import "./Home.css";
import me from "../../assets/images/no-background.png";
import Socials from "../../components/Socials/Socials.js";
import SmallCard from "../../components/SmallCard/SmallCard.js";
import {Row, Col, Container} from "react-bootstrap";
import { TypeAnimation} from "react-type-animation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar, faDiagramProject, faMedal } from '@fortawesome/free-solid-svg-icons';
import ProjectList from "../../assets/data/ProjectList.js";
import CertificatesModal from "../../components/CertificatesModal/CertificatesModal.js";
import CertificatesList from "../../assets/data/CertificatesList.js";
export default function Home(){
	const dateStarted = new Date("October 1, 2023");
	let dateNow = new Date();
	let elapsedMonth = dateNow.getMonth() - dateStarted.getMonth();
	if(elapsedMonth <= 0){
		elapsedMonth= 24 + elapsedMonth;
	}
	return(
		<Container>
			<Row>
				<Col className="text-center">
					<h1>Arvin Paolo Diaz</h1>
				</Col>
			</Row>
			<Row className="h2 text-center">
			
				<Col>
					<TypeAnimation
					sequence={[
						"Frontend",
						5000,
						"Backend",
						5000,
						"Full-Stack",
						5000
						]}
					repeat={Infinity}
					/>
				</Col>	
						
			</Row>
			<Row>
				<Col className="me-0 pe-0 w-100">
					<hr className="divider"/>
				</Col>
				<Col className="h3 text-center mx-0 fit">
					Web Developer
				</Col>
				<Col className="ms-0 ps-0 w-100">
					<hr className="divider"/>
				</Col>
			</Row>
			
			<Row>
				<Col xs={12} lg={6} className="text-center">
					<div>
						<img src={me} className="img-fluid rounded-circle img-shadow"/>
						<Socials socialsClass={["socials__home","socials__border"]}/>
					</div>
				</Col>
				<Col xs={12} lg={6} className="align-self-center">
					<p className="h4">Hello! I'm <strong className="text-main">Arvin</strong>. I'm a Web Developer based in the <strong>Philippines</strong>. I'm very <em>passionate</em> and <em>driven</em> when it comes to my work.</p>
					<Row className="mt-3">
						<Col xs={12} md={4}>
							<SmallCard title={"Experience"} icon={faStar} quantity={`~${Math.floor(elapsedMonth/12)} year ${elapsedMonth%12} months`}/>
						</Col>
						<Col xs={12} md={4}>
							<SmallCard title={<a href="#Projects" className="home__link">Projects</a>} icon={faDiagramProject} quantity={ProjectList.length} subtitle={"deployed"}/>
						</Col>
						<Col xs={12} md={4}>
							<SmallCard title={<CertificatesModal/>} icon={faMedal} quantity={CertificatesList.length} subtitle={"certificates"}/>
						</Col>
						<Col className="mt-4">
							<a className="btn btn-accent" href="#About">Get Started</a>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>		
	)

}