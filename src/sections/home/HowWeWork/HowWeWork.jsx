"use client"

import "./HowWeWork.scss"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { useTranslations } from "next-intl"

const HowWeWork = () => {
	const tHW = useTranslations("homePage.howWeWork")
	const tHWCards = tHW.raw("cards")
	const tCommon = useTranslations("common")

	return (
		<section className="HowWeWork">
			<div className="container">
				<h2>{tHW("title")}</h2>

				<div className="HowWeWork__wrapper">
					{
						tHWCards && tHWCards.map(el => {
							return (
								<Link className="HowWeWork__card-link" key={el.id}>
									<div className="HowWeWork__card-image">

									</div>
									<h3>{el.title}</h3>
									<p>
										{el.text}
									</p>
									<div className="HowWeWork__card-bottom">
										<span>{tCommon("btn3")}</span>
										<Image src={"/icons/arrow.svg"} width={16} height={16} alt="->" />
									</div>
								</Link>
							)
						})
					}
				</div>
			</div>
		</section>
	)
}

export default HowWeWork