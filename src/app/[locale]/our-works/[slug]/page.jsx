import { routing } from '@/i18n/routing';
import SoloProject from '@/sections/portfolio/SoloProject/SoloProject';
import SoloProjectForm from '@/sections/portfolio/SoloProjectForm/SoloProjectForm';

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

export default function SoloWorkPage() {
	return (
		<main>
			<SoloProject />
			<SoloProjectForm />
		</main>
	);
}
