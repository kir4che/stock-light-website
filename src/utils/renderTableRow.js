import { TableCell, TableRow } from '@mui/material'

const renderDateRow = (dates, minWidth = '105px') => (
	<TableRow className='bg-secondary_blue/20 dark:bg-deep_blue'>
		<TableCell
			sx={{
				width: '100%',
				minWidth: minWidth,
			}}
			className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
		>
			年度 / 季度
		</TableCell>
		{dates.toReversed().map((item, index) => (
			<TableCell
				align='right'
				sx={{
					width: '100%',
					minWidth: '90px',
				}}
				className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
				key={index}
			>
				{item}
			</TableCell>
		))}
	</TableRow>
)

const renderDataRow = (title, data) => (
	<TableRow className='dark:bg-zinc-900/30'>
		<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>{title}</TableCell>
		{data.toReversed().map((item, index) => (
			<TableCell align='right' className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={index}>
				{isNaN(item) ? '－' : item.toLocaleString()}
			</TableCell>
		))}
	</TableRow>
)

export { renderDataRow, renderDateRow }
