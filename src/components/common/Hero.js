'use client'

import { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Lantern, LanternLayout } from '@/components/ui/Lantern'
import Marquee from '@/components/ui/Marquee'

export default function Hero() {
	const { data: session } = useSession()
	const router = useRouter()

	const [windowHeight, setWindowHeight] = useState(0)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWindowHeight(window.innerHeight)
			window.addEventListener("resize", () => setWindowHeight(window.innerHeight))
		}

		return () => {
			if (typeof window !== "undefined")
				window.removeEventListener("resize", () => setWindowHeight(window.innerHeight))
		}
	}, [])

	const handleScrollDown = () => {
		if (typeof window !== 'undefined' && windowHeight) {
			window.scrollBy({
				top: windowHeight - 72,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div className='max-h-[calc(100vh - 72px)] h-screen'>
			<Marquee />
			<div className='flex flex-col-reverse'>
				<div className='z-30 -mt-2 -mb-8 tall:mt-10 tall:mb-4 space-x-5 xs:mb-8 min-[520px]:mt-4 min-[520px]:mb-0 sm:mt-10 md:mt-5 md:mb-6 flex-center'>
					<button
						className='px-6 py-1 tracking-wide rounded-full bg-secondary_blue hover:bg-sky-500 text-zinc-100'
						onClick={() => router.push(session ? '/light' : '/login')}
					>
						登入並點燈
					</button>
					<button className='px-5 py-1 tracking-wide rounded-full bg-primary_yellow text-zinc-800 hover:bg-amber-300'>
						<Link href='https://www.youtube.com/watch?v=bPptTi9uR-0' target='_blank'>
							概念影片
						</Link>
					</button>
				</div>
				<div className='relative z-0 pt-10 pb-6 text-center'>
					<h1 className='mb-2 sm:mb-4 leading-[1.1] text-7xl xs:text-8xl text-transparent drop-shadow-md bg-clip-text bg-gradient-to-tl from-amber-100 dark:from-sky-100 from-20% dark:from-30% to-amber-300 dark:to-primary_yellow to-60% dark:to-80%'>
						股市
						<br className='sm:hidden' />
						光明燈
					</h1>
					<p className='font-light'>帶給所有投資人新的希望</p>
					<div
						data-aos='zoom-in-up'
						data-aos-duration='2000'
						className='absolute top-0 left-0 -z-10 opacity-30 dark:opacity-10'
					>
						<h1 className='text-transparent hidden xs:block leading-none lg:leading-tight bg-clip-text bg-gradient-to-b from-primary_yellow to-amber-100/80 filter blur-[2px]'>
							Light a Lantern for stock market.
						</h1>
					</div>
				</div>
			</div>
			<div className="relative z-0 h-[60vw] min-[400px]:h-[48vw] min-[450px]:h-[45vw] min-[520px]:h-[48vw] min-[480px]:h-[40vw] min-[576px]:h-[40vw] min-[620px]:h-[36vw] sm:h-[45vw] md:h-[32vw] border-b-2 dark:border-zinc-900 lg:h-80 bg-[url('https://imgur.com/TUd42OT.jpg')] dark:bg-[url('https://imgur.com/eUbTc8f.jpg')] bg-no-repeat lg:bg-cover bg-center">
				<Image
					src='/assets/home/temple-outside.svg'
					width={1000}
					height={1000}
					className='relative bottom-[7vw] min-[400px]:bottom-[19vw] min-[450px]:bottom-[23vw] min-[520px]:bottom-[14vw] sm:bottom-[11.5vw] lg:bottom-40 mx-auto w-full  min-[480px]:w-[87vw] min-[520px]:w-[85vw] min-[576px]:w-[74vw] min-[620px]:w-[68vw] sm:w-[78vw] md:w-[60vw] lg:w-[660px]'
					alt='temple-outside'
				/>
				<LanternLayout otherStyle='hidden md:block absolute top-0'>
					<div className='scale-75 -rotate-6'>
						<Lantern position='absolute -right-[20vw] -top-[15vw] xl:-right-[30vw] xl:-top-[10vw]' />
					</div>
					<div className='scale-90 rotate-3'>
						<Lantern position='absolute left-[80vw] xl:left-[72vw] -top-[8vw]' />
					</div>
					<div className='scale-50 -rotate-2'>
						<Lantern position='absolute -right-[50vw] xl:-right-[58vw] -top-[4vw]' />
					</div>
				</LanternLayout>
			</div>
			<div className='relative z-30 mt-6 text-center'>
				<button type='button' className='hover:underline' onClick={handleScrollDown}>
					<span className='text-sm font-light leading-loose'>了解更多</span>
					<ExpandMoreIcon />
				</button>
			</div>
		</div>
	)
}
