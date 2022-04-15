import LangSwitcher from '../components/LangSwitcher';
import { i18n, Messages } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { en, fr } from 'make-plural/plurals';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/global.css';

i18n.loadLocaleData({
	en: { plurals: en },
	fr: { plurals: fr }
});

// eslint-disable-next-line react/prop-types
export default function Page({ Component, pageProps }) {
	const { locale } = useRouter();

	useEffect(() => {
		async function load(locale: string) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const { messages }: { messages: Messages } = await import(
				`../locales/${locale}/messages.po`
			);

			i18n.load(locale, messages);
			i18n.activate(locale);
		}

		void load(locale);
	}, [locale]);

	return (
		<I18nProvider i18n={i18n}>
			<LangSwitcher />
			<Component {...pageProps} />
		</I18nProvider>
	);
}
