export default function SubmitButton({ text, icon }) {
	return (
		<button
			type='submit'
			className='w-full mt-8 flex items-center focus:outline-none justify-center space-x-1.5 py-2.5 tracking-wider font-medium rounded-md text-zinc-100 bg-secondary_blue hover:bg-sky-500'
		>
			<span>{text}</span>
			<span>{icon}</span>
		</button>
	)
}
