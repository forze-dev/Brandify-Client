'use client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link, usePathname } from '@/i18n/navigation';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import "./LanguageSwitcher.scss"

function LanguageSwitcher() {
	const pathname = usePathname();
	const locale = useLocale();

	// Стани для різних меню
	const [langAnchorEl, setLangAnchorEl] = useState(null);

	// Функції для відкриття/закриття меню
	const handleLangClick = (event) => {
		setLangAnchorEl(event.currentTarget);
	};

	const handleLangClose = () => {
		setLangAnchorEl(null);
	};

	return (
		<div className="LanguageSwitcher">
			<Button
				endIcon={<KeyboardArrowDownIcon />}
				onClick={handleLangClick}
				className="nav-button"
				disableRipple
			>
				{locale === 'ua' ? 'UA' : 'EN'}  {/* Показуємо поточну мову */}
			</Button>
			<Menu
				anchorEl={langAnchorEl}
				open={Boolean(langAnchorEl)}
				onClose={handleLangClose}
			>
				{/* Показуємо тільки ту мову, на яку можна переключитися */}
				{locale !== 'ua' && (
					<MenuItem onClick={handleLangClose}>
						<Link href={pathname} locale="ua">
							UA
						</Link>
					</MenuItem>
				)}
				{locale !== 'en' && (
					<MenuItem onClick={handleLangClose}>
						<Link href={pathname} locale="en">
							EN
						</Link>
					</MenuItem>
				)}
			</Menu>
		</div>
	);
}

export default LanguageSwitcher;