import router from 'next/router'

export default function Custom404() {
	return (
		<div className='flex justify-center flex-col items-center h-[40vh] text-center sm:h-[55vh]'>
			<h1 className='mb-5 font-extrabold tracking-wider text-transparent text-8xl bg-clip-text bg-gradient-to-r from-secondary_blue to-sky-100'>
				404
			</h1>
			<h2>
				<span className='font-bold text-stock_red'>OOPS！</span>找不到頁面
			</h2>
			<button
				className='mt-10 px-6 py-1.5 transition duration-200 ease-in border-[1.5px] border-secondary_blue rounded-full hover:bg-secondary_blue hover:text-white focus:outline-none'
				type='button'
				onClick={() => router.push('/')}
			>
				返回首頁
			</button>
		</div>
	)
}
