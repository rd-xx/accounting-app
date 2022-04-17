/* eslint-disable @next/next/no-img-element */
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Link from 'next/link';

const availableLocales = [
	{
		id: 'en',
		label: 'English',
		code: 'us',
		route: '/'
	},
	{
		id: 'fr',
		label: 'Français',
		code: 'fr',
		route: '/fr'
	}
];

export default function LangSwitcher() {
	const { locale } = useRouter();

	return (
		<Select labelId="select-label" value={locale}>
			{availableLocales.map((availableLocale) => {
				return (
					<MenuItem key={availableLocale.id} value={availableLocale.id}>
						<Link href="/" locale={availableLocale.id} passHref>
							<Box sx={{ '& img': { mr: 2, flexShrink: 0 } }}>
								<img
									loading="lazy"
									width={20}
									height={10}
									src={`https://flagcdn.com/w20/${availableLocale.code}.png`}
									alt=""
								/>
								{availableLocale.label}
							</Box>
						</Link>
					</MenuItem>
				);
			})}
		</Select>
	);
}
