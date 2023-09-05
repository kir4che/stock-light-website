import { useRouter } from 'next/router'
import Custom404 from '../../404'

const isExistCategory = (category) => {
	const categories = ['love', 'career', 'health', 'study', 'wealth']
	if (!categories.includes(category)) return false
	else return true
}

export default function LightByCategory() {
	const router = useRouter()
	const { category } = router.query

	// 點燈系統中無該 category 則導向 404 頁面
	if (!isExistCategory(category)) return <Custom404 />

	return (
		<div>
			<h1>Light by category: {category}</h1>
		</div>
	)
}
