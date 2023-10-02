import Link from 'next/link'

export default function Custom404() {
	return (
		<div className='grid h-screen text-center place-content-center'>
			<h1 className='text-zinc-100'>404</h1>
			<p className='text-4xl font-bold tracking-tight'>Uh-oh!</p>
			<p className='mt-4 mb-6 text-zinc-500'>找不到該頁面</p>
			<Link
				href='/'
				className='py-3 text-sm font-medium tracking-wider rounded bg-primary_yellow text-zinc-800 hover:bg-amber-300'
			>
				回到首頁
			</Link>
		</div>
	)
}
