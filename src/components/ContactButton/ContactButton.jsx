"use client"
import ContactForm from "../ContactForm/ContactForm"
import { useModal } from "../Modal/Modal";

const ContactButton = ({ classList, text }) => {
	const { openModal } = useModal();

	const handleOpenModal = () => {
		openModal(<ContactForm />);
	};

	return (
		<button onClick={handleOpenModal} className={classList || "btn"}>{text}</button>
	)
}

export default ContactButton