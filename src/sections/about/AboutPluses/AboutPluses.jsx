"use client"
import "./AboutPluses.scss"
import { useTranslations } from "next-intl"
import Image from "next/image"

const AboutPluses = () => {
	const tAP = useTranslations("aboutPage.pluses")
	const tAPCards = tAP.raw("cards")

	return (
		<section className="AboutPluses">
			<div className="container">
				<h2>{tAP("title")}</h2>
				<div className="AboutPluses__cards">
					{
						tAPCards && tAPCards.map(el => {
							return (
								<div key={el.id} className="AboutPluses__card">
									<Image src={el.image} width={90} height={90} alt={el.title} />
									<h3>
										{el.title}
									</h3>
									<p>
										{el.text}
									</p>
								</div>
							)
						})
					}
				</div>
			</div>
		</section>
	)
}

export default AboutPluses