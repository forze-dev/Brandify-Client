"use client"

import "./Hero.scss"
import 'swiper/css';
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import ContactForm from "@/components/ContactForm/ContactForm";
import { useModal } from "@/components/Modal/Modal";
import LogoMarquee from "@/components/LogosMarquee/LogosMarquee";

const Hero = () => {
	const { openModal, closeModal } = useModal();

	const handleOpenModal = () => {
		openModal(<ContactForm />);
	};

	return (
		<section className="hero">
			<div className="hero__row">
				<div className="container">
					<div className="hero__wrapper">
						<h1>Брендовані шкарпетки — швидко та легко</h1>
						<div className="hero__marks">
							<div className="hero__marks-item">
								<Image src={"/icons/h-clock.svg"} alt="hero-icon" width={30} height={30} />
								<p>
									Термін виготовлення: <span>5 днів</span>
								</p>
							</div>
							<div className="hero__marks-item">
								<Image src={"/icons/h-sock.svg"} alt="hero-icon" width={30} height={30} />
								<p>
									Замовлення: <span>від 10 пар</span>
								</p>
							</div>
							<div className="hero__marks-item">
								<Image src={"/icons/h-pc.svg"} alt="hero-icon" width={30} height={30} />
								<p>
									Дизайн: <span>безкоштовний</span>
								</p>
							</div>
						</div>

						<div className="btn hero__call-form" onClick={handleOpenModal}>
							Оформити замовлення
						</div>
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
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (1).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (2).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (3).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (4).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (5).webp"} />
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
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (1).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (2).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (3).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (4).webp"} />
						</SwiperSlide>
						<SwiperSlide>
							<Image width={284} height={300} alt="Photo" src={"/images/home/hs (5).webp"} />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>

			<div className="hero__marquee">
				<h3>Компанії, з якими ми співпрацюємо:</h3>
				<LogoMarquee />
			</div>
		</section>
	)
}

export default Hero