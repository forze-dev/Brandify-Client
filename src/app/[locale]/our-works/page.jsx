import { routing } from '@/i18n/routing';
import Loader from '@/components/Loader/Loader';
import { Suspense } from 'react';
import PortfolioList from '@/sections/portfolio/PortfolioList/PortfolioList';

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

export default function OurWorksPage() {
	return (
		<main>
			{/* <Suspense fallback={<Loader position={"center"} />}> */}
			<PortfolioList />
			{/* </Suspense> */}
		</main>
	);
}