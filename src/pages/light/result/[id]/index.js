import { useRouter } from 'next/router'
import LightResult from '../../../../components/Light/LightResult'
import StarryBackground from '../../../../components/StarryBackground/StarryBackground'

export default function Result() {
	const router = useRouter()
	const { id } = router.query

	return (
		<StarryBackground className={'pt-8 pb-12 md:pb-20 md:pt-14'}>
			<LightResult />
		</StarryBackground>
	)
}
