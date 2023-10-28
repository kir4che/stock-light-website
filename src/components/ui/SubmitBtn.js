import { Button } from '@mui/material'

export default function SubmitBtn({ text, handleSubmit, style = '' }) {
	return (
		<Button
			type='submit'
			size='large'
			fullWidth
			onClick={handleSubmit}
			className={`${style} text-zinc-100 tracking-wide bg-secondary_blue hover:bg-sky-500`}
		>
			{text}
		</Button>
	)
}
