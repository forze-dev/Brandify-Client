"use client"
import "./ShortStory.scss"
import { useTranslations } from "next-intl"
import Image from "next/image"

const ShortStory = () => {
	const tSS = useTranslations("aboutPage.story")
	const tSSTexts = tSS.raw("texts")

	return (
		<section className="ShortStory">
			<div className="container">
				<div className="ShortStory__wrapper">
					<Image width={500} height={300} alt="Story" src={"/images/about/story.svg"} />
					<div className="ShortStory__content">
						<h2>{tSS("title")}</h2>
						{
							tSSTexts && tSSTexts.map((txt, i) => <p key={i + "-txtSS"}>{txt}</p>)
						}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShortStory