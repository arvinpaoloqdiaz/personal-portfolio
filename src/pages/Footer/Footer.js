import "./Footer.css";
import {Container, Row, Col} from "react-bootstrap";
import Socials from "../../components/Socials/Socials.js";
export default function Footer(){
	return(
		<div className="footer__page" id="Footer">
		<Container className="footer__container mt-5 pt-4 pb-1 px-5" fluid >
		<Row>
		<Col>
			<h4>About Me</h4>
			<h2>I'm a Web Developer.</h2>
			<h2>Enjoys Coding.</h2>
			<h2>Driven.</h2>
		</Col>
		<Col>
			<Row className="text-end">
			<h3>Contact Me</h3>
			<p>+63 927 322 2484</p>
			<p>arvinpaoloq.diaz@gmail.com</p>
			</Row>
			<Row>
				<Socials socialsClass={["d-flex justify-content-center justify-content-md-end","gap-4"]}/>
			</Row>
		</Col>
		</Row>
		<Row className="footer">
			<span>
			<span className="d-none d-md-inline">Arvin Paolo Diaz</span>
			<span className="d-none d-md-inline">|</span>
			<span>Copyright &copy; 2024</span>
			<span className="d-none d-md-inline">|</span>
			<span className="d-none d-md-inline">Web Developer</span>
			</span>
		</Row>
		</Container>
		</div>
		)
}