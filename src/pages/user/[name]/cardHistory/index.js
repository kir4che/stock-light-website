import StarryBackground from '@/components/common/StarryBackground'
import Image from 'next/image'

export default function cardHistory() {
    return [
        <StarryBackground className={'pt-12 pb-3 sm:pt-20 sm:pb-16 text-zinc-100'}>
            <section className='flex flex-row items-start min-h-full justify-center' >
                <div className="card-grid gap-10">
                    <a className="list-none relative card" href="#">
                        <div className="card__background"> 
                            <Image src={"https://imgur.com/h4ICpmE.png"} width={640} height={320} alt='' />
                        </div>
                        <div className="left-0 top-0 absolute">
                            <p className="text-sm uppercase">2023年10月28日</p>
                            <h3 className="card__category">金融類股</h3>
                        </div>
                    </a>

                    <a className="list-none relative card" href="#">
                        <div className="card__background ">
                            <Image src={"https://i.imgur.com/bZOT3Sq.png"} width={640} height={320} alt='' />
                        </div>
                        <div className="left-0 top-0 absolute">
                            <p className="text-sm uppercase">2023年10月30日</p>
                            <h3 className="card__category">電子類股</h3>
                        </div>
                    </a>

                </div>
            </section>
        </StarryBackground>
    ]
}