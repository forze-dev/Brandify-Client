import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

// Генерація статичних параметрів для локалей
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

// Метадані для SEO
export async function generateMetadata({ params }) {
	const paramsData = await params;
	const locale = paramsData.locale;

	return {
		title: locale === 'ua' ? 'Про нас' : 'About Us',
		description: locale === 'ua'
			? 'Інформація про наш сайт та команду'
			: 'Information about our website and team'
	};
}

export default async function AboutPage({ params }) {
	// Отримання локалі асинхронно
	const paramsData = await params;
	const locale = paramsData.locale;

	// Увімкнення статичного рендерингу
	setRequestLocale(locale);

	// Використання getTranslations замість useTranslations для асинхронних компонентів
	const t = await getTranslations({
		locale,
		namespace: 'AboutPage'
	});

	const nav = await getTranslations({
		locale,
		namespace: 'Navigation'
	});

	return (
		<div className="min-h-screen p-8">
			<h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
			<p className="mb-4">{t('description')}</p>
			<p className="mb-6">{t('additionalInfo')}</p>

			<Link href="/" className="text-blue-500 hover:underline">
				← {nav.home}
			</Link>
		</div>
	);
}