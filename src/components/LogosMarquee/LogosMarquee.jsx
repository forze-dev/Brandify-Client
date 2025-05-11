"use client"

import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const LogoMarquee = () => {
	const tLM = useTranslations("companiesList")
	const tLMList = tLM.raw("list")

	return (
		<div className="LogoMarquee">
			<Marquee
				gradient={false}
				speed={40}
				loop={1}
				direction="left" // Можна змінити на "right" для руху справа наліво
			>
				{tLMList ? tLMList.map((logo, index) => (
					<div key={index + "-logo"} style={{ display: 'flex', padding: '0 30px' }}>
						<Image
							src={logo.src}
							alt={logo.alt || 'Logo'}
							width={150}
							height={45}
							style={{ width: 'auto', height: '45px', objectFit: "contain" }}
						/>
					</div>
				)) : <div style={{ display: 'flex', padding: '0 30px' }}>
					<Image
						src={"/icons/companies (1).svg"}
						alt={'Logo'}
						width={150}
						height={45}
						style={{ width: 'auto', height: '45px', objectFit: "contain" }}
					/>
				</div>}
			</Marquee>
		</div>
	);
};

export default LogoMarquee;