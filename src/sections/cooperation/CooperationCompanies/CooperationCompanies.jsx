import "./CooperationCompanies.scss"
import { useTranslations } from "next-intl"
import Image from "next/image"

const CooperationCompanies = () => {
	const tLM = useTranslations("companiesList")
	const tLMList = tLM.raw("list")

	return (
		<section className="CooperationCompanies">
			<div className="container">
				<h2>{tLM("title")}</h2>
				<div className="CooperationCompanies__list">
					{
						tLMList && tLMList.map((logo, index) => <Image
							src={logo.src}
							alt={logo.alt || 'Logo'}
							key={index + "-logo"}
							width={150}
							height={45}
							style={{ width: 'auto', height: '45px', objectFit: "contain" }}
						/>)
					}
				</div>
			</div>
		</section>
	)
}

export default CooperationCompanies