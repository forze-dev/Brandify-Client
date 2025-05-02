"use client"
import "./AboutHero.scss"
import { useTranslations } from "next-intl"
import ContactButton from "@/components/ContactButton/ContactButton"
import Image from "next/image"

const AboutHero = () => {

	const tAH = useTranslations("aboutPage.top")
	const tAHTexts = tAH.raw("texts")
	const tCC = useTranslations("common")

	return (
		<section className="AboutHero">
			<div className="container">
				<div className="AboutHero__wrapper">
					<div className="AboutHero__content">
						<h1>{tAH("title")}</h1>
						<div className="AboutHero__content-text">
							{
								tAHTexts && tAHTexts.map((txt, i) => <p key={i + "-txt"}>{txt}</p>)
							}
						</div>
						<ContactButton text={tCC("btn2")} />
					</div>
					<Image src={"/icons/wp6.svg"} alt="AboutHero" width={500} height={500} />
				</div>
			</div>
		</section>
	)
}

export default AboutHero