"use client"

import Dropdown from "@/components/Dropdown/Dropdown"
import Link from "next/link"
import "./Navigation.scss"
import { useTranslations } from "next-intl"
import Image from "next/image"


const Navigation = ({ isPanel, openPanel, setOpenPanel, setOpenedBurgerMenu }) => {

	const tNav = useTranslations('nav');
	const tDrops = useTranslations('dropdowns');

	const handleCloseModal = () => {
		setOpenedBurgerMenu && setOpenedBurgerMenu(false)
	}

	const dropdownItems = tDrops.raw('drop1').map(el => <Link key={el.id} href={el.path || "/"} className="dropdown-link" onClick={handleCloseModal} >{el.label}</Link>);

	return (
		<ul className="navigation__list">
			<li className="navigation__item">
				<Link href="/" className="navigation__link" onClick={handleCloseModal}>{tNav("toHome")}</Link>
			</li>

			<li className="navigation__item navigation__item-drop" >
				<Dropdown withMarker={true} dropLabel={tNav("toProds")} dropList={dropdownItems} />
			</li>

			{
				isPanel &&
				<li className="navigation__item navigation__item-panel">
					<button onClick={() => setOpenPanel(true)}>{tNav("toProds")} <Image src={"/icons/arrow-label.svg"} width={10} height={10} alt=">" className="dropdown-wrapper-label" /></button>

					<div className={`navigation__item-panel--content ${openPanel ? "show-panel" : ""}`}>
						<button className="navigation__item-panel--content-label" onClick={() => setOpenPanel(false)}>
							<Image src={"/icons/custom-arrow.svg"} width={40} height={22} alt="<--" />
						</button>
						{
							dropdownItems && dropdownItems.map(el => el)
						}
					</div>
				</li>
			}

			<li className="navigation__item">
				<Link href="/sock-materials" className="navigation__link" onClick={handleCloseModal}>{tNav("toMaterials")}</Link>
			</li>

			<li className="navigation__item">
				<Link href="/reviews" className="navigation__link" onClick={handleCloseModal}>{tNav("toReviews")}</Link>
			</li>

			<li className="navigation__item">
				<Link href="/about" className="navigation__link" onClick={handleCloseModal}>{tNav("toAbout")}</Link>
			</li>

			<li className="navigation__item">
				<Link href="/our-works" className="navigation__link" onClick={handleCloseModal}>{tNav("toOurWorks")}</Link>
			</li>

			<li className="navigation__item">
				<Link href="/" className="navigation__link" onClick={handleCloseModal}>{tNav("toJob")}</Link>
			</li>
		</ul>
	)
}

export default Navigation