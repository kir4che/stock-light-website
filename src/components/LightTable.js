'use client'

import MaterialReactTable from 'material-react-table'
import { useMemo } from 'react'

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
	{
		id: 2303,
		name: '聯電',
		price: 49.95,
		up_down: {
			day: 0.2,
			week: 1.73,
			month: 2.1,
			predict: 1.24,
		},
		volume: 28640,
		correlation: 0.6712,
	},
	{
		id: 2303,
		name: '聯電',
		price: 49.95,
		up_down: {
			day: 0.2,
			week: 1.73,
			month: 2.1,
			predict: 1.24,
		},
		volume: 28640,
		correlation: 0.6712,
	},
	{
		id: 2303,
		name: '聯電',
		price: 49.95,
		up_down: {
			day: 0.2,
			week: 1.73,
			month: 2.1,
			predict: 1.24,
		},
		volume: 28640,
		correlation: 0.6712,
	},
	{
		id: 2303,
		name: '聯電',
		price: 49.95,
		up_down: {
			day: 0.2,
			week: 1.73,
			month: 2.1,
			predict: 1.24,
		},
		volume: 28640,
		correlation: 0.6712,
	},
	{
		id: 2303,
		name: '聯電',
		price: 49.95,
		up_down: {
			day: 0.2,
			week: 1.73,
			month: 2.1,
			predict: 1.24,
		},
		volume: 28640,
		correlation: 0.6712,
	},
	{
		id: 2303,
		name: '聯電',
		price: 49.95,
		up_down: {
			day: 0.2,
			week: 1.73,
			month: 2.1,
			predict: 1.24,
		},
		volume: 28640,
		correlation: 0.6712,
	},
]

export default function LightTable() {
	//should be memoized or stable
	const columns = useMemo(
		() => [
			{
				accessorKey: 'id',
				header: '代號',
			},
			{
				accessorKey: 'name',
				header: '名稱',
			},
			{
				accessorKey: 'price',
				header: '股價',
			},
			{
				accessorKey: 'up_down.day',
				header: '漲跌幅(％)',
			},
			{
				accessorKey: 'up_down.week',
				header: '週漲跌幅(％)',
			},
			{
				accessorKey: 'up_down.month',
				header: '月漲跌幅(％)',
			},
			{
				accessorKey: 'volume',
				header: '成交量',
			},
			{
				accessorKey: 'correlation',
				header: '相關係數',
			},
			{
				accessorKey: 'up_down.predict',
				header: '預測漲跌幅(％)',
			},
		],
		[]
	)

	return (
		<MaterialReactTable
			columns={columns}
			data={data}
			defaultColumn={{
				minSize: 5,
				maxSize: 24,
				size: 10,
			}}
			enableRowNumbers
			rowNumberMode='original'
			enableColumnActions={false}
			enableColumnFilters={false}
			enablePagination={false}
			enableBottomToolbar={false}
			enableTopToolbar={false}
			muiTableBodyRowProps={{ hover: false }}
		/>
	)
}
