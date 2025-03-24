"use client";

import { useState, useRef, useEffect } from "react";
import "./Dropdown.scss"
import Image from "next/image";

const Dropdown = ({ dropLabel, dropList }) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Функція блокування/розблокування прокрутки
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden"; // Забороняємо прокрутку
		} else {
			document.body.style.overflow = ""; // Відновлюємо прокрутку
		}

		return () => {
			document.body.style.overflow = ""; // При розмонтуванні повертаємо прокрутку
		};
	}, [open]);

	// Закриваємо меню при кліку поза ним
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Якщо dropLabel або dropList відсутні, то повертаємо null
	if (!dropLabel || !Array.isArray(dropList) || dropList.length === 0) return null;

	return (
		<div className="dropdown-wrapper" ref={dropdownRef}>
			<button className="dropdown-button" onClick={() => setOpen((prev) => !prev)}>
				<span>{dropLabel}</span>
				<Image src={"/icons/arrow-label.svg"} width={10} height={10} alt=">" />
			</button>
			{open && (
				<ul className="dropdown-menu">
					{dropList.map((el, index) => (
						<li key={index + "-" + dropLabel}>{el}</li> // Додаємо унікальний key
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
