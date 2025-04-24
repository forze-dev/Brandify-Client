"use client"
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import "./CatalogMaterials.scss"

const CatalogMaterials = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentLocale = useLocale();
	const tSM = useTranslations("materials");

	const catalogKeys = useMemo(() => tSM.raw("catalogKeys"), [tSM]);
	const catalogLink = useMemo(() => tSM.raw("catalogsLink"), [tSM]);
	const defaultCatalog = useMemo(() => catalogKeys[0].param, [catalogKeys]);

	const initialCatalog = useMemo(() => {
		const catalogParam = searchParams.get("catalog");
		return catalogParam && catalogKeys.some(cat => cat.param === catalogParam)
			? catalogParam
			: defaultCatalog;
	}, [searchParams, catalogKeys, defaultCatalog]);

	const [activeCatalog, setActiveCatalog] = useState(initialCatalog);
	const [allCatalogsData, setAllCatalogsData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	// Додані стани для пагінації
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 30; // Кількість елементів на сторінці
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		fetch(catalogLink)
			.then((res) => res.json())
			.then((catalogs) => {
				setAllCatalogsData(catalogs);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Помилка завантаження каталогів:", error);
				setHasError(true);
				setIsLoading(false);
			});
	}, [catalogLink, currentLocale]);

	useEffect(() => {
		const catalogParam = searchParams.get("catalog");
		if (catalogParam !== activeCatalog && catalogKeys.some(cat => cat.param === catalogParam)) {
			setActiveCatalog(catalogParam);
			setCurrentPage(1); // Повертаємось на першу сторінку при зміні каталогу
		}
	}, [searchParams, activeCatalog, catalogKeys]);

	const handleCatalogToggle = useCallback((catalogParam) => {
		setActiveCatalog(catalogParam);
		setCurrentPage(1); // Повертаємось на першу сторінку при зміні каталогу
		setSearchQuery(''); // Очищаємо пошук при зміні каталогу
		const params = new URLSearchParams(searchParams.toString());
		params.set("catalog", catalogParam);
		router.push(`?${params.toString()}`, { scroll: false });
	}, [router, searchParams]);

	const handleSearchChange = useCallback((e) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1); // Повертаємось на першу сторінку при зміні пошукового запиту
	}, []);

	const catalogData = useMemo(() => {
		return allCatalogsData?.[activeCatalog] || null;
	}, [allCatalogsData, activeCatalog]);

	// Фільтрація елементів за пошуковим запитом
	const filteredItems = useMemo(() => {
		if (!catalogData?.list || !Array.isArray(catalogData.list)) return [];

		if (!searchQuery.trim()) return catalogData.list;

		const query = searchQuery.toLowerCase().trim();
		return catalogData.list.filter(item =>
			item.id.toString().toLowerCase().includes(query)
		);
	}, [catalogData, searchQuery]);

	// Розрахунок пагінації на основі відфільтрованих елементів
	const paginatedItems = useMemo(() => {
		if (!filteredItems.length) return [];
		return filteredItems.slice(0, currentPage * itemsPerPage);
	}, [filteredItems, currentPage, itemsPerPage]);

	// Чи є ще елементи для завантаження
	const hasMoreItems = useMemo(() => {
		return currentPage * itemsPerPage < filteredItems.length;
	}, [filteredItems, currentPage, itemsPerPage]);

	// Функція для завантаження більшої кількості елементів
	const loadMoreItems = useCallback(() => {
		if (hasMoreItems && !isLoadingMore) {
			setIsLoadingMore(true);
			// Імітація асинхронного завантаження для плавності інтерфейсу
			setTimeout(() => {
				setCurrentPage(prev => prev + 1);
				setIsLoadingMore(false);
			}, 300);
		}
	}, [hasMoreItems, isLoadingMore]);

	// Lazy loading з Intersection Observer
	useEffect(() => {
		if (!hasMoreItems) return;

		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && !isLoadingMore) {
					loadMoreItems();
				}
			},
			{ threshold: 0.5 }
		);

		const loadMoreElement = document.getElementById('load-more-trigger');
		if (loadMoreElement) {
			observer.observe(loadMoreElement);
		}

		return () => {
			if (loadMoreElement) observer.unobserve(loadMoreElement);
		};
	}, [hasMoreItems, isLoadingMore, loadMoreItems]);

	if (isLoading) return <Loader position={"center"} />
	if (hasError || !catalogData) return null;

	return (
		<section className="catalog-materials">
			<div className="container">
				<div className="catalog-materials__wrapper">
					<div className="catalog-materials__top">
						<div className="catalog-materials__toggles">
							{catalogKeys.map((catalog) => (
								<button
									key={catalog.id}
									className={`catalog-materials__toggle ${activeCatalog === catalog.param ? 'active' : ''}`}
									onClick={() => handleCatalogToggle(catalog.param)}
								>
									<span>{catalog.label}</span>
									<span>{catalog.name}</span>
								</button>
							))}
						</div>
						<div className="catalog-materials__search">
							<div className="catalog-materials__search-inp">
								<input
									type="text"
									placeholder={tSM("searchPlaceholder") || "Пошук за ID..."}
									value={searchQuery}
									onChange={handleSearchChange}
									className="catalog-materials__search-input"
								/>
								{
									searchQuery && <button onClick={() => setSearchQuery("")} className="catalog-materials__search-clear"><Image src={"/icons/cross.svg"} width={18} height={18} alt="X" /></button>
								}
							</div>

							<div className="catalog-materials__load">

								<a href={catalogData.pdfLink} download={catalogData.name} className="catalog-materials__load-btn">
									<Image src={"/icons/download.svg"} alt="Load" width={38} height={38} />
								</a>
							</div>
						</div>
					</div>

					<div className="catalog-materials__catalog">
						{paginatedItems.length === 0 && searchQuery && (
							<div className="catalog-materials__no-results">
								{tSM("noResults") + " " + searchQuery || `Нічого не знайдено за запитом "${searchQuery}"`}
							</div>
						)}

						<ul className="catalog-materials__list">
							{Array.isArray(paginatedItems) && paginatedItems.map((item, index) => (
								<li
									key={`${item.id}-${index}`}
									className="catalog-materials__item"
								>
									<Image
										src={item.image}
										width={116}
										height={90}
										alt={`${item.id}-photo`}
										loading="lazy"
									/>
									<span>{`${tSM("labelColor")} ${item.id}`}</span>
								</li>
							))}
						</ul>

						{hasMoreItems && (
							<div
								id="load-more-trigger"
								className="catalog-materials__load-more"
							>
								{isLoadingMore && <Loader position={"center"} />}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default CatalogMaterials