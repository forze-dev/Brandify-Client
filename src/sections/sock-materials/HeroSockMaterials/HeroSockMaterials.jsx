"use client"
import { useTranslations } from "next-intl";
import ContactButton from "@/components/ContactButton/ContactButton";
import Image from "next/image";
import "./HeroSockMaterials.scss"

const HeroSockMaterials = () => {
	const tSM = useTranslations("materials")
	const tC = useTranslations("common")

	return (
		<section className="sock-materials">
			<div className="container">
				<div className="sock-materials__wrapper">
					<h1>{tSM("title")}</h1>
					<p>{tSM("text")}</p>
					<ContactButton text={tC("btn2")} />
					<Image src={"/images/materials/first.png"} width={1240} height={400} alt={tSM("title")} />
				</div>
			</div>
		</section>
	)
}

export default HeroSockMaterials