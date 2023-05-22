'use client'

import MaterialReactTable from 'material-react-table'
import { useMemo } from 'react'

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
	{
		id: 2303,
		name: 'Doe',
		address: '261',
		city: 'Ehne',
		state: 'Ky',
	},
]

export default function AnalTable() {
	//should be memoized or stable
	const columns = useMemo(
		() => [
			{
				accessorKey: 'name.firstName', //access nested data with dot notation
				header: '代號',
			},
			{
				accessorKey: 'name.lastName',
				header: '名稱',
			},
			{
				accessorKey: 'address', //normal accessorKey
				header: '股價',
			},
			{
				accessorKey: 'city',
				header: '漲跌幅(％)',
			},
			{
				accessorKey: 'state',
				header: '週漲跌幅(％)',
			},
			{
				accessorKey: 'state',
				header: '月漲跌幅(％)',
			},
			{
				accessorKey: 'state',
				header: '成交量',
			},
			{
				accessorKey: 'state',
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
