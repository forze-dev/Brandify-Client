"use client"
import "./CooperationTop.scss"
import { useTranslations } from "next-intl"
import ContactButton from "@/components/ContactButton/ContactButton"
import Image from "next/image"

const CooperationTop = () => {

	const tAH = useTranslations("cooperationPage.top")
	const tAHTexts = tAH.raw("texts")
	const tCC = useTranslations("common")

	return (
		<section className="CooperationTop">
			<div className="container">
				<div className="CooperationTop__wrapper">
					<div className="CooperationTop__content">
						<h1>{tAH("title")}</h1>
						<div className="CooperationTop__content-text">
							{
								tAHTexts && tAHTexts.map((txt, i) => <p key={i + "-txt"}>{txt}</p>)
							}
						</div>
						<ContactButton text={tCC("btn2")} />
					</div>
					<Image src={"/images/cooperation/TOP.webp"} alt="CooperationTop" width={500} height={500} />
				</div>
			</div>
		</section>
	)
}

export default CooperationTop