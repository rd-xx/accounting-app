import { ColorModeContext } from '../components/ThemeChanger';
import { useEffect, useMemo, useState } from 'react';
import { i18n, Messages } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { en, fr } from 'make-plural/plurals';
import { useRouter } from 'next/router';
import getTheme from '../utils/theme';
import PropTypes from 'prop-types';
import '../utils/global.css';
import {
	ThemeProvider,
	useMediaQuery,
	createTheme,
	CssBaseline,
	PaletteMode
} from '@mui/material';

i18n.loadLocaleData({
	en: { plurals: en },
	fr: { plurals: fr }
});

export default function App({ Component, pageProps }) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
			noSsr: true
		}),
		[mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light'),
		colorMode = useMemo(
			() => ({
				// The dark mode switch would invoke this method
				toggleColorMode: () => {
					const newMode = mode === 'light' ? 'dark' : 'light';
					setMode(newMode);
					localStorage.setItem('theme', newMode);
					storedTheme = newMode;
				}
			}),
			[mode]
		),
		{ locale } = useRouter();

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

	let storedTheme = '';
	useEffect(() => {
		if (storedTheme === '') {
			storedTheme = localStorage.getItem('theme');
			if (storedTheme === 'undefined') {
				storedTheme = prefersDarkMode ? 'dark' : 'light';
				localStorage.setItem('theme', storedTheme);
			}
		}

		const isDark = mode === 'dark',
			storageWantDark = storedTheme === 'dark',
			systemWantDark = prefersDarkMode;
		if (storageWantDark !== isDark) colorMode.toggleColorMode();
		else if (systemWantDark !== isDark) colorMode.toggleColorMode();
	}, [prefersDarkMode]);

	// Update the theme only if the mode changes
	const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<I18nProvider i18n={i18n}>
					<CssBaseline />
					<Component {...pageProps} />
				</I18nProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired
};
