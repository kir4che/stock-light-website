import { useRouter } from 'next/router'

export default function LightByCategory() {
	const router = useRouter()
	const { id } = router.query

	return (
		<div>
			<h1>Light by category: {category}</h1>
		</div>
	)
}
