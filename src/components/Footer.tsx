import { Divider, Stack } from '@mui/material';
import LangSwitcher from './LangSwitcher';
import ThemeChanger from './ThemeChanger';

export default function Footer() {
	return (
		<Stack
			direction="row"
			divider={<Divider orientation="vertical" flexItem />}
			justifyContent="center"
			alignItems="center"
			spacing={4}
		>
			<LangSwitcher />
			<ThemeChanger />
		</Stack>
	);
}
