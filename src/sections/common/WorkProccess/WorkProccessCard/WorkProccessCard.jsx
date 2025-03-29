import "./WorkProccessCard.scss"
import Image from "next/image"

const WorkProccessCard = ({ proccessCard, isGray }) => {
	return (
		<div className={`proccessCard ${isGray ? "gray" : ""}`}>
			<div className="container">
				<div className="proccessCard__wrapper">
					<div className="proccessCard__image">
						<Image width={400} height={265} alt="proccessCard" src={proccessCard.image} />
					</div>
					<figure>
						<Image width={48} height={20} alt="arrow" src={"/icons/custom-arrow.svg"} />
					</figure>
					<div className="proccessCard__content">
						<h3>{proccessCard.title}</h3>
						<p>{proccessCard.text}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WorkProccessCard