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

	const catalogData = [
		{ id: "polyester", label: tSM("catalog1.label"), list: tSM.raw("catalog1.list"), name: tSM("catalog1.name") },
		{ id: "12", label: tSM("catalog2.label"), list: tSM.raw("catalog2.list"), name: tSM("catalog2.name") },
		{ id: "15", label: tSM("catalog3.label"), list: tSM.raw("catalog3.list"), name: tSM("catalog3.name") }
	];

	const [activeCatalog, setActiveCatalog] = useState("polyester");

	useEffect(() => {
		const catalogParam = searchParams.get("catalog");
		if (catalogParam && catalogData.some(cat => cat.id === catalogParam)) {
			setActiveCatalog(catalogParam);
		}
	}, [searchParams]);

	const handleCatalogToggle = (catalogId) => {
		setActiveCatalog(catalogId);

		const params = new URLSearchParams(searchParams.toString());
		params.set("catalog", catalogId);

		router.push(`?${params.toString()}`, { scroll: false });
	};

	// Get active catalog data
	const activeData = catalogData.find(cat => cat.id === activeCatalog);

	return (
		<section className="catalog-materials">
			<div className="container">
				<div className="catalog-materials__wrapper">
					<div className="catalog-materials__top">
						<div className="catalog-materials__toggles">
							{catalogData.map((catalog) => (
								<button
									key={catalog.id}
									className={`catalog-materials__toggle ${activeCatalog === catalog.id ? 'active' : ''}`}
									onClick={() => handleCatalogToggle(catalog.id)}
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

					{/* Catalog Content */}
					<div className="catalog-materials__catalog">
						<ul className="catalog-materials__list">
							{Array.isArray(activeData.list) ? (
								activeData.list.map((item, index) => (
									<li key={item.id + index} className="catalog-materials__item">
										<Image src={item.image} width={116} height={90} alt={item.id + "-photo"} />
										<span></span>
										{item.id}
									</li>
								))
							) : (
								<div dangerouslySetInnerHTML={{ __html: activeData.list }} />
							)}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CatalogMaterials