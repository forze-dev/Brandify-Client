"user client"

import "./WorkProccess.scss"
import WorkProccessCard from "./WorkProccessCard/WorkProccessCard"
import { useTranslations } from "next-intl"

const WorkProccess = () => {

	const tWP = useTranslations("workProccess")
	const tWPList = tWP.raw("list")

	return (
		<section className="WorkProccess">
			<div className="container">
				<h2>{tWP("title")}</h2>
			</div>
			<div className="WorkProccess__list">
				{
					tWPList && tWPList.map((proccessCard, index) => {
						return (
							<div className="WorkProccess__item" key={proccessCard.id + "-WorkProccessCard"}>
								<WorkProccessCard proccessCard={proccessCard} isGray={index % 2 === 0} />
							</div>
						)
					})
				}
			</div>
		</section>
	)
}

export default WorkProccess