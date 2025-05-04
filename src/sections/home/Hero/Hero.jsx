"use client"

import "./Hero.scss"
import 'swiper/css';
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import LogoMarquee from "@/components/LogosMarquee/LogosMarquee";
import ContactButton from "@/components/ContactButton/ContactButton";
import { useTranslations } from "next-intl";

const Hero = () => {

	const tHero = useTranslations("homePage.hero")
	const tCommon = useTranslations("common")
	const tCompanies = useTranslations("companiesList")

	return (
		<section className="hero">
			<div className="hero__row">
				<div className="container">
					<div className="hero__wrapper">
						<h1>{tHero("title")}</h1>
						<div className="hero__marks">
							<div className="hero__marks-item">
								<Image src={"/icons/h-clock.svg"} alt="hero-icon" width={30} height={30} />
								<p>
									{tHero("labels.label1.label")} <span>{tHero("labels.label1.subLabel")}</span>
								</p>
							</div>
							<div className="hero__marks-item">
								<Image src={"/icons/h-sock.svg"} alt="hero-icon" width={30} height={30} />
								<p>
									{tHero("labels.label2.label")} <span>{tHero("labels.label2.subLabel")}</span>
								</p>
							</div>
							<div className="hero__marks-item">
								<Image src={"/icons/h-pc.svg"} alt="hero-icon" width={30} height={30} />
								<p>
									{tHero("labels.label3.label")} <span>{tHero("labels.label3.subLabel")}</span>
								</p>
							</div>
						</div>

						<ContactButton text={tCommon("btn2")} classList={"btn hero__call-form"} />
					</div>
				</div>
				<div className="hero__slider-mobile">
					<Swiper
						effect={'coverflow'}
						grabCursor={true}
						centeredSlides={true}
						slidesPerView={'auto'}
						loop={true}
						coverflowEffect={{
							rotate: 0,
							stretch: -15,
							depth: 100,
							modifier: 3,
							slideShadows: true,
							scale: 1
						}}
						modules={[EffectCoverflow]}
						className="hero__slider-swiper"
					>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (1).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (2).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (3).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (4).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (5).webp"} />
						</SwiperSlide>
					</Swiper>
				</div>
				<div className="hero__slider-pc">
					<Swiper
						slidesPerView={3}
						spaceBetween={0}
						className="hero__slider-swiper"
						breakpoints={{
							1024: {
								slidesPerView: 4,
							},
							1240: {
								slidesPerView: 5,
							},
						}}
					>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (1).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (2).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (3).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (4).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<img width={284} height={300} alt="Photo" src={"/images/home/hs (5).webp"} />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>

			<div className="hero__marquee">
				<h3>{tCompanies("title")}</h3>
				<LogoMarquee />
			</div>
		</section>
	)
}

export default Hero