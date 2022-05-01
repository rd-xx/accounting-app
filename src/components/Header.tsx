import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InputAdornment from '@mui/material/InputAdornment';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Trans } from '@lingui/macro';

export default function Header(): JSX.Element {
	return (
		<Stack
			direction={{ xs: 'column', md: 'row' }}
			justifyContent="space-between"
			alignItems="center"
			spacing={2}
			mb="2%"
		>
			<TextField
				id="outlined-number"
				label={<Trans>Amount</Trans>}
				type="number"
				color="secondary"
				onKeyDown={(event) => {
					if (event.key !== 'Backspace' && event.key.match(/[+\-e]/g))
						event.preventDefault();
				}}
				onPaste={(event) => {
					if (event.clipboardData.getData('Text').match(/[+\-e]/g))
						event.preventDefault();
				}}
				InputProps={{
					endAdornment: <InputAdornment position="end">€</InputAdornment>,
					inputProps: {
						min: 0
					}
				}}
			/>
			<TextField
				id="outlined-basic"
				label={<Trans>Description</Trans>}
				color="secondary"
			/>
			<Button
				variant="contained"
				color="success"
				size="large"
				startIcon={<AddIcon />}
			>
				<Trans>Income</Trans>
			</Button>
			<Button
				variant="contained"
				color="error"
				size="large"
				startIcon={<RemoveIcon />}
			>
				<Trans>Outcome</Trans>
			</Button>
			<Button
				variant="contained"
				color="info"
				size="large"
				startIcon={<RestartAltIcon />}
			>
				<Trans>Reset</Trans>
			</Button>
		</Stack>
	);
}
