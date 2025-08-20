import styles from "./Home.module.css";
import me from "../../assets/images/Arvin-updated.png";
import Socials from "../../components/Socials/Socials.js";
import SmallCard from "../../components/SmallCard/SmallCard.js";
import {Row, Col, Container} from "react-bootstrap";
import { TypeAnimation} from "react-type-animation";
import {faStar, faDiagramProject, faMedal } from '@fortawesome/free-solid-svg-icons';
import ProjectList from "../../assets/data/ProjectList.js";
import { useState, useEffect } from "react";
import CertificatesModal from "../../components/CertificatesModal/CertificatesModal.js";

export default function Home(){
    const [certificates, setCertificates] = useState([]);
	const dateStarted = new Date("October 1, 2023");
	let dateNow = new Date();
	let elapsedMonth = dateNow.getMonth() - dateStarted.getMonth();
	if(elapsedMonth <= 0){
		elapsedMonth= 24 + elapsedMonth;
	}
    useEffect(() => {
    fetch("https://raw.githubusercontent.com/arvinpaoloqdiaz/files/json/CertificatesList.json")
      .then((res) => res.json())
      .then((data) => setCertificates(data.CertificatesList || []))
      .catch((err) => console.error("Error fetching certificates:", err));
  }, []);
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
						5000,
						]}
					repeat={Infinity}
					/>
				</Col>	
						
			</Row>
			<Row className="mb-4">
				<Col className="me-0 pe-0 w-100">
					<hr className={styles.divider}/>
				</Col>
				<Col className={`${styles.fit} h3 text-center mx-0`}>
					Web Developer
				</Col>
				<Col className="ms-0 ps-0 w-100">
					<hr className={styles.divider}/>
				</Col>
			</Row>
			
			<Row>
				<Col xs={12} lg={6} className="text-center">
					<div>
						<img src={me} className={`${styles.imgShadow} img-fluid rounded-circle`}alt="latest-pic"/>
						
					</div>
				</Col>
				<Col xs={12} lg={6} className="align-self-center">
                    <Row>
                        {/* Socials: first on xs, last on md+ */}
                        <Col xs={12} className="order-1 order-md-5">
                        <Socials />
                        </Col>

                        {/* Intro text */}
                        <Col xs={12} className="order-2 order-md-1">
                        <p className="h5 text-justify">
                            Hi, I'm <strong className="text-brand">Arvin</strong> – a Web Developer from the <strong>Philippines</strong>. 
                            I craft interactive, responsive websites with passion and precision.
                        </p>
                        </Col>

                        {/* Cards */}
                        <Col xs={12} md={4} className="order-3 order-md-2">
                        <SmallCard
                            title={"Experience"}
                            icon={faStar}
                            quantity={`~${Math.floor(elapsedMonth/12)} year ${elapsedMonth%12} months`}
                        />
                        </Col>
                        <Col xs={12} md={4} className="order-4 order-md-2">
                        <SmallCard
                            title={<a href="#Projects" className="text-link-brand">Projects</a>}
                            icon={faDiagramProject}
                            quantity={ProjectList.length}
                            subtitle={"deployed"}
                        />
                        </Col>
                        <Col xs={12} md={4} className="order-5 order-md-2">
                        <SmallCard
                            title={<CertificatesModal certificates={certificates} />}
                            icon={faMedal}
                            quantity={certificates.length} 
                            subtitle={"certificates"}
                        />
                        </Col>

                        {/* CTA */}
                        <Col xs={12} className="text-center mt-5 order-last order-md-3">
                        <a className="btn btn-brand w-75 py-2 fs-4" href="#About">Get Started</a>
                        </Col>
                    </Row>
                </Col>
			</Row>
		</Container>		
	)

}