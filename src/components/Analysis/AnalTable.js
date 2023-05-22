'use client'

import MaterialReactTable from 'material-react-table'
import { useMemo } from 'react'

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
	{
		id: 2330,
		name: '台積電',
		price: 531.0,
		up_down: {
			day: -1.0,
			week: 7.06,
			month: 5.73,
		},
		volume: 17186,
		correlation: 0.71,
	},
]

export default function AnalTable() {
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
