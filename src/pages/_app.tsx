import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LangSwitcher from '../components/LangSwitcher';
import IconButton from '@mui/material/IconButton';
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
	PaletteMode,
	useTheme
} from '@mui/material';

i18n.loadLocaleData({
	en: { plurals: en },
	fr: { plurals: fr }
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeChanger(): JSX.Element {
	const colorMode = useContext(ColorModeContext),
		theme = useTheme();

	return (
		<div>
			{theme.palette.mode} mode
			<IconButton
				sx={{ ml: 1 }}
				onClick={colorMode.toggleColorMode}
				color="inherit"
			>
				{theme.palette.mode === 'dark' ? (
					<Brightness7Icon />
				) : (
					<Brightness4Icon />
				)}
			</IconButton>
		</div>
	);
}
export default function App({ Component, pageProps }) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'),
		[mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light'),
		colorMode = useMemo(
			() => ({
				// The dark mode switch would invoke this method
				toggleColorMode: () => {
					setMode((prevMode: PaletteMode) =>
						prevMode === 'light' ? 'dark' : 'light'
					);
				}
			}),
			[]
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

	// Update the theme only if the mode changes
	const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<I18nProvider i18n={i18n}>
					<CssBaseline />
					<LangSwitcher />
					<Component {...pageProps} />
					<ThemeChanger />
				</I18nProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired
};
