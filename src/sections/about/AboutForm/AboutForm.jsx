import "./AboutForm.scss"
import Image from "next/image"
import ContactForm from "@/components/ContactForm/ContactForm"

const AboutForm = () => {

	return (
		<section className="AboutForm">
			<div className="container">
				<div className="AboutForm__wrapper">
					<Image className="AboutForm__image" src={"/images/about/pana.svg"} alt="About Form" width={500} height={500} />
					<div className="AboutForm__form">
						<ContactForm alternate={true} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutForm