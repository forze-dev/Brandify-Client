"use client"
import { useTranslations, useLocale } from "next-intl";
import Loader from "@/components/Loader/Loader";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import ContactButton from "@/components/ContactButton/ContactButton";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

import "./SoloProject.scss"

const SoloProject = () => {
	const tPP = useTranslations("portfolioPage");
	const tCM = useTranslations("common");
	const currentLocale = useLocale();
	const portfolioLink = useMemo(() => tPP.raw("contentLink"), [tPP]);

	const [isLoading, setIsLoading] = useState(true);
	const [soloProject, setSoloProject] = useState(null)
	const { slug } = useParams()

	useEffect(() => {
		setIsLoading(true);
		fetch(portfolioLink)
			.then((res) => res.json())
			.then((portfolioList) => {
				const exProject = portfolioList.find(el => el.link === slug)
				if (!exProject) redirect("/our-works")
				setSoloProject(exProject);
				setIsLoading(false);
			})
			.catch(() => {
				redirect("/our-works")
			});
	}, [portfolioLink, currentLocale]);

	if (isLoading) return <Loader position={"center"} />

	return (
		<section className="SoloProject">
			<div className="container">
				{
					soloProject &&
					<div className="SoloProject__wrapper">
						<h1>{soloProject.fullTitle}</h1>
						<Image src={soloProject.images[0]} width={300} height={300} alt="soloProject.fullTitle" />
					</div>
				}
			</div>
		</section>
	)
}

export default SoloProject