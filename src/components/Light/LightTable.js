'use client'

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

// 股票數據（目前先定義 5 檔）
const resultData = [
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
		id: 2330,
		name: '台積電',
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

const columnHelper = createColumnHelper()

// 定義欄位
const columns = [
	columnHelper.accessor('id', {
		cell: (info) => info.getValue(),
		header: () => '代號',
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor((row) => row.name, {
		cell: (info) => info.getValue(),
		header: () => '名稱',
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('price', {
		cell: (info) => info.renderValue(),
		header: () => '股價',
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('up_down', {
		header: () => '漲跌(％)',
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('週漲跌', {
		header: 'Status',
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor('progress', {
		header: 'Profile Progress',
		footer: (info) => info.column.id,
	}),
]

export default function LightTable() {
	const [data, setData] = useState(() => [...resultData])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='p-2'>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	)
}
