"use client"
import 'swiper/css';
import "./Videos.scss"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { useTranslations } from "next-intl";
import { useState, useRef } from 'react';

const Videos = ({ videoList }) => {
	const swiperRef = useRef(null);
	const [activeVideoIndex, setActiveVideoIndex] = useState(null);
	const tRP = useTranslations("reviewsPage");

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

	if (!videoList) return null

	return (
		<section className="feeVideos">
			<div className="container">
				<h1>{tRP("videoTitle")}</h1>
				<div className="feeVideos__slider">
					<Swiper
						effect={'coverflow'}
						grabCursor={true}
						centeredSlides={true}
						slidesPerView={"auto"}
						initialSlide={1}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						onSlideChange={() => setActiveVideoIndex(null)} // Зупиняємо відео при перегортанні слайдера
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
								<SwiperSlide key={index}>
									<div
										className="video-slider__item"
									>
										<div onClick={() => handleClickPoster(index)} style={{ background: `url(${video.poster}) 0 0/cover no-repeat` }} className={`video-poster ${activeVideoIndex === index ? "hide" : ""}`}>
											<div className="video-slider__item-bottom">
												<h2>{video.title}</h2>
												<span>{video.text}</span>
											</div>
										</div>

										<div className={`video-overlay video-overlay-1 ${activeVideoIndex === index ? "show" : ""}`}></div>
										<div className={`video-overlay video-overlay-2 ${activeVideoIndex === index ? "show" : ""}`}></div>

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
			</div>
		</section>
	)
}

export default Videos