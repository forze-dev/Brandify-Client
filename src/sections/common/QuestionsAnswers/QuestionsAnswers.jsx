"use client"

import { useTranslations } from "next-intl"
import "./QuestionsAnswers.scss"

const QuestionsAnswers = () => {

	const tQA = useTranslations("homePage.questionsAndAnswers")

	const tQAList = tQA.raw("list")

	return (
		<section className="QuestionsAnswers">
			<div className="container">
				<h2>{tQA("title")}</h2>
				<div className="QuestionsAnswers__list">
					{
						tQAList && tQAList.map(questAnsw => {
							return (
								<details className="QuestionsAnswers__box" key={questAnsw.id + "-questAnsw"}>
									<summary>
										<span>{questAnsw.question}</span>
									</summary>
									<div className="QuestionsAnswers__answer">
										<figure></figure>
										<div className="QuestionsAnswers__answer-content" dangerouslySetInnerHTML={{ __html: questAnsw.answer || '' }} />
									</div>
								</details>
							)
						})
					}
				</div>
			</div>
		</section>
	)
}

export default QuestionsAnswers