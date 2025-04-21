import { routing } from '@/i18n/routing';
import HeroSockMaterials from '@/sections/sock-materials/HeroSockMaterials/HeroSockMaterials';
import CatalogMaterials from '@/sections/sock-materials/CatalogMaterials/CatalogMaterials';

// Генерація статичних параметрів для локалей
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

// Метадані для SEO
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

export default function MaterialsPage() {
	return (
		<main>
			<HeroSockMaterials />
			<CatalogMaterials />
		</main>
	);
}