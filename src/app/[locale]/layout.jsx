import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import Header from '@/components/Header/Header';
import { ModalProvider } from '@/components/Modal/Modal';
import Footer from '@/components/Footer/Footer';

import './globals.css';

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin", "cyrillic"], // включаємо cyrillic для української локалізації
	weight: ["300", "400", "500", "700"], // ви можете обрати потрібні вам ваги
	display: "swap",
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
			<body className={montserrat.variable}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ModalProvider>
						<Header />
						<div className="root">
							{children}
						</div>
						<Footer />
					</ModalProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}