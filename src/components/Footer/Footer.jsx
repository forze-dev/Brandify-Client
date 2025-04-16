"use client"

import "./Footer.scss"
import Link from "next/link"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import Image from "next/image"
import Navigation from "../Navigation/Navigation"
import ContactButton from "../ContactButton/ContactButton"
import { useTranslations } from "next-intl"

const Footer = () => {

	const tContacts = useTranslations("contacts")
	const tCommon = useTranslations("common")
	const tFoot = useTranslations("footer")

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
						<ContactButton text={tCommon("btn1")} classList={"btn-second"} />
						<LanguageSwitcher />
					</div>
					<div className="Footer__item Footer__contacts">
						<div className="Footer__item-context">
							<span>{tContacts("phone.label")}</span>
							<a target="_blank" href={tContacts("phone.link")}>{tContacts("phone.value")}</a>
						</div>
						<div className="Footer__item-context">
							<span>{tContacts("workHours.label")}</span>
							<span>{tContacts("workHours.value")}</span>
						</div>
						<div className="Footer__item-context">
							<span>{tContacts("email.label")}</span>
							<a target="_blank" href={tContacts("email.link")}>{tContacts("email.value")}</a>
						</div>
						<div className="Footer__item-context">
							<span>{tContacts("address.label")}</span>
							<a target="_blank" href={tContacts("address.link")}>{tContacts("address.value")}</a>
						</div>
					</div>
					<div className="Footer__item">
						<Navigation />
					</div>
				</div>

				<div className="Footer__bottom">
					<span>{tFoot("privacy")}</span>
					<Link href={"/"}>{tFoot("policy")}</Link>
				</div>
			</div>

		</footer>
	)
}

export default Footer