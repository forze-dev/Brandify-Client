"use client"

import './OurWorks.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const OurWorks = () => {

	const tOW = useTranslations("homePage.ourWorks")
	const tOWList = tOW.raw("cards")
	const tCommon = useTranslations("common")

	return (
		<section className='OurWorks'>
			<div className="container">
				<h2>{tOW("title")}</h2>
				<p>{tOW("text")}</p>
				<div className="OurWorks__list">
					{
						tOWList && tOWList.map(el => {
							return (
								<div className="OurWorks__card" key={el.id}>
									<Image key={el.id} src={el.image} alt='photo' width={260} height={240} />
									<span>{el.title}</span>
								</div>
							)
						})
					}
				</div>
				<Link href={"/our-works"} className='btn-second '>{tCommon("btn4")}</Link>
			</div>
		</section>
	)
}

export default OurWorks