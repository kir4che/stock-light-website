import MuiAlert from '@mui/material/Alert'
import Button from '@mui/material/Button'
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
		<Stack sx={{ width: '100%' }}>
			<Button className='px-20 py-2 mx-auto rounded-full bg-secondary_blue hover:bg-sky-500' onClick={handleClickOpen}>
				保存結果
			</Button>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				{/* 保存點燈數據至資料庫 */}
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					保存成功！
				</Alert>
			</Snackbar>
		</Stack>
	)
}
