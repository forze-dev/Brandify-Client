import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

// Генерація статичних параметрів для локалей
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

// Метадані для SEO
export async function generateMetadata({ params }) {
	const paramsData = await params;
	const locale = paramsData.locale;

	return {
		title: locale === 'ua' ? 'Продукція - Власні шкарпетки просто' : 'Products - Custom Socks Made Easy',
		description: locale === 'ua'
			? 'Виготовляємо якісні брендовані шкарпетки на замовлення. Корпоративні, комерційні, спортивні та дитячі шкарпетки від 50 пар.'
			: 'We manufacture high-quality branded custom socks. Corporate, commercial, sports and children\'s socks from 50 pairs.'
	};
}

export default function ProductsPage({ params }) {
	// Перенаправляємо на першу категорію за замовчуванням
	const locale = params.locale;
	redirect(`/${locale}/products/corporate-socks`);
}