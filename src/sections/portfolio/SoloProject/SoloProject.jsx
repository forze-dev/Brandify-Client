"use client"
import { useTranslations, useLocale } from "next-intl";
import Loader from "@/components/Loader/Loader";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import ContactButton from "@/components/ContactButton/ContactButton";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "./SoloProject.scss"

const SoloProject = () => {
	const tPP = useTranslations("portfolioPage");
	const tCM = useTranslations("common");
	const currentLocale = useLocale();
	const portfolioLink = useMemo(() => tPP.raw("contentLink"), [tPP]);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

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

	if (isLoading || !soloProject) return <Loader position={"center"} />

	return (
		<section className="SoloProject">
			<div className="container">
				{
					soloProject &&
					<div className="SoloProject__wrapper">
						<div className="SoloProject__slider">
							<div className="SoloProject__slider-top">
								<Swiper
									style={{
										'--swiper-navigation-color': '#fff',
										'--swiper-pagination-color': '#fff',
									}}
									spaceBetween={10}
									navigation={true}
									thumbs={{ swiper: thumbsSwiper }}
									modules={[FreeMode, Navigation, Thumbs]}
									className="mySwiperTop"
								>
									{
										soloProject.images.map((el, index) => {
											return (
												<SwiperSlide key={index + "-top-slide"}>
													<Image src={el} width={600} height={600} alt="soloProject.fullTitle" />
												</SwiperSlide>
											)
										})
									}
								</Swiper>
							</div>

							<div className="SoloProject__slider-bottom">
								<Swiper
									onSwiper={setThumbsSwiper}
									spaceBetween={10}
									slidesPerView={4}
									freeMode={true}
									watchSlidesProgress={true}
									modules={[FreeMode, Navigation, Thumbs]}
									className="mySwiperBottom"
								>
									{
										soloProject.images.map((el, index) => {
											return (
												<SwiperSlide key={index + "-bottom-slide"}>
													<Image src={el} width={600} height={600} alt="soloProject.fullTitle" />
												</SwiperSlide>
											)
										})
									}
								</Swiper>
							</div>
						</div>

						<div className="SoloProject__content">
							<h1>{soloProject.fullTitle}</h1>
							<div className="SoloProject__content-texts">
								{
									soloProject.texts.map((txt, index) => <p key={index + "-text"}>{txt}</p>)
								}
							</div>
							<ContactButton text={tCM("btn2")} />
						</div>
					</div>
				}
			</div>
		</section>
	)
}

export default SoloProject