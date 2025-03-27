"use client"

import "./HowWeWork.scss"
import { Link } from "@/i18n/navigation"
import Image from "next/image"

const HowWeWork = () => {

	return (
		<section className="HowWeWork">
			<div className="container">
				<h2>Як ми працюємо?</h2>

				<div className="HowWeWork__wrapper">
					<Link className="HowWeWork__card-link">
						<div className="HowWeWork__card-image">

						</div>
						<h3>Надішліть свій логотип чи дизайн</h3>
						<p>
							Залиште заявку або зв’яжіться з нами у соцмережах чи месенджерах. <br />
							Також можете звернутися за телефоном – про все решту ми подбаємо.
						</p>
						<div className="HowWeWork__card-bottom">
							<span>Детальніше</span>
							<Image src={"/icons/arrow.svg"} width={16} height={16} alt="->" />
						</div>
					</Link>
					<Link className="HowWeWork__card-link">
						<div className="HowWeWork__card-image">

						</div>
						<h3>3атвердження та виробництво</h3>
						<p>
							Після фінальних правок ви отримуєте тестову пару. <br />
							Після схвалення запускаємо виробництво, а готову партію доставляємо в найкоротші терміни.
						</p>
						<div className="HowWeWork__card-bottom">
							<span>Детальніше</span>
							<Image src={"/icons/arrow.svg"} width={16} height={16} alt="->" />
						</div>
					</Link>
					<Link className="HowWeWork__card-link">
						<div className="HowWeWork__card-image">

						</div>
						<h3>Розробка та створення зразків</h3>
						<p>
							Разом із вами підготуємо кілька унікальних варіантів дизайну шкарпеток та виготовимо тестові зразки.

						</p>
						<div className="HowWeWork__card-bottom">
							<span>Детальніше</span>
							<Image src={"/icons/arrow.svg"} width={16} height={16} alt="->" />
						</div>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default HowWeWork