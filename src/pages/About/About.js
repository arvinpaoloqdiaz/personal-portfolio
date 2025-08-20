import "./About.css";
import {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import grad from "../../assets/images/no-background-graduate.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload, faSchool, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import Carousel from "../../components/Carousel/Carousel.js";
import Education from "../../components/Education/Education.js";
import Work from "../../components/Work/Work.js";

export default function About(){
	const [carouselData, setCarouselData] = useState({ Carousel1: [], Carousel2: [] });
	const[isEducation, setIsEducation] = useState(false);
	
	useEffect(() => {
		fetch("https://raw.githubusercontent.com/arvinpaoloqdiaz/files/json/CarouselData.json")
        .then((res) => res.json())
        .then((data) => setCarouselData(data))
        .catch((err) => console.error("Error fetching carousel data:", err));
	},[])
	return(
		<Container className="">
			<Row>
				<Col className="text-center">
					<h1>About Me</h1>
				</Col>
			</Row>
			<div className="d-flex justify-content-center">
			<Row className="text-center container-primary ">
				<Col className="align-self-center pe-3" xs={{order:2,span:12}} md={{order:1,span:6}}>
					<Row className="text-center text-md-start mt-3">
						<p className="text-justify">
                            I'm a career shifter from the <em>Electronics Engineering</em> industry, now pursuing my passion in web development. I am  focusing on <strong>PHP</strong>, <strong>MySQL</strong>, and <strong>CodeIgniter</strong>.<br/> <br />
                            Currently, I'm also exploring <strong>DevOps</strong> practices to broaden my skill set. I bring engineering precision, problem-solving skills, 
                            and a strong drive to learn new tools and technologies to every project I work on.
                            </p>

					</Row>
					<Row xs={{order:3,span:12}} className="mt-4 d-flex justify-content-center">
						<a href="https://raw.githubusercontent.com/arvinpaoloqdiaz/files/resume/Arvin%20Paolo%20Diaz%20-%20Resume.pdf" className="btn btn-brand mx-3 w-75" download>Download my Resume <FontAwesomeIcon icon={faDownload}/></a>
					</Row>
				</Col>
				<Col xs={{order:1,span:12}} md={{order:2,span:6}}>
					<img src={grad} className=" grad-img img-fluid img-animate"alt="grad-pic"/>
				</Col>
			</Row>
			</div>
			<Row className="mt-5">
				<Col className="text-center">
					<h2>Technology</h2>
					<h6>Skillset</h6>
				</Col>
			</Row>
			<Row className="carousel-container" container-fluid>
			
			{/* {loading?<div className="loading-container"><div className="loading-carousel"><ThreeDot variant="bounce" color="#28a745" size="large" /></div></div>:''} */}
			
			<Row className="pt-3">
            <Carousel CarouselData={carouselData.Carousel1} reverse={false}/>
            </Row>
            <Row className="py-3">
            <Carousel CarouselData={carouselData.Carousel2} reverse={true}/>
            </Row>

			</Row>
			<Row className="my-5">
				<Col className="text-center">
					<h2>Qualifications</h2>
					<h6>Current Experience</h6>
				</Col>
			</Row>
			<Row className="qualifications__tab">
				<span className={isEducation ? "h3 qualifications__active" : "h3"}><button onClick={e => {e.preventDefault(); setIsEducation(true)}}><div className={"qualifications__icon"}><FontAwesomeIcon icon={faSchool}/></div><div>Education</div></button></span>
				<span className={!isEducation ? "h3 qualifications__active" : "h3"}><button onClick={e => {e.preventDefault(); setIsEducation(false)}}><div className={"qualifications__icon"}><FontAwesomeIcon icon={faBriefcase}/></div><div>Work</div></button></span>
			</Row>
			{
				(isEducation)?
			<Row>
				<Col>
					<Education/>
				</Col>
			</Row>
			:
			<Row className="mt-5">
				<Col>
					<Work/>
				</Col>
			</Row>
			}
		</Container>
	)
}