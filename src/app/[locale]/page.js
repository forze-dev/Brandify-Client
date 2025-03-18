import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

// Імітація отримання даних з API/БД
async function fetchHomeData() {
	// В реальному сценарії тут буде запит до API або БД
	// Наприклад: const data = await fetch('https://api.example.com/home-data');

	// Для демонстрації імітуємо асинхронне отримання даних
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				lastUpdated: new Date().toISOString(),
			});
		}, 100);
	});
}

// Налаштування ISR - сторінка буде регенеруватись кожні 60 секунд
export const revalidate = 60; // секунди

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

export default async function HomePage({ params }) {
	// Отримання локалі асинхронно
	const paramsData = await params;
	const locale = paramsData.locale;

	// Увімкнення статичного рендерингу
	setRequestLocale(locale);

	// Використання getTranslations замість useTranslations для асинхронних компонентів
	const t = await getTranslations({
		locale,
		namespace: 'HomePage'
	});

	// Отримуємо дані через ISR
	const data = await fetchHomeData();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4">
			<main className="py-8">
				{/* Заголовок з перекладом */}
				<h1 className="text-4xl font-bold mb-6">{t('title')}</h1>

				{/* Дані, отримані через ISR */}
				<p className="text-sm text-gray-500 mb-4">
					{locale === 'ua'
						? `Останнє оновлення: ${new Date(data.lastUpdated).toLocaleString('uk-UA')}`
						: `Last updated: ${new Date(data.lastUpdated).toLocaleString('en-US')}`}
				</p>

				{/* Посилання на іншу сторінку */}
				<div className="mt-6">
					<Link href="/about" className="text-blue-500 hover:underline">
						{t('about')}
					</Link>
				</div>
			</main>
		</div>
	);
}