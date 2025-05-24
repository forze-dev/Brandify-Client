"use client"
import "./ProductsInfo.scss"
import { useTranslations } from "next-intl"
import ContactButton from "@/components/ContactButton/ContactButton"
import Image from "next/image"

const ProductsInfo = () => {

	const tPI = useTranslations("productsPage")
	const tPITexts = tPI.raw("descrInd")
	const tCC = useTranslations("common")

	return (
		<section className="ProductsInfo">
			<div className="container">
				<div className="ProductsInfo__wrapper">
					<div className="ProductsInfo__content">
						<h1>{tPI("titleInd")}</h1>
						<div className="ProductsInfo__content-text">
							{
								tPITexts && tPITexts.map((txt, i) => <p key={i + "-txt"}>{txt}</p>)
							}
						</div>
						<ContactButton text={tCC("btn2")} />
					</div>
					<Image src={"/images/products/Pind.webp"} alt="ProductsInfo" width={500} height={500} />
				</div>
			</div>
		</section>
	)
}

export default ProductsInfo