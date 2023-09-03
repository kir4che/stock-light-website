export default function PasswordInput({ label, value, onChange, placeholder }) {
	return (
		<>
			<label className='text-zinc-100'>{label}</label>
			<input
				name='password'
				type='password'
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className='w-full py-3 pl-3 mt-1 mb-3 border rounded focus:outline-none dark:text-zinc-800 bg-zinc-200'
				required
			/>
		</>
	)
}
