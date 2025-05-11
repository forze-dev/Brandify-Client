import { routing } from '@/i18n/routing';
import CooperationTop from '@/sections/cooperation/CooperationTop/CooperationTop';
import CooperationList from '@/sections/cooperation/CooperationList/CooperationList';
import CooperationCompanies from '@/sections/cooperation/CooperationCompanies/CooperationCompanies';
import CooperationForm from '@/sections/cooperation/CooperationForm/CooperationForm';

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

export default function CooperationPage() {
	return (
		<main>
			<CooperationTop />
			<CooperationList />
			<CooperationCompanies />
			<CooperationForm />
		</main>
	);
}