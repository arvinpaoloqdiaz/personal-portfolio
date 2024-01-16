import "./Page.css";

export default function Page({pageId, component}){
	return(
		<section id={pageId} >
			{component}
		</section>
	)
}