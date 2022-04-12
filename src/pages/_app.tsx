import { useEffect } from 'react';

import { I18nProvider } from '@lingui/react';
import { i18n, Messages } from '@lingui/core';
import { useRouter } from 'next/router';
import { en, sv } from 'make-plural/plurals';
import LangSwitcher from '../components/LangSwitcher';
import '../styles/global.css';

i18n.loadLocaleData('en', { plurals: en });
i18n.loadLocaleData('sv', { plurals: sv });

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
			<div>
				<LangSwitcher />
				<Component {...pageProps} />
			</div>
		</I18nProvider>
	);
}
