'use client';
import { useState } from "react";
import "./Header.scss";
import Image from "next/image";
import Link from 'next/link';
import { Button } from '@mui/material';
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useModal } from "../Modal/Modal";
import Dropdown from "@/ui/Dropdown/Dropdown";
import ContactForm from "../ContactForm/ContactForm";

const Header = () => {
	const [openedBurgerMenu, setOpenedBurgerMenu] = useState(false)
	const { openModal, closeModal } = useModal();

	const handleOpenModal = () => {
		openModal(<ContactForm />);
	};

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
						<ul className="navigation__list">
							<li className="navigation__item">
								<Link href="/" className="navigation__link">Головна</Link>
							</li>
							<li className="navigation__item">
								<Dropdown withMarker={true} dropLabel={"Товари"} dropList={[
									<Link href="/" className="dropdown-link">Бізнес-шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Корпоративні шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Спортивні шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Дитячі шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Всі категорії</Link>
								]} />
							</li>
							<li className="navigation__item">
								<Dropdown withMarker={true} dropLabel={"Ресурси"} dropList={[
									<Link href="/" className="dropdown-link">Бізнес-шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Корпоративні шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Спортивні шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Дитячі шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Всі категорії</Link>
								]} />
							</li>

							<li className="navigation__item">
								<Link href="/" className="navigation__link">Відгуки</Link>
							</li>

							<li className="navigation__item">
								<Dropdown withMarker={true} dropLabel={"Про нас"} dropList={[
									<Link href="/" className="dropdown-link">Бізнес-шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Корпоративні шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Спортивні шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Дитячі шкарпетки</Link>,
									<Link href="/" className="dropdown-link">Всі категорії</Link>
								]} />
							</li>

							<li className="navigation__item">
								<Link href="/" className="navigation__link">Наші роботи</Link>
							</li>

							<li className="navigation__item">
								<Link href="/" className="navigation__link">Співпраця</Link>
							</li>
						</ul>
					</nav>

					<LanguageSwitcher />

					<button className="btn header__action-btn" onClick={handleOpenModal}>Зв’язатися</button>

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