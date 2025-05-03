"use client"
import { useTranslations, useLocale } from "next-intl";
import Loader from "@/components/Loader/Loader";
import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import "./Machines.scss"

const Machines = () => {
	const tMM = useTranslations("aboutPage.machines");
	const currentLocale = useLocale();
	const contentLink = useMemo(() => tMM.raw("contentLink"), [tMM]);
	const swiperRef = useRef(null);
	const [activeVideoIndex, setActiveVideoIndex] = useState(null);

	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [allMachines, setAllMachines] = useState(null)

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		fetch(contentLink)
			.then((res) => res.json())
			.then((Machines) => {
				setAllMachines(Machines);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Помилка завантаження:", error);
				setHasError(true);
				setIsLoading(false);
			});
	}, [contentLink, currentLocale]);

	const renderFrame = (link, isActive) => {
		const autoplayLink = isActive
			? `${link}${link.includes('?') ? '&' : '?'}autoplay=1`
			: link;

		return (
			<div className="iframe-wrapper">

				<iframe
					src={autoplayLink}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				></iframe>
			</div>
		);
	};

	const handleClickPoster = (index) => {
		if (swiperRef.current) {
			swiperRef.current.slideTo(index);
			setActiveVideoIndex(index);
		}
	};

	return (
		<section className="Machines">
			<h2>{tMM("title")}</h2>

			<div className="Machines__wrapper">
				{
					isLoading ? <Loader position={"center"} /> : hasError || !allMachines ? (
						<div className="error-message">Some went Error</div>
					) :
						<Swiper
							effect={'coverflow'}
							grabCursor={true}
							centeredSlides={true}
							slidesPerView={"auto"}
							onSwiper={(swiper) => (swiperRef.current = swiper)}
							onSlideChange={() => setActiveVideoIndex(null)} // Зупиняємо відео при перегортанні слайдера
							spaceBetween={30}
							coverflowEffect={{
								rotate: 0,
								stretch: -10,
								depth: 100,
								modifier: 3,
								slideShadows: false,
								scale: 1
							}}
							initialSlide={2}
							breakpoints={{
								768: {
									slidesPerView: 3
								}
							}}
							modules={[EffectCoverflow]}
							className="hero__slider-swiper"
						>
							{
								allMachines && allMachines.content.map((el, index) => {
									return (
										<SwiperSlide key={el.id}>
											<div className="Machines__card">
												{
													el.type === "image" ?
														<Image src={el.link} alt="photo" width={260} height={380} />
														: <div
															className="video-slider__item"
														>
															<div onClick={() => handleClickPoster(index)} style={{ background: `url(${el.poster}) center center/cover no-repeat` }} className={`video-poster ${activeVideoIndex === index ? "hide" : ""}`}>

															</div>

															<div className={`video-overlay video-overlay-1 ${activeVideoIndex === index ? "show" : ""}`}></div>
															<div className={`video-overlay video-overlay-2 ${activeVideoIndex === index ? "show" : ""}`}></div>

															<div className={`video-slider__item-frame ${activeVideoIndex === index ? "show" : ""}`}>
																{
																	renderFrame(el.link, activeVideoIndex === index)
																}
															</div>
														</div>
												}
											</div>
										</SwiperSlide>
									)
								})
							}
						</Swiper>
				}
			</div>

		</section >
	)
}

export default Machines