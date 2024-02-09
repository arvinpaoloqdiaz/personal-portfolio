import "./Page.css";

export default function Page({pageId, component, refCallback}){
	return(
		<section id={pageId} ref={refCallback}>
			{component}
		</section>
	)
}