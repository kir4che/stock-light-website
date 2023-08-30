import Image from 'next/image'
import { X as Close } from 'react-bootstrap-icons'

export default function SuccessDialog({ title, content, handleClose }) {
	return (
		<div className='grid h-screen place-content-center'>
			<div className='relative py-8 space-y-3 text-center w-96 rounded-xl bg-zinc-100 dark:bg-zinc-900/50'>
				<Close
					size={28}
					className='absolute cursor-pointer top-3 right-3 opacity-80 hover:opacity-60'
					onClick={handleClose}
				/>
				<Image src='/images/success-symbol.svg' width={96} height={96} alt='success' className='block mx-auto' />
				<h2 className='pb-4'>{title}</h2>
				<p className='font-light text-zinc-600 dark:text-zinc-300'>{content}</p>
			</div>
		</div>
	)
}
