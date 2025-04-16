'use client';
import { useState, useEffect } from "react";
import "./Header.scss";
import Image from "next/image";
import Link from 'next/link';
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Navigation from "../Navigation/Navigation";
import ContactButton from "../ContactButton/ContactButton";
import { useTranslations } from "next-intl";

const Header = () => {
	const [openedBurgerMenu, setOpenedBurgerMenu] = useState(false)

	const { } = useTranslations()

	useEffect(() => {
		if (openedBurgerMenu) {
			document.body.classList.add("fixed-body")
		} else {
			document.body.classList.remove("fixed-body")
		}

		return () => {
			document.body.classList.remove("fixed-body")
		};
	}, [openedBurgerMenu]);

	return (
		<header>
			<div className="container">
				<div className="header__wrapper">
					<div className="logo">
						<Link href="/">
							<Image src="/icons/logo.svg" width={167} height={44} alt="Logo" loading="lazy" />
						</Link>
					</div>

					<nav className={`navigation ${openedBurgerMenu ? "active" : ""}`}>
						<Navigation />
					</nav>

					<LanguageSwitcher />

					<ContactButton text={"Зв’язатися"} classList={"btn header__action-btn"} />

					<button className={`header__burger ${openedBurgerMenu ? "active" : ""}`} onClick={() => setOpenedBurgerMenu(prev => !prev)}>
						<figure></figure>
						<figure></figure>
						<figure></figure>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;