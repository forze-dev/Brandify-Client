"use client"
import { useTranslations, useLocale } from "next-intl";
import Loader from "@/components/Loader/Loader";
import { Link } from "@/i18n/navigation";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import ContactButton from "@/components/ContactButton/ContactButton";

const PortfolioList = () => {
	const tPP = useTranslations("portfolioPage");
	const tCM = useTranslations("common");
	const currentLocale = useLocale();
	const portfolioLink = useMemo(() => tPP.raw("contentLink"), [tPP]);

	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [allPortfolioList, setAllPortfolioList] = useState(null)

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		fetch(portfolioLink)
			.then((res) => res.json())
			.then((portfolioList) => {
				setAllPortfolioList(portfolioList);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Помилка завантаження:", error);
				setHasError(true);
				setIsLoading(false);
			});
	}, [portfolioLink, currentLocale]);

	return (
		<section className="PortfolioList">
			<div className="container">
				<h1>{tPP("title")}</h1>
				<p>{tPP("subtitle")}</p>
				<ContactButton text={tCM("btn2")} />



				<div className="PortfolioList__wrapper">
					{
						isLoading ? <Loader position={"center"} /> : hasError || !allPortfolioList ? (
							<div className="error-message">Some went Error</div>
						) :
							allPortfolioList.map(card => {
								return (
									<div key={card.id} className="PortfolioList__card">
										<Link href={`/our-works/${card.link}`}>
											<Image src={card.mainImage} alt={card.title} width={390} height={390} />
											<span>{card.title}</span>
										</Link>
									</div>
								)
							})
					}
				</div>
			</div>
		</section>
	)
}

export default PortfolioList