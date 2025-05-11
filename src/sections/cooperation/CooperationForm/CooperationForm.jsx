import "./CooperationForm.scss"
import Image from "next/image"
import ContactForm from "@/components/ContactForm/ContactForm"

const CooperationForm = () => {

	return (
		<section className="CooperationForm">
			<div className="container">
				<div className="CooperationForm__wrapper">
					<Image className="CooperationForm__image" src={"/images/cooperation/BOTTOM.webp"} alt="About Form" width={400} height={500} />
					<div className="CooperationForm__form">
						<ContactForm alternate={true} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default CooperationForm