"use client"
import 'swiper/css';
import "./Screens.scss"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { useTranslations, useLocale } from "next-intl";
import { useMemo, useState, useEffect, useRef } from 'react';
import Loader from '@/components/Loader/Loader';

const Screens = () => {
	const tRP = useTranslations("reviewsPage")
	const currentLocale = useLocale();
	const reviewsLink = useMemo(() => tRP.raw("contentLink"), [tRP]);
	const swiperRef = useRef(null);

	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [videoList, setVideoList] = useState(null)
	const [activeVideoIndex, setActiveVideoIndex] = useState(null);


	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		fetch(reviewsLink)
			.then((res) => res.json())
			.then((res) => {
				setVideoList(res.videoList);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Помилка завантаження:", error);
				setHasError(true);
				setIsLoading(false);
			});
	}, [reviewsLink, currentLocale]);

	const renderFrame = (link, isActive) => {
		const autoplayLink = isActive
			? `${link}${link.includes('?') ? '&' : '?'}autoplay=1`
			: '';
		return isActive ? (
			<iframe
				width="390"
				height="430"
				src={autoplayLink}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			></iframe>
		) : null;
	};

	return (
		<section className="feeVideos">
			<div className="container">
				<h1>{tRP("videoTitle")}</h1>
				{
					isLoading ? <Loader position={"center"} /> : hasError || !videoList ? (
						<div className="error-message">Some went Error</div>
					) :
						<div className="feeVideos__slider">
							<Swiper
								effect={'coverflow'}
								grabCursor={true}
								centeredSlides={true}
								slidesPerView={"auto"}
								initialSlide={1}
								onSwiper={(swiper) => (swiperRef.current = swiper)}
								spaceBetween={0}
								coverflowEffect={{
									rotate: 0,
									stretch: -10,
									depth: 40,
									modifier: 3,
									slideShadows: true,
									scale: 1
								}}
								modules={[EffectCoverflow]}
								breakpoints={{
									768: {
										spaceBetween: 20
									}
								}}
								className="feeVideos-swiper"
							>
								{
									videoList.map((video, index) => (
										<SwiperSlide key={index} onClick={() => {
											if (swiperRef.current) {
												swiperRef.current.slideTo(index);
												setActiveVideoIndex(index);
											}
										}}>
											<div
												className="video-slider__item"
												style={{ background: `url(${video.poster}) 0 0/cover no-repeat` }}
											>
												<div className="video-slider__item-bottom">
													<h2>{video.title}</h2>
													<span>{video.text}</span>
												</div>
												<div className={`video-slider__item-frame ${activeVideoIndex === index ? "show" : ""}`}>
													{
														renderFrame(video.link, activeVideoIndex === index)
													}
												</div>
											</div>
										</SwiperSlide>
									))
								}
							</Swiper>
						</div>
				}
			</div>
		</section>
	)
}

export default Screens