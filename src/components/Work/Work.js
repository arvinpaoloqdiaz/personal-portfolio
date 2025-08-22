import styles from "./Work.module.css";
import {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

export default function Work({ workList = [] }){
	const [workArr, setWorkArr] = useState([]);
	function isOdd(num){
		if(num%2 ===0){
			return false
		}
		return true
	}
	useEffect(() => {
		const list = Array.isArray(workList)
			? (typeof workList.toReversed === 'function' ? workList.toReversed() : [...workList].reverse())
			: [];
		let myWorkArray= list.map((entry,index) => {
			return(
				<div className={`${styles.children} ${isOdd(index)? styles.qualifications__grid__right : styles.qualifications__grid__left}`}>
				<div></div>
				<div key={index} className={`${styles.qualifications__width} ${isOdd(index) ? styles.qualifications__left : styles.qualifications__right}`} myValue={`${index+1}`}>
					<div className={`${styles.qualifications__container} ${isOdd(index)? styles.container__left : styles.container__right}`}>
					<p className="fw-bold">{entry.company}</p>
					<p>{entry.position}</p>
					<p><FontAwesomeIcon icon={faCalendar} /> {entry.date}</p>
					</div>
				</div>
				<div></div>
				</div>
			)
		})
		setWorkArr(myWorkArray);
	},[workList])
	return(
		<motion.div
			className={styles.list}
			initial="hidden"
			animate="show"
			exit="hidden"
			variants={{
				hidden: { opacity: 0 },
				show: {
					opacity: 1,
					transition: { staggerChildren: 0.06, delayChildren: 0.05 }
				}
			}}
		>
			{Array.isArray(workArr) ? workArr.map((child, idx) => (
				<motion.div className={styles.item} key={idx} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } } }}>
					{child}
				</motion.div>
			)) : null}
		</motion.div>
	)
}