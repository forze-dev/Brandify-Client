import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { Link } from '@/i18n/navigation';

import './globals.css';

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// Генерація статичних параметрів для локалей
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params
}) {
	// Отримання локалі асинхронно
	const paramsData = await params;
	const locale = paramsData.locale;

	// Перевірка чи підтримується локаль
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	// Увімкнення статичного рендерингу
	setRequestLocale(locale);

	// Завантаження повідомлень для поточної локалі
	const messages = (await import(`../../../messages/${locale}.json`)).default;

	return (
		<html lang={locale}>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<header>
						<nav className="p-4 bg-gray-100 dark:bg-gray-800">
							<div className="container mx-auto flex justify-between items-center">
								<Link href="/">
									<span className="text-xl font-bold">Logo</span>
								</Link>
								<ul className="flex space-x-4">
									<li>
										<Link href="/">
											{locale === 'ua' ? 'Головна' : 'Home'}
										</Link>
									</li>
									<li>
										<Link href="/about">
											{locale === 'ua' ? 'Про нас' : 'About'}
										</Link>
									</li>
									<li>
										<Link href="/" locale={locale === 'ua' ? 'en' : 'ua'}>
											{locale === 'ua' ? 'EN' : 'UA'}
										</Link>
									</li>
								</ul>
							</div>
						</nav>
					</header>
					<div className="container mx-auto">
						{children}
					</div>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}