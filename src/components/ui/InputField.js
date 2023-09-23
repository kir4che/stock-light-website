import { Input, InputLabel } from '@mui/material'

export default function InputField({ label, name, type, value, onChange, placeholder }) {
	return (
		<>
			<InputLabel className='text-sm text-zinc-100'>{label}</InputLabel>
			<Input
				name={name}
				type={type}
				value={value}
				size='small'
				placeholder={placeholder}
				onChange={onChange}
				className='w-full p-2.5 mt-2 mb-3 text-sm rounded bg-zinc-100'
				required
			/>
		</>
	)
}
