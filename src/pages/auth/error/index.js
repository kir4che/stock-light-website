import Link from 'next/link'

export default function Error() {
	return (
		<div className='grid h-screen text-center place-content-center'>
			<h1 className='text-zinc-100'>404</h1>
			<p className='text-4xl font-bold tracking-tight'>Uh-oh!</p>
			<p className='mt-4 mb-6 text-zinc-500'>登入失敗</p>
			<Link
				href='/auth/login'
				className='py-3 text-sm font-medium tracking-wider rounded bg-primary_yellow text-zinc-800 hover:bg-amber-300'
			>
				重新登入
			</Link>
		</div>
	)
}
