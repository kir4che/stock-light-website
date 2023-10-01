import Link from 'next/link'

export default function PrivacyAndTerms() {
	return (
		<p className='text-xs text-zinc-100 opacity-70'>
			By proceeding, you agree to our{' '}
			<Link href='' className='underline'>
				Terms of Use
			</Link>{' '}
			and confirm you have read our{' '}
			<Link href='' className='underline'>
				Privacy and Cookie Statement
			</Link>
			.
		</p>
	)
}
