import Temple from '@/components/Home/Temple'

export default function Banner() {
	return (
		<div className="w-full text-center border-b-2 h-60 border-b-zinc-900 bg-[url('https://imgur.com/TUd42OT.jpg')] dark:bg-[url('https://imgur.com/bLhruDF.jpg')] bg-no-repeat bg-cover	bg-center md:h-72 lg:h-96">
			<Temple />
		</div>
	)
}
