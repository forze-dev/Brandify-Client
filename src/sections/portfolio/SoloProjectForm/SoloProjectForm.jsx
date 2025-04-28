"use client"
import "./SoloProjectForm.scss"
import ContactForm from "@/components/ContactForm/ContactForm"

const SoloProjectForm = () => {
	return (
		<section className="SoloProjectForm">
			<div className="container">
				<ContactForm alternate={true} />
			</div>
		</section>
	)
}

export default SoloProjectForm