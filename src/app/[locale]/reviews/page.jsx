import { routing } from '@/i18n/routing';
import Videos from '@/sections/feedbacks/Videos/Videos';

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
			<Videos />
		</main>
	);
}