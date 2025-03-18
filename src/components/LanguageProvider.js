// src/components/LanguageProvider.js
'use client';

import { NextIntlClientProvider } from 'next-intl';

export default function LanguageProvider({ children, locale, messages }) {
	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}