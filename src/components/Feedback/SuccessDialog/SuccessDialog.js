import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

export default function SuccessDialog({ handleClose, content }) {
	return (
		<div className='flex flex-col py-16'>
			<div className='relative w-full max-w-md py-10 mx-auto space-y-3 text-center rounded-lg shadow bg-zinc-100 dark:bg-zinc-800'>
				<button className='absolute text-3xl top-3 right-5 opacity-80 hover:opacity-60' onClick={handleClose}>
					<CloseIcon />
				</button>
				<Image src='/images/success-symbol.svg' width={96} height={96} alt='success' className='block pb-4 mx-auto' />
				<h2 className='pb-2'>成功送出</h2>
				<p>{content}</p>
			</div>
		</div>
	)
}
