"use client"

import Dropdown from "@/components/Dropdown/Dropdown"
import Link from "next/link"
import "./Navigation.scss"

const Navigation = () => {

	return (
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
	)
}

export default Navigation