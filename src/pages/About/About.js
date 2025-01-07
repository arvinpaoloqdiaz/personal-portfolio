import "./About.css";
import {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import grad from "../../assets/images/no-background-graduate.png";
import Links from "../../assets/data/Links.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload, faSchool, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import {CarouselData} from "../../assets/data/CarouselData.js";
import Carousel from "../../components/Carousel/Carousel.js";
import Card from "../../components/Card/Card.js";
import Education from "../../components/Education/Education.js";
import Work from "../../components/Work/Work.js";
import {ThreeDot} from 'react-loading-indicators';

export default function About(){
	const[loading,setLoading] = useState(true);
	const[mySkills, setMySkills] = useState("");
	const[isEducation, setIsEducation] = useState(false);
	
	useEffect(() => {
		const timeoutId = setTimeout(() => {
	      setLoading(false);
	    }, 12000);

	    // Cleanup function to clear the timeout if the component unmounts
	    return () => clearTimeout(timeoutId);
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
						<p>I'm a career shifter from the Electronics Engineering Industry. Currently focusing on <strong>PHP</strong>, <strong>MySQL</strong>, and <strong>Laravel</strong></p>
					</Row>
					<Row xs={{order:3,span:12}} className="mt-4 d-flex justify-content-center justify-content-md-start">
						<a href={Links[0].link_url} target="_blank" className="btn btn-accent mx-3 w-50">My Resume <FontAwesomeIcon icon={faDownload}/></a>
					</Row>
				</Col>
				<Col xs={{order:1,span:12}} md={{order:2,span:6}}>
					<img src={grad} className=" grad-img img-fluid img-animate"/>
				</Col>
			</Row>
			</div>
			<Row className="mt-5">
				<Col className="text-center">
					<h2>Technology</h2>
					<h6>Skillset</h6>
				</Col>
			</Row>
			<Row className="carousel-container">
			
			{loading?<div className="loading-container"><div className="loading-carousel"><ThreeDot variant="bounce" color="#28a745" size="large" /></div></div>:''}
			
			<Row className="pt-3" container-fluid>
				<Carousel CarouselData={CarouselData.Carousel1} reverse={false}/>
			</Row>
			<Row className="py-3">
				<Carousel CarouselData={CarouselData.Carousel2} reverse={true}/>
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