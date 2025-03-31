"use client"

import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const logosList = [
	{
		id: 1,
		src: "/icons/companies (1).svg",
		alt: "logo"
	},
	{
		id: 2,
		src: "/icons/companies (2).svg",
		alt: "logo"
	},
	{
		id: 3,
		src: "/icons/companies (3).svg",
		alt: "logo"
	},
	{
		id: 4,
		src: "/icons/companies (4).svg",
		alt: "logo"
	},
	{
		id: 5,
		src: "/icons/companies (5).svg",
		alt: "logo"
	},
	{
		id: 6,
		src: "/icons/companies (6).svg",
		alt: "logo"
	},
	{
		id: 7,
		src: "/icons/companies (7).svg",
		alt: "logo"
	},
	{
		id: 8,
		src: "/icons/companies (8).svg",
		alt: "logo"
	},
	{
		id: 9,
		src: "/icons/companies (9).svg",
		alt: "logo"
	},
	{
		id: 10,
		src: "/icons/companies (10).svg",
		alt: "logo"
	},
	{
		id: 11,
		src: "/icons/companies (11).svg",
		alt: "logo"
	},
	{
		id: 12,
		src: "/icons/companies (12).svg",
		alt: "logo"
	},
	{
		id: 13,
		src: "/icons/companies (13).svg",
		alt: "logo"
	},
	{
		id: 14,
		src: "/icons/companies (14).svg",
		alt: "logo"
	},
	{
		id: 15,
		src: "/icons/companies (15).svg",
		alt: "logo"
	}
];

const LogoMarquee = () => {
	return (
		<div className="LogoMarquee">
			<Marquee
				gradient={false}
				speed={40}
				loop={1}
				direction="left" // Можна змінити на "right" для руху справа наліво
			>
				{logosList.map((logo, index) => (
					<div key={index + "-logo"} style={{ display: 'flex', padding: '0 30px' }}>
						<Image
							src={logo.src}
							alt={logo.alt || 'Logo'}
							width={150}
							height={45}
							style={{ width: 'auto', height: '45px', objectFit: "contain" }}
						/>
					</div>
				))}
			</Marquee>
		</div>
	);
};

export default LogoMarquee;