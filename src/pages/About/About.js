import styles from "./About.module.css";
import {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import Socials from "../../components/Socials/Socials.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload, faSchool, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import Carousel from "../../components/Carousel/Carousel.js";
import Education from "../../components/Education/Education.js";
import Work from "../../components/Work/Work.js";
import { AnimatePresence, motion } from "framer-motion";

export default function About(){
	const [carouselData, setCarouselData] = useState({ Carousel1: [], Carousel2: [] });
	const [workList, setWorkList] = useState([]);
	const [educationList, setEducationList] = useState([]);
	const[isEducation, setIsEducation] = useState(false);
	
	useEffect(() => {
		fetch("https://raw.githubusercontent.com/arvinpaoloqdiaz/files/json/CarouselData.json")
        .then((res) => res.json())
        .then((data) => setCarouselData(data))
        .catch((err) => console.error("Error fetching carousel data:", err));

		fetch("https://raw.githubusercontent.com/arvinpaoloqdiaz/files/json/WorkList.json")
        .then((res) => res.json())
        .then((data) => setWorkList(data))
        .catch((err) => console.error("Error fetching carousel data:", err));

		fetch("https://raw.githubusercontent.com/arvinpaoloqdiaz/files/json/EducationList.json")
        .then((res) => res.json())
        .then((data) => setEducationList(data))
        .catch((err) => console.error("Error fetching carousel data:", err));
	},[])
	return(
		<Container className="mt-5">
			<Row>
				<Col className="text-center">
					<h1>About Me</h1>
				</Col>
			</Row>
			<div className="d-flex justify-content-center">
			<Row className={`text-center ${styles.containerPrimary}`}>
				<Col className="align-self-center pe-3" xs={{order:2,span:12}} md={{order:1,span:12}}>
					<Row className="text-center text-md-start mt-3">
						<p className="text-justify">
							I'm a passionate career shifter from the <em>Electronics Engineering</em> industry, now pursuing my dream in web development. What started as a coding hobby in my free time has evolved into a dedicated career path after completing a comprehensive full-stack developer bootcamp focused on the <abbr title="MongoDB, Express.js, React.js, Node.js">MERN</abbr> stack.<br/><br/>
							
							When I'm not coding, you'll find me gaming, building websites, enjoying series and movies, listening to tech podcasts, and diving into educational content to continuously expand my knowledge. I believe in the power of collaboration and bring my analytical engineering mindset to every project I work on.<br/><br/>
							
							Currently, I'm deeply passionate about full-stack web development, specializing in <strong>PHP</strong>, <strong>MySQL</strong>, and <strong>CodeIgniter</strong>. While I'm committed to mastering the full-stack craft, I'm also exploring <strong>DevOps</strong> practices to broaden my technical expertise and enhance my development workflow. I bring engineering precision, problem-solving skills, and an unwavering drive to learn new technologies to every collaboration.
						</p>
					</Row>

{/* Let's Connect section */}
<Row className="mt-4 d-flex justify-content-center">
    <Col xs={12} className="text-center">
        <h5 className="mb-3">Let's Connect!</h5>
        <p className="mb-3 text-secondary">I'm always open to discussing new opportunities, collaborations, or just chatting about tech.</p>
        
        {/* Socials with better spacing */}
        <div className="">
            <Socials isAbout={true}/>
        </div>
        
        {/* Action buttons */}
        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center w-75 mx-auto">
            <a href="/contact" className="btn btn-outline-brand">Contact Me</a>
            <a href="#Projects" className="btn btn-outline-brand">View My Projects</a>
            <a href="https://github.com/arvinpaoloqdiaz" target="_blank" rel="noreferrer" className="btn btn-outline-brand">Check Out My Code</a>
        </div>
    </Col>
</Row>

{/* Resume download */}
<Row xs={{order:3,span:12}} className="mt-4 d-flex justify-content-center">
    <a href="https://raw.githubusercontent.com/arvinpaoloqdiaz/files/resume/Arvin%20Paolo%20Diaz%20-%20Resume.pdf" className="btn btn-brand mx-3 w-75" download>Download my Resume <FontAwesomeIcon icon={faDownload}/></a>
</Row>
				</Col>
				{/* <Col xs={{order:1,span:12}} md={{order:2,span:6}}>
					<img src={grad} className={`${styles.gradImg} img-fluid img-animate`} alt="grad-pic"/>
				</Col> */}
			</Row>
			</div>
			<Row className="mt-5">
				<Col className="text-center">
					<h2>Technology</h2>
					<h6 className="text-secondary">Skillset</h6>
				</Col>
			</Row>
			<Row className="">
    <Col className="text-center">
        <hr className="w-25 mx-auto" style={{borderColor: 'var(--green-main)', opacity: 0.3}} />
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
			<Row className="mt-5">
				<Col className="text-center">
					<h2>Qualifications</h2>
					<h6 className="text-secondary">Current Experience</h6>
				</Col>
			</Row>
			<Col className="text-center">
				<hr className="w-25 mx-auto" style={{borderColor: 'var(--green-main)', opacity: 0.3}} />
			</Col>
			<Row className="justify-content-center my-4">
				<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent:'center', flexDirection:'column'}}>
					<div
						role="button"
						tabIndex={0}
						aria-pressed={!isEducation}
						onClick={() => setIsEducation(!isEducation)}
						onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setIsEducation(!isEducation); }}
						style={{
							cursor: 'pointer',
							width: '7rem',
							height: '3.5rem',
							borderRadius: '6rem',
							background: isEducation ? 'var(--green-hover)':'var(--green-main)' ,
							position: 'relative',
							transition: 'background 0.3s',
							display: 'flex',
							alignItems: 'center',
							padding: '4px',
						}}
					>
						<div
							style={{
								position: 'absolute',
								left: isEducation ? '0.25rem' : '3.75rem',
								transition: 'left 0.3s',
								width: '3rem',
								height: '3rem',
								borderRadius: '50%',
								background: 'white',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
								zIndex: 2,
								fontSize: '1.5rem',
							}}
						>
							<FontAwesomeIcon icon={isEducation ? faSchool : faBriefcase} style={{ color: isEducation ? 'var(--green-hover)':'var(--green-main)' }} />
						</div>
					</div>
					<div className="h4 mb-0 fw-bold text-brand">{isEducation ? 'My Education': 'My Work'}</div>
				</div>
			</Row>
			
			<Row>
				<Col>
					<AnimatePresence mode="wait">
						<motion.div
							key={isEducation ? 'education' : 'work'}
							style={{ transformOrigin: 'top center' }}
							initial={{ opacity: 0, scaleY: 0.9 }}
							animate={{ opacity: 1, scaleY: 1 }}
							exit={{ opacity: 0, scaleY: 0.95 }}
							transition={{ duration: 0.35, ease: 'easeOut' }}
						>
							<div className="experience-container">
							{isEducation ? <Education educationList={educationList.EducationList}/> : <Work workList={workList.WorkList}/>}
							</div>
						</motion.div>
					</AnimatePresence>
				</Col>
			</Row>
			
		</Container>
	)
}