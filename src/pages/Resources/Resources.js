import "./Resources.css";
import {Container, Col, Row} from "react-bootstrap";

export default function Resources(){
	return(
		<Container className="pt-5">
		<h1 className="text-center mt-5">Resources</h1>
		<h5 className="text-center">Tools I Use</h5>
		<Row className="text-center resources__container mt-5">
			<Col xs={12} md={6} lg={4}>
				<h3>Frontend Tools</h3>
				<Col>
					<span>
					<img src="../../images/logo-html5.png"/>
					<span>HTML5</span>
					</span>
					<span>
					<img src="../../images/logo-css3.png"/>
					<span>CSS</span>
					</span>
					<span>
					<img src="../../images/logo-bootstrap.png"/>
					<span>Bootstrap</span>
					</span>
					<span>
					<img src="../../images/logo-javascript.png"/>
					<span>JavaScript</span>
					</span>
				</Col>
			</Col>
			<Col xs={12} md={6} lg={4}>
				<h3>Frameworks</h3>
				<Col>
					<span>
					<img src="../../images/logo-mongodb.png"/>
					<span>MongoDB</span>
					</span>
					<span>
					<img src="../../images/logo-expressjs.png"/>
					<span>Express.js</span>
					</span>
					<span>
					<img src="../../images/logo-react.png"/>
					<span>React.js</span>
					</span>
					<span>
					<img src="../../images/logo-nodejs.png"/>
					<span>Node.js</span>
					</span>
				</Col>
			</Col>
			<Col xs={12} md={12} lg={4}>
				<h3>Repos & IDE</h3>
				<Col>
					<span>
					<img src="../../images/logo-sublime-text-3.png"/>
					<span>Sublime</span>
					</span>
					<span>
					<img src="../../images/logo-postman.png"/>
					<span>Postman</span>
					</span>
					<span>
					<img src="../../images/logo-github(1).png"/>
					<span>GitHub</span>
					</span>
					<span>
					<img src="../../images/logo-git.png"/>
					<span>Git</span>
					</span>
				</Col>
			</Col>
		</Row>
		</Container>
	)
}