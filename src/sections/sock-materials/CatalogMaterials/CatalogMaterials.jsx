"use client"
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
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

	// Отримання параметра з URL або використання значення за замовчуванням
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

	// Завантаження даних при монтуванні компонента та при зміні мови
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

	// Синхронізація URL з активним каталогом
	useEffect(() => {
		const catalogParam = searchParams.get("catalog");
		if (catalogParam !== activeCatalog && catalogKeys.some(cat => cat.param === catalogParam)) {
			setActiveCatalog(catalogParam);
		}
	}, [searchParams, activeCatalog, catalogKeys]);

	// Мемоізований обробник зміни каталогу
	const handleCatalogToggle = useCallback((catalogParam) => {
		setActiveCatalog(catalogParam);
		const params = new URLSearchParams(searchParams.toString());
		params.set("catalog", catalogParam);
		router.push(`?${params.toString()}`, { scroll: false });
	}, [router, searchParams]);

	// Мемоізовані дані активного каталогу
	const catalogData = useMemo(() => {
		return allCatalogsData?.[activeCatalog] || null;
	}, [allCatalogsData, activeCatalog]);

	if (isLoading) return <div className="catalog-materials__loader">Loading...</div>;
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
						<div className="catalog-materials__load">
							<button className="btn-second">{tSM("download")}</button>
						</div>
					</div>

					<div className="catalog-materials__catalog">
						<ul className="catalog-materials__list">
							{Array.isArray(catalogData.list) && catalogData.list.map((item, index) => (
								<li key={`${item.id}-${index}`} className="catalog-materials__item">
									<Image src={item.image} width={116} height={90} alt={`${item.id}-photo`} />
									<span>{`${tSM("labelColor")} ${item.id}`}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CatalogMaterials