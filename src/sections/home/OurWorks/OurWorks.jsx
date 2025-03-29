import './OurWorks.scss'
import Image from 'next/image'
import Link from 'next/link'

const OurWorks = () => {

	return (
		<section className='OurWorks'>
			<div className="container">
				<h2>Наші роботи</h2>
				<p>Ми Компанія Brandyfy виробляємо якісні брендовані шкарпетки на замовлення, які стають частиною іміджу бізнесу. Вони чудово підходять як корпоративні подарунки, елементи форми співробітників, сувенірна продукція чи брендований мерч. </p>
				<div className="OurWorks__list">
					<div className="OurWorks__card">
						<Image src={"/images/home/hs (1).webp"} alt='photo' width={260} height={240} />
						<span>Класичні <br /> (середньої висоти)</span>
					</div>
					<div className="OurWorks__card">
						<Image src={"/images/home/ow (1).png"} alt='photo' width={260} height={240} />
						<span>Класичні <br /> (середньої висоти)</span>
					</div>
					<div className="OurWorks__card">
						<Image src={"/images/home/ow (1).png"} alt='photo' width={260} height={240} />
						<span>Короткі (невидимки)</span>
					</div>
					<div className="OurWorks__card">
						<Image src={"/images/home/ow (1).png"} alt='photo' width={260} height={240} />
						<span>Короткі (невидимки)</span>
					</div>
				</div>
				<Link href={"/"} className='btn-second '>Переглянути все</Link>
			</div>
		</section>
	)
}

export default OurWorks