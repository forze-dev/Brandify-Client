import "./WorkProccess.scss"
import WorkProccessCard from "./WorkProccessCard/WorkProccessCard"

const WorkProccessConfig = [
	{
		id: 1,
		title: "1. Розробка візуалізації",
		text: "Створюємо дизайн принта логотипу, вносимо правки.",
		image: "/images/common/wp-1.svg"
	},
	{
		id: 2,
		title: "1. Розробка візуалізації",
		text: "Створюємо дизайн принта логотипу, вносимо правки.",
		image: "/images/common/wp-1.svg"
	},
	{
		id: 3,
		title: "1. Розробка візуалізації",
		text: "Створюємо дизайн принта логотипу, вносимо правки.",
		image: "/images/common/wp-1.svg"
	},
	{
		id: 4,
		title: "1. Розробка візуалізації",
		text: "Створюємо дизайн принта логотипу, вносимо правки.",
		image: "/images/common/wp-1.svg"
	},
	{
		id: 5,
		title: "1. Розробка візуалізації",
		text: "Створюємо дизайн принта логотипу, вносимо правки.",
		image: "/images/common/wp-1.svg"
	},
]

const WorkProccess = () => {

	return (
		<section className="WorkProccess">
			<div className="container">
				<h2>Процеси роботи</h2>
			</div>
			<div className="WorkProccess__list">
				{WorkProccessConfig.map((proccessCard, index) => {
					return (
						<div className="WorkProccess__item" key={proccessCard.id + "-WorkProccessCard"}>
							<WorkProccessCard proccessCard={proccessCard} isGray={index % 2 === 0} />
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default WorkProccess