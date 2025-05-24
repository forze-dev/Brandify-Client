"use client";

import { useState, useEffect, useMemo } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import './ProductsPage.scss';

const ProductsPage = ({ category }) => {
	const tPP = useTranslations('productsPage');
	const contentLink = tPP.raw("contentLink")
	const locale = useLocale();

	const [productsData, setProductsData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	// Завантаження даних продуктів
	useEffect(() => {
		const loadProducts = async () => {
			setIsLoading(true);
			setHasError(false);

			try {
				const response = await fetch(contentLink);

				if (!response.ok) {
					throw new Error('Failed to fetch products');
				}

				const data = await response.json();
				setProductsData(data);
			} catch (error) {
				console.error('Error loading products:', error);
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		};

		loadProducts();
	}, [locale, contentLink]);

	// Мапінг категорій до їх ідентифікаторів в JSON
	const categoryMapping = {
		'corporate-socks': 'corporate',
		'commercial-socks': 'commercial',
		'sports-socks': 'sports',
		'children-socks': 'children',
		'all-categories': 'all'
	};

	// Категорії для табів
	const categories = useMemo(() => [
		{
			id: 'commercial-socks',
			name: locale === 'ua' ? 'Комерційні шкарпетки' : 'Commercial Socks'
		},
		{
			id: 'corporate-socks',
			name: locale === 'ua' ? 'Корпоративні шкарпетки' : 'Corporate Socks'
		},
		{
			id: 'sports-socks',
			name: locale === 'ua' ? 'Спортивні шкарпетки' : 'Sports Socks'
		},
		{
			id: 'children-socks',
			name: locale === 'ua' ? 'Дитячі шкарпетки' : 'Children Socks'
		},
		{
			id: 'all-categories',
			name: locale === 'ua' ? 'Всі категорії' : 'All Categories'
		}
	], [locale]);

	// Фільтрація продуктів за категорією
	const filteredProducts = useMemo(() => {
		if (!productsData) return [];

		const categoryId = categoryMapping[category];

		if (categoryId === 'all') {
			return productsData.catalog.products;
		}

		return productsData.catalog.products.filter(
			product => product.category_id === categoryId
		);
	}, [productsData, category]);

	return (
		<section className="products-page">
			<div className="container">
				<div className="products-page__header">
					<h1>{tPP("title")}</h1>

					{/* Таби категорій */}
					<div className="products-page__tabs">
						{categories.map((cat) => (
							<Link
								key={cat.id}
								href={`/products/${cat.id}`}
								className={`products-page__tab ${category === cat.id ? 'active' : ''}`}
							>
								{cat.name}
							</Link>
						))}
					</div>
				</div>

				{
					isLoading ? <Loader position="center" /> :
						hasError || !productsData ? <div className="products-error">
							<div className="container">
								<h1>{locale === 'ua' ? 'Помилка завантаження' : 'Loading Error'}</h1>
								<p>{locale === 'ua' ? 'Не вдалося завантажити дані про продукти' : 'Failed to load product data'}</p>
							</div>
						</div> : <>
							<div className="products-page__grid">
								{filteredProducts.map((product) => (
									<Link href={`/products/${category}/${product.id}`} key={product.id} className="product-card">
										<div className="product-card__badge">
											{locale === 'ua' ? 'Від 10 пар' : 'From 10 pairs'}
										</div>

										<div className="product-card__image">
											{
												product.images?.length > 0 &&
												<Image
													src={product.images[0]}
													alt={product.title}
													width={290}
													height={280}
												/>
											}
										</div>

										<div className="product-card__content">
											<h3>{product.title}</h3>
											<div className="product-card__price">
												<span>
													{locale === 'ua' ? 'Від' : 'From'} {product.price.value} {product.price.currency}
												</span>
												<Image src={"/icons/custom-arrow.svg"} alt="-->" width={30} height={30} />
											</div>
										</div>
									</Link>
								))}
							</div>

							{filteredProducts.length === 0 && (
								<div className="products-page__empty">
									<h3>{locale === 'ua' ? 'Продукти в цій категорії незабаром з\'являться' : 'Products in this category coming soon'}</h3>
								</div>
							)}
						</>
				}
			</div>
		</section >
	);
};

export default ProductsPage;