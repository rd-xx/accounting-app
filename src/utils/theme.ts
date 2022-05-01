import { PaletteMode } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function getTheme(mode: PaletteMode) {
	return {
		palette: {
			mode,
			...(mode === 'light'
				? {
						primary: {
							main: '#000'
						},
						secondary: {
							main: grey[900]
						},
						text: {
							primary: '#000',
							secondary: grey[500]
						}
				  }
				: {
						primary: {
							main: '#2B2B2B'
						},
						secondary: {
							main: grey[400]
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
