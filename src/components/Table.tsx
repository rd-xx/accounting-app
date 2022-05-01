import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { formatAmount, formatDate } from '../utils/functions';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { Trans } from '@lingui/macro';
import PropTypes from 'prop-types';
import { useState } from 'react';

type ItemType = {
	id: number;
	columnId: number;
	amount: number;
	description: string;
	date: Date;
};

const columns = [
		{
			id: 1,
			label: <Trans>INCOME</Trans>,
			align: 'center' as const
		},
		{
			id: 2,
			label: <Trans>OUTCOME</Trans>,
			align: 'center' as const
		}
	],
	rows = [
		{
			id: 1,
			columnId: 1,
			amount: 512,
			description: 'rghthtihj',
			date: new Date()
		},
		{
			id: 2,
			columnId: 2,
			amount: 214,
			description: 'outcome fixe',
			date: new Date()
		},
		{
			id: 3,
			columnId: 1,
			amount: 356,
			description: 'rghthtihj',
			date: new Date()
		},
		{
			id: 4,
			columnId: 1,
			amount: 842,
			description: 'outcome fixe',
			date: new Date()
		},
		{
			id: 5,
			columnId: 2,
			amount: 149,
			description: 'rghthtihj',
			date: new Date()
		},
		{
			id: 6,
			columnId: 1,
			amount: 9813,
			description: 'outcome fixe',
			date: new Date()
		},
		{
			id: 7,
			columnId: 2,
			amount: 674,
			description: 'rghthtihj',
			date: new Date()
		},
		{
			id: 8,
			columnId: 2,
			amount: 831,
			description: 'outcome fixe',
			date: new Date()
		}
	],
	StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]:
			theme.palette.mode === 'light'
				? {
						backgroundColor: theme.palette.common.black,
						color: theme.palette.common.white
				  }
				: {
						backgroundColor: theme.palette.primary.main,
						color: theme.palette.common.white
				  }
	}));

export default function TableElement({
	storedData
}: {
	storedData: ItemType[];
}): JSX.Element {
	const [data, setData] = useState(storedData);

	let totalIncome = 0,
		totalOutcome = 0;

	for (const row of data)
		if (row.columnId === 1) totalIncome += row.amount;
		else totalOutcome += row.amount;

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '2%' }}>
			<TableContainer sx={{ maxHeight: '75vh' }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow style={{ backgroundColor: 'primary.main' }}>
							{columns.map((column) => (
								<StyledTableCell
									key={column.id}
									align={column.align}
									sx={{ backgroundColor: 'common.black' }}
								>
									{column.label}
								</StyledTableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => {
							return (
								<TableRow
									hover
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									{columns.map((column) => {
										const amountTextColor =
												row.columnId === 1 ? 'success.main' : 'error.main',
											descriptionTextColor =
												row.columnId === 1 ? 'success.light' : 'error.light';

										if (row.columnId !== column.id)
											return <TableCell key={column.id}></TableCell>;
										else
											return (
												<TableCell key={column.id}>
													<Typography
														color="text.secondary"
														fontStyle="italic"
														align="right"
													>
														{formatDate(row.date)}
													</Typography>
													<Typography color={amountTextColor} fontWeight="bold">
														{(column.id === 2 ? '-' : '') +
															formatAmount(row.amount)}
													</Typography>
													<Typography color={descriptionTextColor}>
														{row.description}
													</Typography>
												</TableCell>
											);
									})}
								</TableRow>
							);
						})}
					</TableBody>
					<TableFooter>
						<TableRow
							sx={{
								[`& .${tableCellClasses.root}`]: {
									borderTop: 2
								}
							}}
						>
							<TableCell>
								<Typography color={'success.main'}>
									<Trans>TOTAL INCOME</Trans>
								</Typography>
								<Typography color="success.main" fontWeight="bold">
									{formatAmount(totalIncome)}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography color={'error.main'}>
									<Trans>TOTAL OUTCOME</Trans>
								</Typography>
								<Typography color="error.main" fontWeight="bold">
									{'-' + formatAmount(totalOutcome)}
								</Typography>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Paper>
	);
}

TableElement.propTypes = {
	storedData: PropTypes.array.isRequired
};
