import "./CooperationList.scss"

import { useTranslations } from "next-intl"
import ContactButton from "@/components/ContactButton/ContactButton"

const CooperationList = () => {

	const tCP = useTranslations("cooperationPage.schema")
	const tCPList = tCP.raw("list")
	const tCC = useTranslations("common")

	return (
		<section className="CooperationList">
			<div className="container">
				<h2>{tCP("title")}</h2>
				<div className="CooperationList__wrapper">
					{
						tCPList && tCPList.map((el, i) => <p key={i + "-tcp"}><span>{i + 1}</span>{el}</p>)
					}
				</div>
				<ContactButton text={tCC("btn2")} />
			</div>
		</section>
	)
}

export default CooperationList