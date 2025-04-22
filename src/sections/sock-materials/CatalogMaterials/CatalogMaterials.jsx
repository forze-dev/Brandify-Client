"use client"
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./CatalogMaterials.scss"

const CatalogMaterials = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const tSM = useTranslations("materials");

	const catalogKeys = tSM.raw("catalogKeys");
	const catalogLink = tSM.raw("catalogsLink");

	const [activeCatalog, setActiveCatalog] = useState(catalogKeys[0].param);
	const [catalogData, setCatalogData] = useState(null);

	useEffect(() => {
		const catalogParam = searchParams.get("catalog");
		const defaultCatalog = catalogKeys[0].param;

		if (catalogParam && catalogKeys.some(cat => cat.param === catalogParam)) {
			setActiveCatalog(catalogParam);
		} else {
			setActiveCatalog(defaultCatalog);
		}

		fetch(catalogLink)
			.then((res) => res.json())
			.then((catalogs) => {
				setCatalogData(catalogs[activeCatalog] || null);
			})
			.catch(() => {
				setCatalogData(false);
			});
	}, [searchParams, activeCatalog, catalogLink, catalogKeys]);

	const handleCatalogToggle = (catalogParam) => {
		setActiveCatalog(catalogParam);
		const params = new URLSearchParams(searchParams.toString());
		params.set("catalog", catalogParam);
		router.push(`?${params.toString()}`, { scroll: false });
	};

	if (catalogData === null) return "Loading...";
	if (catalogData === false) return null

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
							{Array.isArray(catalogData.list) && (
								catalogData.list.map((item, index) => (
									<li key={item.id + index} className="catalog-materials__item">
										<Image src={item.image} width={116} height={90} alt={item.id + "-photo"} />
										<span>{tSM("labelColor") + " " + item.id}</span>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CatalogMaterials