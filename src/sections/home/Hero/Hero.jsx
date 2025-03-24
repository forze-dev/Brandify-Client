"use client"

import "./Hero.scss"
import 'swiper/css';
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

const Hero = () => {

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
						<div className="btn hero__call-form">
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

			<p style={{ margin: "100px 0" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad sed eveniet fugit eligendi nesciunt iste, reiciendis distinctio, cupiditate totam velit recusandae facilis earum at rem, ut nostrum commodi beatae corrupti nihil? Expedita officiis quo ex nesciunt voluptatibus ipsa repellendus. Unde eius praesentium magnam delectus ipsam velit suscipit obcaecati eaque odit rerum rem ex laboriosam, repellat exercitationem, vitae nobis libero asperiores ipsa dolorem laudantium, vero perspiciatis aliquam. Ut, fugiat sed numquam alias cupiditate eveniet eos temporibus rem ea provident aut ipsa facere accusantium qui harum enim? Consequuntur cum, sit aliquam neque asperiores incidunt! Quaerat deserunt, adipisci veritatis sit voluptatum culpa nostrum asperiores ipsa recusandae ullam quod, numquam vel fuga! Dignissimos eum possimus deserunt eaque incidunt fugit dolores amet officia? Magnam, magni labore explicabo eos ut, et, rem fuga quos dolore eligendi quis placeat. Ratione voluptate autem optio veritatis, animi error beatae blanditiis impedit distinctio quasi doloremque vel laboriosam esse laudantium! Quo libero asperiores officia ad quam dolores ex beatae. Ipsam, laborum vero, nobis in molestiae placeat eum aspernatur perferendis voluptatum ducimus ipsa aperiam distinctio eos corporis corrupti amet soluta! Corrupti in, fugiat deleniti, quod accusamus commodi amet, consequuntur debitis perspiciatis excepturi ducimus fuga. Quas, labore sequi consectetur commodi architecto fugiat vero voluptatem veritatis magni ad hic inventore asperiores, placeat quae debitis quam culpa eum possimus? Earum nihil cumque provident unde harum? Eligendi qui quaerat commodi, iste aliquam unde ad, praesentium optio et eum ea accusamus pariatur obcaecati saepe nemo incidunt nisi eveniet officiis itaque culpa velit possimus numquam accusantium atque? Reprehenderit quidem illo, sint, molestias deleniti sit veniam minima dolorum cupiditate pariatur laborum? Officia asperiores autem consequuntur odio mollitia, consectetur neque ullam temporibus odit quae, impedit aut maiores. Optio porro molestias dignissimos facilis reiciendis! Expedita blanditiis quasi porro fugit numquam, tenetur debitis voluptatibus laboriosam ex veniam eius recusandae quaerat tempora iste natus. Repellendus consequuntur quasi voluptatem. Impedit est dolore, voluptas, repudiandae nesciunt aut assumenda facere in autem ipsum, minima nobis molestiae? Unde soluta, ea ad, quas mollitia nam maxime inventore tenetur ipsam dolorum molestiae nulla beatae molestias neque. Officiis animi consequuntur porro laboriosam harum natus sed libero repellat saepe iure est perferendis voluptatibus impedit amet quod quisquam deleniti inventore, vel, praesentium at maxime. Ad repellendus minima in distinctio adipisci deserunt reprehenderit aperiam vel cum saepe fugiat omnis earum velit non, quod, eius suscipit, voluptatum dolor. Dolorem numquam dignissimos velit dicta eligendi quisquam, optio mollitia soluta eaque quo quibusdam quidem molestiae a nihil magni, amet fuga doloribus impedit ad. Magni consequuntur maiores quas iure soluta nobis, exercitationem non eos voluptas odio, cum eveniet aliquid nostrum pariatur tempora quaerat esse, a eaque? Error reiciendis doloremque corporis ullam labore aliquid recusandae excepturi vel. Tempora sit enim, hic accusamus molestias culpa velit error aliquam voluptatum quae quam ipsum dignissimos odit maiores commodi nam, ea voluptate molestiae saepe? Ex maxime natus doloremque repellendus quibusdam ad deleniti quis quia aliquam similique modi, aspernatur eos laborum corrupti vitae nulla. Voluptate, autem iusto. Earum perspiciatis dolorum voluptas numquam architecto id dignissimos? Accusamus non in accusantium ullam enim, nulla voluptatibus.</p>
		</section>
	)
}

export default Hero