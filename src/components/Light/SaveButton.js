import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import { forwardRef, useState } from 'react'

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function SaveButton() {
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => setOpen(true)

	const handleClose = () => setOpen(false)

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<button
				type='button'
				className='flex justify-center px-16 py-2.5 mx-auto text-sm font-medium transition-all duration-300 ease-out border-0 rounded-full cursor-pointer bg-primary_yellow sm:mt-0 hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow'
				onClick={handleClickOpen}
			>
				保存結果
			</button>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					保存成功！
				</Alert>
			</Snackbar>
		</Stack>
	)
}
