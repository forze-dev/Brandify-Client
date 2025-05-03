import { routing } from '@/i18n/routing';
import AboutHero from '@/sections/about/AboutHero/AboutHero';
import AboutPluses from '@/sections/about/AboutPluses/AboutPluses';
import ShortStory from '@/sections/about/ShortStory/ShortStory';
import OurTeams from '@/sections/about/OurTeams/OurTeams';
import Machines from '@/sections/about/Machines/Machines';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
	const paramsData = await params;
	const locale = paramsData.locale;

	return {
		title: locale === 'ua' ? 'Головна сторінка' : 'Home Page',
		description: locale === 'ua'
			? 'Ласкаво просимо на наш багатомовний сайт'
			: 'Welcome to our multilingual website'
	};
}

export default function ReviewsPage() {
	return (
		<main>
			<AboutHero />
			<AboutPluses />
			<ShortStory />
			<OurTeams />
			<Machines />
		</main>
	);
}