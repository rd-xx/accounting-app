import { grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export default function getTheme(mode: PaletteMode) {
	return {
		palette: {
			mode,
			...(mode === 'light'
				? {
						primary: grey,
						text: {
							primary: grey[900],
							secondary: grey[800]
						}
				  }
				: {
						primary: {
							main: '#202020'
						},
						secondary: {
							main: '#880e4f'
						},
						background: {
							default: '#202020'
						},
						text: {
							primary: '#fff',
							secondary: grey[500]
						}
				  })
		}
	};
}
