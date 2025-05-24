import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import ProductsPage from '@/sections/products/ProductsPage/ProductsPage';
import ProductsInfo from '@/sections/products/ProductsInfo/ProductsInfo';

// Доступні категорії (мають збігатися з назвами в JSON та URL)
const availableCategories = [
	'corporate-socks',
	'commercial-socks',
	'sports-socks',
	'children-socks',
	'all-categories'
];

// Генерація статичних параметрів для всіх комбінацій локалей та категорій
export function generateStaticParams() {
	const params = [];

	routing.locales.forEach(locale => {
		availableCategories.forEach(category => {
			params.push({
				locale,
				category
			});
		});
	});

	return params;
}

// Метадані для SEO
export async function generateMetadata({ params }) {
	const paramsData = await params;
	const { locale, category } = paramsData;

	// Мапінг категорій до назв для метаданих
	const categoryNames = {
		'corporate-socks': {
			ua: 'Корпоративні шкарпетки',
			en: 'Corporate Socks'
		},
		'commercial-socks': {
			ua: 'Комерційні шкарпетки',
			en: 'Commercial Socks'
		},
		'sports-socks': {
			ua: 'Спортивні шкарпетки',
			en: 'Sports Socks'
		},
		'children-socks': {
			ua: 'Дитячі шкарпетки',
			en: 'Children Socks'
		},
		'all-categories': {
			ua: 'Всі категорії',
			en: 'All Categories'
		}
	};

	const categoryName = categoryNames[category]?.[locale] || categoryNames[category]?.ua;

	return {
		title: locale === 'ua'
			? `${categoryName} - Власні шкарпетки просто`
			: `${categoryName} - Custom Socks Made Easy`,
		description: locale === 'ua'
			? `${categoryName} - виготовляємо якісні брендовані шкарпетки на замовлення від 50 пар. Швидке виробництво, індивідуальний дизайн.`
			: `${categoryName} - we manufacture high-quality branded custom socks from 50 pairs. Fast production, individual design.`
	};
}

export default async function ProductsCategoryPage({ params }) {
	const paramsData = await params;
	const { locale, category } = paramsData;

	// Перевіряємо чи існує така категорія
	if (!availableCategories.includes(category)) {
		notFound();
	}

	return (
		<main>
			<ProductsPage category={category} locale={locale} />
			<ProductsInfo />
		</main>
	);
}