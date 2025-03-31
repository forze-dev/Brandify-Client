"use client"

import "./Footer.scss"
import Link from "next/link"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import Image from "next/image"
import Navigation from "../Navigation/Navigation"
import ContactButton from "../ContactButton/ContactButton"

const Footer = () => {

	return (
		<footer>
			<div className="container">
				<div className="Footer__wrapper">
					<div className="Footer__item Footer__top">
						<div className="logo">
							<Link href="/">
								<Image src="/icons/logo-white.svg" width={167} height={44} alt="Logo" loading="lazy" />
							</Link>
						</div>
						<ContactButton text={"Зв’язатися"} classList={"btn-second"} />
						<LanguageSwitcher />
					</div>
					<div className="Footer__item Footer__contacts">
						<div className="Footer__item-context">
							<span>Контактии</span>
							<a href="tel:+380993395558">+380 99 339 55 58</a>
						</div>
						<div className="Footer__item-context">
							<span>Графік роботи:</span>
							<span>Пн-Нд 9:00 - 20:00</span>
						</div>
						<div className="Footer__item-context">
							<span>Е-mail</span>
							<a href="mailto:example@gmail.com">example@gmail.com</a>
						</div>
						<div className="Footer__item-context">
							<span>Адресса</span>
							<a href="/">Супер вулиця</a>
						</div>
						<div className="Footer__item-context">
							<span>Адресса</span>
							<a href="/">Супер вулиця</a>
						</div>
					</div>
					<div className="Footer__item">
						<Navigation />
					</div>
				</div>

				<div className="Footer__bottom">
					<span>Brandify 2025 © Усі права захищено</span>
					<Link href={"/"}>Політика конфіденційності</Link>
				</div>
			</div>

		</footer>
	)
}

export default Footer