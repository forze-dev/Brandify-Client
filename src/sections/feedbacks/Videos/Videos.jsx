"use client"
import 'swiper/css';
import "./Videos.scss"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from 'react';

const Videos = ({ videoList }) => {
	const swiperRef = useRef(null);
	const [activeVideoIndex, setActiveVideoIndex] = useState(null);
	const iframeRef = useRef(null);
	const tRP = useTranslations("reviewsPage");

	// Функція для додавання параметру enablejsapi до URL
	const getYoutubeUrlWithJsApi = (url) => {
		return `${url}${url.includes('?') ? '&' : '?'}enablejsapi=1`;
	};

	// Функція для відправки команди на відтворення відео
	const playVideo = () => {
		if (iframeRef.current) {
			try {
				// Відправляємо команду на відтворення відео через postMessage
				iframeRef.current.contentWindow.postMessage(
					JSON.stringify({
						event: 'command',
						func: 'playVideo',
						args: []
					}),
					'*'
				);
			} catch (error) {
				console.error('Помилка при спробі відтворення відео:', error);
			}
		}
	};

	// Ефект для запуску відео з затримкою після його активації
	useEffect(() => {
		let playTimeout;

		if (activeVideoIndex !== null) {
			playTimeout = setTimeout(() => {
				playVideo();
			}, 150);
		}

		// Очистити таймер при деактивації відео
		return () => {
			if (playTimeout) {
				clearTimeout(playTimeout);
			}
		};
	}, [activeVideoIndex]);

	const renderFrame = (link, isActive) => {
		const videoUrl = getYoutubeUrlWithJsApi(link);

		return (
			<div className="iframe-wrapper">
				{isActive && (
					<iframe
						ref={iframeRef}
						src={videoUrl}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					></iframe>
				)}
			</div>
		);
	};

	const handleCloseVideo = (e) => {
		e.stopPropagation(); // Зупиняємо подальше поширення події
		setActiveVideoIndex(null);
	};

	// Функція для обробки кліку на відео
	const handleVideoClick = (index) => {
		if (swiperRef.current) {
			swiperRef.current.slideTo(index);
			setActiveVideoIndex(index);
		}
	};

	if (!videoList) return null;

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
								<SwiperSlide key={index} onClick={() => handleVideoClick(index)}>
									<div
										className="video-slider__item"
										style={{ background: `url(${video.poster}) 0 0/cover no-repeat` }}
									>
										<div className="video-slider__item-bottom">
											<h2>{video.title}</h2>
											<span>{video.text}</span>
										</div>
										<div onClick={handleCloseVideo} className={`video-overlay ${activeVideoIndex === index ? "show" : ""}`}>

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
			</div>
		</section>
	);
}

export default Videos;