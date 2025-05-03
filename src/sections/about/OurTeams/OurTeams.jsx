"use client"
import { useTranslations, useLocale } from "next-intl";
import Loader from "@/components/Loader/Loader";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import "./OurTeams.scss"

const OurTeams = () => {
	const tOT = useTranslations("aboutPage.teams");
	const currentLocale = useLocale();
	const contentLink = useMemo(() => tOT.raw("contentLink"), [tOT]);

	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [allOurTeams, setAllOurTeams] = useState(null)

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		fetch(contentLink)
			.then((res) => res.json())
			.then((OurTeams) => {
				setAllOurTeams(OurTeams);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Помилка завантаження:", error);
				setHasError(true);
				setIsLoading(false);
			});
	}, [contentLink, currentLocale]);

	return (
		<section className="OurTeams">
			<div className="container">
				<h2>{tOT("title")}</h2>

				<div className="OurTeams__wrapper">
					{
						isLoading ? <Loader position={"center"} /> : hasError || !allOurTeams ? (
							<div className="error-message">Some went Error</div>
						) :
							<Swiper
								slidesPerView={1}
								spaceBetween={20}
								pagination={true}
								modules={[Pagination]}
								className="OurTeams-swiper"
								breakpoints={{
									1200: {
										slidesPerView: 4
									},
									900: {
										slidesPerView: 3
									},
									600: {
										slidesPerView: 2
									},
								}}
							>
								{
									allOurTeams && allOurTeams.map(el => {
										return (
											<SwiperSlide key={el.id}>
												<div className="OurTeams__card">
													<Image src={el.photo} alt="photo" width={290} height={340} />
													<h3>{el.position}</h3>
													<span>{el.name}</span>
												</div>
											</SwiperSlide>
										)
									})
								}
							</Swiper>
					}
				</div>
			</div>
		</section>
	)
}

export default OurTeams