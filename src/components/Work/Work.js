import styles from "./Work.module.css";
import {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

export default function Work({ workList = [] }){
	const [workArr, setWorkArr] = useState([]);
	const [selectedEntry, setSelectedEntry] = useState(null);

	function handleOpen(entry){
		setSelectedEntry(entry);
	}

	function handleClose(){
		setSelectedEntry(null);
	}
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
					<div
						className={`${styles.qualifications__container} ${isOdd(index)? styles.container__left : styles.container__right}`}
						onClick={() => handleOpen(entry)}
						role="button"
						tabIndex={0}
						aria-haspopup="dialog"
						aria-label={`View details for ${entry.company}`}
						onKeyDown={(e) => {
							if(e.key === 'Enter' || e.key === ' '){
								e.preventDefault();
								handleOpen(entry);
							}
						}}
					>
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
		<>
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

		<AnimatePresence>
			{selectedEntry ? (
				<motion.div
					className={styles.modalOverlay}
					onClick={handleClose}
					role="dialog"
					aria-modal="true"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.18, ease: 'easeOut' }}
				>
					<motion.div
						className={styles.modalContent}
						onClick={(e) => e.stopPropagation()}
						initial={{ y: 24, opacity: 0, scale: 0.98 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 12, opacity: 0, scale: 0.98 }}
						transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.6 }}
					>
						<div className={styles.modalHeader}>
							<h3 className="m-0">{selectedEntry.company}</h3>
							<button className={styles.modalClose} onClick={handleClose} aria-label="Close">×</button>
						</div>
						<div className={styles.modalBody}>
							<p className="mb-1"><strong>Position:</strong> {selectedEntry.position}</p>
							<p className="mb-1"><strong>Department:</strong> {selectedEntry.department || "N/A"}</p>
							<p className="mb-3"><FontAwesomeIcon icon={faCalendar} /> {selectedEntry.date}</p>
							{Array.isArray(selectedEntry.summary) && selectedEntry.summary.length > 0 ? (
								<ul className={styles.summaryList}>
									{selectedEntry.summary.map((point, i) => (
										<li key={i}>{point}</li>
									))}
								</ul>
							) : null}

							{selectedEntry.description ? (
								<p className="mt-3">{selectedEntry.description}</p>
							) : null}
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
		</>
	)
}